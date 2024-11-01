import { getError } from './../utils';
import { PlayOptions } from './../types/types';
// import { PlayingTrack, SelectedTrack } from '@/store/storeTypes';

export const transferPlaybackToDevice = async (
  deviceId: string,
  accessToken: string,
): Promise<void> => {
  console.log('transferring playback with', { accessToken, deviceId });
  const body = { device_ids: [deviceId], play: true };
  const res = await fetch('https://api.spotify.com/v1/me/player', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const resJson = await res.json();
  console.log('transfer playback res: ', resJson);
  if (res.status === 204) {
    console.log('playback is transfered');
    return;
  }

  getError(resJson);
};

export const playTrack = async (
  accessToken: string,
  deviceId: string,
  options?: PlayOptions,
): Promise<void> => {
  const body = {
    uris: options?.trackUris,
    position_ms: options?.startFrom ?? 0,
  };

  const res = await fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId.replace(
      /\\/g,
      '',
    )}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
  console.debug('play res status: ', res.status);
  if (res.status === 202) {
    return;
  }

  // console.debug('play res source: ', res);
  // const resJson = await res.json();

  // await getError(resJson);
};

export const pauseTrack = async (
  accessToken: string,
  deviceId: string,
): Promise<void> => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (res.status === 202) {
    return;
  }
  const resJson = await res.json();
  await getError(resJson);
};

export const seekPosition = async (
  accessToken: string,
  deviceId: string,
  options?: { position: number },
): Promise<void> => {
  const body = { position_ms: options?.position ?? 0 };
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/seek?position_ms=${
      options?.position ?? 0
    }&device_id=${deviceId.replace(/\\/g, '')}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (res.status === 202) {
    return;
  }

  const resJson = await res.json();

  await getError(resJson);
};

// export const isCurrentlyPlaying = (
//   trackId: string,
//   postId: string,
//   selectedTrack: SelectedTrack,
//   playingTrack: PlayingTrack,
// ): boolean => {
//   return (
//     selectedTrack.postId === postId &&
//     playingTrack.spotifyTrackId === trackId &&
//     !playingTrack.paused
//   );
// };
