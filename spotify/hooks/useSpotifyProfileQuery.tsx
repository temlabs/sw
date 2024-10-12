import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { fetchSpotifyAuthorizationTokens } from './../functions/authFunctions';
import { spotifyQueryKeys } from '../spotifyQueryKeys';
import { SpotifyAuthTokens } from '../types/types';
import { useEffect } from 'react';
import { makeRequest } from '@/api/apiUtils';
import { queryClient } from '@/cache/config';
import { SpotifyProfile } from '../types/nativeSpotifyTypes';
import { fetchSpotifyProfile } from '../functions/profileFunctions';

export function useSpotifyProfileQuery(
  options: Omit<
    UseQueryOptions<
      SpotifyProfile,
      Error,
      SpotifyProfile,
      ReturnType<(typeof spotifyQueryKeys)['profile']>
    >,
    'queryFn'
  >,
): UseQueryResult<SpotifyProfile, Error> {
  const query = useQuery({
    queryFn: async ({ queryKey }) =>
      await fetchSpotifyProfile(queryKey[queryKey.length - 1]),
    refetchOnMount: false,
    enabled: true,
    staleTime: Infinity,
    ...options,
  });
  return query;
}
