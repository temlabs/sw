import { create } from 'zustand';
import { createSpotifySlice, SpotifySlice } from '@/spotify/spotifyStore';
import { devtools, persist } from 'zustand/middleware';

interface GlobalState extends SpotifySlice /*, OtherSlice */ {}

export const useGlobalStore = create<GlobalState>()(
  devtools(
    (set, get, api) => ({
      ...createSpotifySlice(set, get, api),
    }),
    {
      name: 'global-storage',
    },
  ),
);
