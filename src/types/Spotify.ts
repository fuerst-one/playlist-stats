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
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SpotifyUser;
  primary_color: string | null;
  public: boolean;
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
  is_local: boolean;
  primary_color: string | null;
  track: SpotifyTrack;
  video_thumbnail: {
    url: string | null;
  };
};

export type SpotifyTrack = {
  preview_url: string;
  available_markets: string[];
  explicit: boolean;
  type: string;
  episode: boolean;
  track: boolean;
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
  popularity: number;
  uri: string;
  is_local: boolean;
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
