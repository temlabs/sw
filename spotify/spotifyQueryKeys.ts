const AUTH_CODE = ['authCode'];
const TOKENS = ['tokens'];
const PROFILE = ['profile'];
const LOGIN_URI = ['loginUri'];

export const spotifyQueryKeys = {
  authCode: AUTH_CODE,
  tokens: (authCode: string) => [...TOKENS, authCode],
  profile: (accessToken: string) => [...PROFILE, accessToken],
  loginUri: LOGIN_URI,
};
