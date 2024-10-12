import { SpotifyProfile } from '../types/nativeSpotifyTypes';
import { throwSpotifyAuthError, throwSpotifyError } from '../utils';

export const fetchSpotifyProfile = async (accessToken: string) => {
  const url = 'https://api.spotify.com/v1/me';
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const resJson = await res.json();

  if (res.status === 200) {
    return resJson as SpotifyProfile;
  }

  throwSpotifyError(resJson);

  return {} as SpotifyProfile;
};
