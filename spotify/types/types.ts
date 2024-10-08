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

export interface SpotifyProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: { filter_enabled: boolean; filter_locked: boolean };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: 300;
      width: 300;
    },
  ];
  product: 'premium' | 'free' | 'open';
  type: string;
  uri: string;
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
