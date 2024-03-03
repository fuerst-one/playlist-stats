export type SpotifyEnumeratedResponse<ReturnType> = {
  href: string;
  items: ReturnType[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type SpotifyPlaylist = {
  collaborative: false;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SpotifyUser;
  primary_color: null;
  public: false;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
};

export type SpotifyPlaylistItem = {
  added_at: string;
  added_by: SpotifyUser;
  is_local: false;
  primary_color: null;
  track: SpotifyTrack;
  video_thumbnail: {
    url: null;
  };
};

export type SpotifyTrack = {
  preview_url: string;
  available_markets: string[];
  explicit: false;
  type: string;
  episode: false;
  track: true;
  album: SpotifyAlbum;
  artists: SpotifyUser[];
  disc_number: number;
  track_number: number;
  duration_ms: number;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  popularity: 26;
  uri: string;
  is_local: false;
};

export type SpotifyAlbum = {
  available_markets: string[];
  type: string;
  album_type: string;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  uri: string;
  artists: SpotifyUser[];
  external_urls: {
    spotify: string;
  };
  total_tracks: number;
};

export type SpotifyUser = {
  external_urls: { spotify: string };
  href: string;
  id: string;
  type: string;
  uri: string;
  name?: string;
};

export type SpotifyImage = {
  url?: string;
  height: number | null;
  width: number | null;
};
