import { SpotifyError } from './types/types';
import { SpotifyTrack } from './types/nativeSpotifyTypes';
import { SpotifyRecentlyPlayedTracksResponse } from './types/spotifyResponseTypes';

export const getError = (response: Object): void => {
  if (!isErrorResponse(response)) {
    return;
  }
  const status = response?.error?.status;
  const message = response?.error?.message;
  switch (status) {
    case 401: {
      const badTokenError = new Error(message);
      badTokenError.name = 'Bad or expired token';
      throw badTokenError;
    }
    case 403: {
      const badAuthError = new Error(message);
      badAuthError.name = 'Bad OAuth request';
      throw badAuthError;
    }
    case 429: {
      const rateLimitError = new Error(message);
      rateLimitError.name = 'Exceeded rate limits';
      throw rateLimitError;
    }
    default:
      break;
  }
};

type ErrorResponse = { error: SpotifyError };

const isErrorResponse = (response: Object): response is ErrorResponse => {
  if ('error' in response) {
    const error = response.error as Object;
    if ('message' in error && 'status' in error) {
      return true;
    }
  }
  return false;
};

export const throwSpotifyAuthError = (errorResponse: Object) => {
  if (typeof errorResponse !== 'object') {
    return;
  }
  if (
    'error_description' in errorResponse &&
    typeof errorResponse.error_description === 'string'
  ) {
    const exception = new Error(errorResponse.error_description);
    if ('error' in errorResponse && typeof errorResponse.error === 'string')
      exception.name = errorResponse.error;
    throw exception;
  }
};

export const recentlyPlayedTracksResponseToSpotfyTrackList = (
  response: SpotifyRecentlyPlayedTracksResponse,
): SpotifyTrack[] => {
  return response.items.map(item => item.track);
};

export const throwSpotifyError = (
  errorResponse: Object,
  callbackName?: string,
) => {
  if ('error' in errorResponse) {
    const errorObject = errorResponse.error;
    if (
      !!errorObject &&
      typeof errorObject === 'object' &&
      'status' in errorObject &&
      'message' in errorObject
    ) {
      const message = (errorObject.message as string) ?? '';
      const e = new Error(message);
      e.name = callbackName ?? 'Spotify Error';
    }
  }
};
