import { OptimisticShortPost, ShortPost } from '@/posts/types';
import { Track } from '@/tracks/types';
import { StateCreator } from 'zustand';

type Intent =
  | {
      post: ShortPost | OptimisticShortPost;
      intent: 'PLAY' | 'PAUSE';
      intentStartTime?: number;
    }
  | undefined;

type CurrentlyPlayingOptions =
  | {
      post: ShortPost | OptimisticShortPost;
      startTime?: number;
      startTimestamp?: number;
    }
  | undefined;

export interface SpotifySlice {
  authCode: string;
  setAuthCode: (authCode: string) => void;
  deviceId: string;
  setDeviceId: (deviceId: string) => void;
  currentlyPlaying: CurrentlyPlayingOptions;
  setCurrentlyPlaying: (opts: CurrentlyPlayingOptions) => void;
  setIntent: (intent: Intent) => void;
  intent: Intent;
}

export const createSpotifySlice: StateCreator<SpotifySlice> = set => ({
  authCode: '',
  setAuthCode: (authCode: string) => set(state => ({ ...state, authCode })),
  deviceId: '',
  setDeviceId: (deviceId: string) => set(state => ({ ...state, deviceId })),
  currentlyPlaying: undefined,
  setCurrentlyPlaying: newCurrentlyPlaying =>
    set(state => ({ ...state, ...newCurrentlyPlaying })),
  setIntent: newIntent => set(state => ({ ...state, intent: newIntent })),
  intent: undefined,
});
