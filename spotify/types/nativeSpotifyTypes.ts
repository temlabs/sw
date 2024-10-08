interface SpotifyExternalUrls {
  spotify: string;
}

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyArtist {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
  followers?: {
    href: string;
    total: number;
  };
  genres?: string[];
  images?: SpotifyImage[];
  popularity?: number;
}

export interface SpotifyAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: {
    reason: string;
  };
  type: string;
  uri: string;
  artists: SpotifyArtist[];
}

interface SpotifyExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export interface SpotifyTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: SpotifyExternalIds;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: any; // Replace 'any' with the appropriate type if available
  restrictions?: {
    reason: string;
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

interface SpotifyContext {
  type: string;
  href: string;
  external_urls: SpotifyExternalUrls;
  uri: string;
}

export interface SpotifyTrackItem {
  track: SpotifyTrack;
  played_at: string;
  context: SpotifyContext;
}

export interface SpotifyCursors {
  after: string;
  before: string;
}

interface SpotifyExternalUrls {
  spotify: string;
}

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyPagination<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifyPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SpotifyUser;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: 'playlist';
  uri: string;
}

interface SpotifyUser {
  external_urls: SpotifyExternalUrls;
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  type: 'user';
  uri: string;
  display_name: string;
}

export interface SpotifyShow {
  available_markets: string[];
  copyrights: {
    text: string;
    type: string;
  }[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: 'show';
  uri: string;
  total_episodes: number;
}

export interface SpotifyEpisode {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: 'day' | 'month' | 'year';
  resume_point: {
    fully_played: boolean;
    resume_position_ms: number;
  };
  type: 'episode';
  uri: string;
  restrictions?: {
    reason: string;
  };
}

export interface SpotifyAudiobook {
  authors: {
    name: string;
  }[];
  available_markets: string[];
  copyrights: {
    text: string;
    type: string;
  }[];
  description: string;
  html_description: string;
  edition: 'Unabridged' | 'Abridged';
  explicit: boolean;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: {
    name: string;
  }[];
  publisher: string;
  type: 'audiobook';
  uri: string;
  total_chapters: number;
}
