import { CLIENT_ID, REDIRECT_URI, SCOPE } from './../config';
import { SpotifyAuthTokens } from './../types/types';
import { makeRequest } from '@/api/apiUtils';

export const constructSpotifyLoginUri = (): string => {
  const queryObject = {
    response_type: 'code',
    client_id: CLIENT_ID as string,
    scope: SCOPE as string,
    redirect_uri: REDIRECT_URI as string,
  };
  const queryParams = new URLSearchParams(queryObject);
  const queryString = queryParams.toString();
  return 'https://accounts.spotify.com/authorize?' + queryString;
};

export const extractAuthCodeFromUrl = (query: string): string | null => {
  const codeRegex = /code=([^&]+)/;
  const match = query.match(codeRegex);
  return match ? match[1] : null;
};

export const fetchSpotifyAuthorizationTokens = async (authCode: string) => {
  try {
    const resJson = await makeRequest<SpotifyAuthTokens>(
      'POST',
      '/spotify/tokens',
      {
        body: { authCode },
        isAuthenticated: true,
      },
    );
    return resJson;
  } catch (error) {
    console.debug(error);
    throw error;
  }
};
