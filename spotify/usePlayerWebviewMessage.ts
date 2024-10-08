import { transferPlaybackToDevice } from '@/spotify/functions/playerFunctions';
// import { playbackStateIsSufficientlyDifferent } from '../functions/functions';
import { useGlobalStore } from '@/store/store';
import { useSpotifyTokensQuery } from './hooks/useSpotifyTokensQuery';
import { spotifyQueryKeys } from './spotifyQueryKeys';

export function usePlayerWebViewMessage() {
  const setSpotifyDeviceId = useGlobalStore(state => state.setDeviceId);
  const authCode = useGlobalStore(state => state.authCode);
  const { data } = useSpotifyTokensQuery(authCode, {
    enabled: !!authCode,
    queryKey: spotifyQueryKeys.tokens,
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

  const onPlaybackStateChangeMessage = async (message: string) => {
    try {
      const playbackState = JSON.parse(
        message.substring('playbackStateChanged'.length).replace(/\\/g, ''),
      );

      const newPlayingTrack = {
        position: playbackState.position,
        spotifyTrackId: playbackState.track_window.current_track.id,
        paused: playbackState.paused,
        startTime: Date.now(),
      };
      //   if (
      //     !!useStore.getState().selectedTrack &&
      //     playbackStateIsSufficientlyDifferent(
      //       useStore.getState().playingTrack,
      //       newPlayingTrack,
      //     )
      //   ) {
      //     setPlayingTrack(newPlayingTrack);
      //   }
    } catch (error) {
      console.log('playback state message err: ', error);
    }
  };

  return { onDeviceIdMessage, onPlaybackStateChangeMessage };
}
