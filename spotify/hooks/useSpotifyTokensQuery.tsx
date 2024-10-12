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

export function useSpotifyTokensQuery(
  options: Omit<
    UseQueryOptions<
      SpotifyAuthTokens,
      Error,
      SpotifyAuthTokens,
      ReturnType<(typeof spotifyQueryKeys)['tokens']>
    >,
    'queryFn'
  >,
): UseQueryResult<SpotifyAuthTokens, Error> {
  const query = useQuery({
    queryFn: async ({ queryKey }) =>
      await fetchSpotifyAuthorizationTokens(queryKey[queryKey.length - 1]),
    refetchOnMount: false,
    enabled: false,
    staleTime: 3500 * 1000,
    ...options,
  });

  useEffect(() => {
    const refreshAuthTokens = async (refreshToken: string) =>
      await makeRequest<SpotifyAuthTokens>('POST', '/spotify/tokens/refresh', {
        body: { refreshToken },
        isAuthenticated: true,
      });
    if (!query.isStale) {
      return;
    }
    const refreshToken = query.data?.refreshToken;
    try {
      const tokens = refreshToken && refreshAuthTokens(refreshToken);
      console.debug('successfully refreshed tokens: ', tokens);
      queryClient.setQueryData(
        spotifyQueryKeys.tokens(options.queryKey[options.queryKey.length - 1]),
        tokens,
      );
    } catch (error) {
      console.error('error refreshing token: ', error);
    }
  }, [query.isStale]);
  return query;
}
