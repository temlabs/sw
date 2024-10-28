import { transferPlaybackToDevice } from '@/spotify/functions/playerFunctions';
// import { playbackStateIsSufficientlyDifferent } from '../functions/functions';
import { useGlobalStore } from '@/store/store';
import { useSpotifyTokensQuery } from './hooks/useSpotifyTokensQuery';
import { spotifyQueryKeys } from './spotifyQueryKeys';

export function usePlayerWebViewMessage() {
  const playbackIntent = useGlobalStore(state => state.intent);
  const setCurrentlyPlaying = useGlobalStore(
    state => state.setCurrentlyPlaying,
  );
  const currentlyPlaying = useGlobalStore(state => state.currentlyPlaying);
  const setSpotifyDeviceId = useGlobalStore(state => state.setDeviceId);
  const authCode = useGlobalStore(state => state.authCode);
  const { data } = useSpotifyTokensQuery({
    enabled: !!authCode,
    queryKey: spotifyQueryKeys.tokens(authCode),
  });
  const accessToken = data?.accessToken;

  const onDeviceIdMessage = async (message: string) => {
    const deviceId = message
      .substring('deviceIdReceived'.length)
      .replace(/\\/g, '');
    setSpotifyDeviceId(deviceId);
    try {
      if (!accessToken) {
        throw 'Tried to transfer playback with no access token';
      }
      accessToken && (await transferPlaybackToDevice(deviceId, accessToken));
    } catch (error) {}
  };
  const onDeviceOffline = async (message: string) => {
    setSpotifyDeviceId('');
  };

  const onPlaybackStateChangeMessage = async (message: string) => {
    try {
      const playbackState = JSON.parse(
        message.substring('playbackStateChanged'.length).replace(/\\/g, ''),
      );
      // console.log('playback state changed: ', playbackState);
      // console.debug(playbackState.track_window.current_track.id);
      if (!playbackIntent) {
        // playback was initiated by some other source.
        // we could send a pause command?
      }

      if (
        playbackState.track_window.current_track.id ===
          playbackIntent?.post.spotifyId &&
        ((playbackState.paused && playbackIntent?.intent === 'PAUSE') ||
          (!playbackState.paused && playbackIntent?.intent === 'PLAY'))
      ) {
        // console.log('setting currently playing');
        setCurrentlyPlaying({
          post: playbackIntent.post,
          startTime: Date.now(),
          startTimestamp: playbackState.position,
        });
      }
    } catch (error) {
      // console.log('playback state message err: ', error);
    }
  };

  return { onDeviceIdMessage, onPlaybackStateChangeMessage, onDeviceOffline };
}
