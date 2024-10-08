import { OptimisticShortPost, ShortPost } from '@/posts/types';
import { Track } from '@/tracks/types';
import { StateCreator } from 'zustand';

export interface SpotifySlice {
  authCode: string;
  setAuthCode: (authCode: string) => void;
  deviceId: string;
  setDeviceId: (deviceId: string) => void;
  currentlyPlaying:
    | {
        post: ShortPost | OptimisticShortPost;
        startTime: number;
        startTimestamp: number;
      }
    | undefined;
  setCurrentlyPlaying: (opts?: {
    post: ShortPost | OptimisticShortPost;
    startTimestamp: number;
    startTime?: number;
  }) => void;
}

export const createSpotifySlice: StateCreator<SpotifySlice> = set => ({
  authCode: '',
  setAuthCode: (authCode: string) => set(state => ({ ...state, authCode })),
  deviceId: '',
  setDeviceId: (deviceId: string) => set(state => ({ ...state, deviceId })),
  currentlyPlaying: undefined,
  setCurrentlyPlaying: opts => {
    const newState = opts
      ? {
          ...opts,
          startTime: opts.startTime ?? Date.now(),
        }
      : undefined;

    return set(state => ({ ...state, currentlyPlaying: newState }));
  },
});
