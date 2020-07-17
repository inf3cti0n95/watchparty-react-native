export enum Provider {
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
}

export enum SignInError {
  CANCELLED = 'CANCELLED',
  AUTH_ERROR = 'AUTH_ERROR',
  PROFILE_FETCH_FAILED = 'PROFILE_FETCH_FAILED',
}

export interface SignInSuccessResponse {
  token: string;
  provider: Provider;
}

export interface SignInFailureResponse {
  type: SignInError;
  errorMessage: {
    debug?: string;
    client?: string;
  };
  error?: Error;
  provider: Provider;
}

export type SignInSuccessListener = (result: SignInSuccessResponse) => void;
export type SignInFailureListener = (error: SignInFailureResponse) => void;

export interface SignInProps {
  onSignInSuccess: SignInSuccessListener;
  onSignInFailure: SignInFailureListener;
}
