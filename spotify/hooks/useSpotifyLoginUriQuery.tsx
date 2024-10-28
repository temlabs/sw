import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { fetchSpotifyLoginUri } from './../functions/authFunctions';
import { spotifyQueryKeys } from '../spotifyQueryKeys';
import { SpotifyLoginUri } from '../types/types';

export function useSpotifyLoginUriQuery(
  options: Omit<
    UseQueryOptions<
      SpotifyLoginUri,
      Error,
      SpotifyLoginUri,
      (typeof spotifyQueryKeys)['loginUri']
    >,
    'queryFn' | 'queryKey'
  >,
): UseQueryResult<SpotifyLoginUri, Error> {
  const query = useQuery({
    queryFn: fetchSpotifyLoginUri,
    queryKey: spotifyQueryKeys.loginUri,
    refetchOnMount: false,
    enabled: true,
    staleTime: Infinity,
    ...options,
  });

  return query;
}
