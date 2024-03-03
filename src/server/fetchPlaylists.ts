"use server";

import { SpotifyEnumeratedResponse, SpotifyPlaylist } from "@/types/Spotify";
import { fetchSpotify } from "./fetchSpotify";

export const fetchPlaylists = async (href?: string) => {
  return await fetchSpotify<SpotifyEnumeratedResponse<SpotifyPlaylist>>(
    href || `https://api.spotify.com/v1/me/playlists?limit=50`,
  );
};
