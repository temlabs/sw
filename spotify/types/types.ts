export interface SpotifyAuthTokensResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export interface SpotifyAuthTokens {
  accessToken: string;
  scope: string;
  expiresIn: number;
  refreshToken: string;
  authCode: string;
}

export interface AuthTokensResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}
export interface AuthTokens {
  accessToken: string;
  scope: string;
  expiresIn: number;
  refreshToken: string;
}

export interface SpotifyError {
  message: string;
  status: 201 | 401 | 403 | 429;
}

export interface SpotifyAuthError {
  error: string;
  error_description: string;
}

export interface PlayOptions {
  trackUris?: string[];
  startFrom?: number;
}
