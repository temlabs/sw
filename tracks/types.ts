export interface Track {
    artist: string;
    spotifyId: string;
    duration: number;
    name: string;
    artwork: string;
    id:number;// needs updating on be i think
  }

  export interface CreateTrackParams {
    text: string;
  track: Track;
  timeIn: number;
  timeOut: number;
  extId: string;
  }