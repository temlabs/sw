export interface Track {
    artist: string;
    spotifyId: string;
    duration: number;
    name: string;
    artwork: string;
  }

  export interface CreateTrackParams {
    text: string;
  track: Track;
  timeIn: number;
  timeOut: number;
  extId: string;
  }