import { OptimisticShortPost, ShortPost } from '@/posts/types';
import { useGlobalStore } from '@/store/store';
import { useSpotifyTokensQuery } from './useSpotifyTokensQuery';
import { spotifyQueryKeys } from '../spotifyQueryKeys';
import { pauseTrack, playTrack } from '../functions/playerFunctions';
import { isOptimisticShortPost } from '@/posts/functions';

export function useSpotifyPlayback() {
  const authCode = useGlobalStore(state => state.authCode);
  const { data } = useSpotifyTokensQuery({
    queryKey: spotifyQueryKeys.tokens(authCode),
  });
  const accessToken = data?.accessToken;
  const deviceId = useGlobalStore(state => state.deviceId);
  const setIntent = useGlobalStore(state => state.setIntent);
  const currentlyPlaying = useGlobalStore(state => state.currentlyPlaying);
  // console.debug('currentlyPlaying usp', { currentlyPlaying });

  const play = async (
    post: ShortPost | OptimisticShortPost,
    startTimestamp: number = 0,
  ) => {
    try {
      if (!accessToken) {
        const e = new Error('no access token provided to play function');
        e.name = 'PlayError';
        throw e;
      }

      setIntent({
        post,
        intent: 'PLAY',
        intentStartTime: Date.now(),
      });
      // console.log('attempting to play: ', [post.spotifyId], startTimestamp);
      const res = await playTrack(accessToken, deviceId, {
        trackUris: [`spotify:track:${post.spotifyId}`],
        startFrom: startTimestamp,
      });
      console.log('play res: ', res);
    } catch (error) {
      console.error(error);
      // consider marking the intent as unfulfilled?
    }
  };

  const pause = async (post: ShortPost | OptimisticShortPost) => {
    try {
      if (!accessToken) {
        const e = new Error('no access token provided to pause function');
        e.name = 'PauseError';
        throw e;
      }
      setIntent({
        post,
        intent: 'PAUSE',
        intentStartTime: Date.now(),
      });

      await pauseTrack(accessToken, deviceId);
    } catch (error) {
      console.error(error);
      // consider marking the intent as unfulfilled?
    }
  };

  const isPlaying = (post: ShortPost | OptimisticShortPost) => {
    if (isOptimisticShortPost(post)) {
      return post.extId === currentlyPlaying?.post.extId;
    } else {
      return post.id === currentlyPlaying?.post.id;
    }
  };

  return { play, pause, isPlaying };
}
