import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { fetchSpotifyAuthorizationTokens } from './../functions/authFunctions';
import { spotifyQueryKeys } from '../spotifyQueryKeys';
import { SpotifyAuthTokens } from '../types/types';

export function useSpotifyTokensQuery(
  authCode: string,
  options: Omit<
    UseQueryOptions<
      SpotifyAuthTokens,
      Error,
      SpotifyAuthTokens,
      (typeof spotifyQueryKeys)['tokens']
    >,
    'queryFn'
  >,
): UseQueryResult<SpotifyAuthTokens, Error> {
  const query = useQuery({
    queryFn: async ({ queryKey }) =>
      await fetchSpotifyAuthorizationTokens(authCode),
    refetchOnMount: false,
    enabled: false,
    ...options,
  });

  return query;
}
