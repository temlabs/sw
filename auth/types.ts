export type AuthStatus = "AUTHENTICATED" | "UNAUTHENTICATED" | undefined;

export interface SignUpParams {
  username: string;
  password: string;
  email: string;
}

export interface LoginParams {
  username?: string;
  password: string;
  email?: string;
}

export interface SignUpResponse {
  sessionToken: string;
  sessionJwt: string;
  userId: string;
  user: any;
}
