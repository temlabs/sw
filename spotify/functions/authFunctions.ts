import { queryClient } from '@/cache/config';
import { SpotifyAuthTokens, SpotifyLoginUri } from './../types/types';
import { makeRequest } from '@/api/apiUtils';
import { spotifyQueryKeys } from '../spotifyQueryKeys';
import {
  minutesToMilliseconds,
  secondsToMilliseconds,
} from '@/utils/timeUtils';

export const extractAuthCodeFromUrl = (query: string): string | null => {
  const codeRegex = /code=([^&]+)/;
  const match = query.match(codeRegex);
  return match ? match[1] : null;
};

export const fetchSpotifyLoginUri = async () => {
  try {
    const resJson = await makeRequest<SpotifyLoginUri>(
      'GET',
      '/spotify/login',
      { isAuthenticated: true },
    );

    const loginUriAndState = {
      ...resJson,
    };

    return loginUriAndState;
  } catch (error) {
    console.debug(error);
    throw error;
  }
};

export const fetchSpotifyAuthorizationTokens = async (
  authCode: string,
): Promise<SpotifyAuthTokens> => {
  const currentTokens = queryClient.getQueryData<SpotifyAuthTokens>(
    spotifyQueryKeys.tokens(authCode),
  );
  const refreshToken = currentTokens?.refreshToken;
  const needsRefresh = !!authCode && !!refreshToken;
  console.debug({ needsRefresh });
  try {
    const resJson = needsRefresh
      ? await makeRequest<SpotifyAuthTokens>(
          'POST',
          '/spotify/tokens/refresh',
          {
            body: { refreshToken },
            isAuthenticated: true,
          },
        )
      : await makeRequest<SpotifyAuthTokens>('POST', '/spotify/tokens', {
          body: { authCode },
          isAuthenticated: true,
        });

    const authTokens = {
      ...resJson,
      expiresIn: resJson.expiresIn * 1000,
      authCode,
    };
    queryClient.setQueryDefaults(spotifyQueryKeys.tokens(authCode), {
      staleTime: authTokens.expiresIn - minutesToMilliseconds(5),
    });
    console.debug('expires in: ', authTokens.expiresIn);
    return authTokens;
  } catch (error) {
    console.debug(error);
    throw error;
  }
};
