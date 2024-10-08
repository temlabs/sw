import {
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyAudiobook,
  SpotifyCursors,
  SpotifyEpisode,
  SpotifyPagination,
  SpotifyPlaylist,
  SpotifyShow,
  SpotifyTrack,
  SpotifyTrackItem,
} from './nativeSpotifyTypes';

export interface SpotifyRecentlyPlayedTracksResponse {
  href: string;
  limit: number;
  next: string;
  cursors: SpotifyCursors;
  total: number;
  items: SpotifyTrackItem[];
}

export interface SpotifySearchResponse {
  tracks: SpotifyPagination<SpotifyTrack>;
  artists: SpotifyPagination<SpotifyArtist>;
  albums: SpotifyPagination<SpotifyAlbum>;
  playlists: SpotifyPagination<SpotifyPlaylist>;
  shows: SpotifyPagination<SpotifyShow>;
  episodes: SpotifyPagination<SpotifyEpisode>;
  audiobooks: SpotifyPagination<SpotifyAudiobook>;
}
