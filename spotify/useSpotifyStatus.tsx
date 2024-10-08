import { queryClient } from '@/cache/config';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { spotifyQueryKeys } from './spotifyQueryKeys';
import { SpotifyAuthTokens } from './types/types';
import { useGlobalStore } from '@/store/store';
import { useSpotifyTokensQuery } from './hooks/useSpotifyTokensQuery';

export function useSpotifyStatus() {
  const authCode = useGlobalStore(state => state.authCode);
  const { data, error, isError, isFetched, isFetching } = useSpotifyTokensQuery(
    authCode,
    {
      enabled: !!authCode,
      queryKey: spotifyQueryKeys.tokens,
    },
  );
  const deviceId = useGlobalStore(state => state.deviceId);
  console.debug({ deviceId });

  const openSpotifyWebsite = () => {
    router.navigate('/spotify');
  };

  const openLogoutScreen = () => {
    router.navigate({
      pathname: '/spotify',
      // params: { link: 'https://accounts.spotify.com/en/login' },
    });
  };

  if (isError) {
    return {
      text: "We couldn't sign you in to Spotify. Tap here to try again.",
      onPress: openLogoutScreen,
    };
  } else if (isFetching) {
    return {
      text: 'Just connecting your account. Hang tight...',
      onPress: undefined,
    };
  } else if (!!data?.accessToken && !deviceId) {
    return { text: 'Looking good...', onPress: undefined };
  } else if (!!deviceId) {
    return { text: 'All good! Happy exploring', onPress: undefined };
  } else {
    return {
      text: 'Tap here to sign in to Spotify and start listening',
      onPress: openSpotifyWebsite,
    };
  }
}
