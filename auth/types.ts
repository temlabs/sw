export type AuthStatus = "AUTHENTICATED" | "UNAUTHENTICATED" | undefined;

export interface SignUpParams {
  username: string;
  password: string;
  email: string;
}

export interface ConfirmSignUpParams {
  username: string;
  password: string;
  confirmationCode: string;
}

export interface ConfirmSignUpResponse {}

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

export type SignUpErrorCode =
  | "UsernameExists"
  | "UserExists"
  | "InvalidPassword"
  | "LimitExceeded"
  | "RequestsOverload"
  | "Error";
export type ConfirmSignUpErrorCode =
  | "IncorrectCode"
  | "CodeExpired"
  | "LimitExceeded"
  | "RequestsOverload"
  | "FailureOverload"
  | "UserNonExistent"
  | "Error";
