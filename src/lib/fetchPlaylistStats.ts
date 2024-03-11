"use client";

import {
  SpotifyEnumeratedResponse,
  SpotifyPlaylistItem,
} from "@/types/Spotify";
import { fetchSpotify } from "./fetchSpotify";
import chunk from "lodash/chunk";

const CHUNK_SIZE = 6;

export type TrackStatistic = {
  id: string;
  imageUrl?: string;
  name: string;
  artists: { name?: string; id: string }[];
  albumId: string;
  album: string;
  releaseDate: string;
  popularity: number;
  duration_ms: number;
  explicit: boolean;
};

export const fetchPlaylistStats = async (href: string) => {
  const firstResponse =
    await fetchSpotify<SpotifyEnumeratedResponse<SpotifyPlaylistItem>>(href);

  if (!firstResponse) {
    return [];
  }

  if (!firstResponse.next) {
    return firstResponse.items.map(transformTrack);
  }

  const { total, items } = firstResponse;
  const tracks = [...items];

  const numberOfPages = Math.ceil((total - 100) / 100);
  const urls = Array.from({ length: numberOfPages }).map(
    (_, idx) => `${href}?offset=${(idx + 1) * 100}&limit=100`,
  );

  const urlsChunked = chunk(urls, CHUNK_SIZE);

  for (const chunk of urlsChunked) {
    const responses = await Promise.all(
      chunk.map((url) =>
        fetchSpotify<SpotifyEnumeratedResponse<SpotifyPlaylistItem>>(url),
      ),
    );
    for (const response of responses) {
      tracks.push(...response.items);
    }
  }

  return tracks.map(transformTrack);
};

const transformTrack = (track: SpotifyPlaylistItem): TrackStatistic => {
  return {
    id: track.track.id,
    imageUrl: track.track.album.images[0].url,
    name: track.track.name,
    artists: track.track.artists.map((artist) => ({
      name: artist.name,
      id: artist.id,
    })),
    albumId: track.track.album.id,
    album: track.track.album.name,
    releaseDate: track.track.album.release_date,
    popularity: track.track.popularity,
    duration_ms: track.track.duration_ms,
    explicit: track.track.explicit,
  };
};
