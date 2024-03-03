"use server";

import {
  SpotifyEnumeratedResponse,
  SpotifyPlaylistItem,
} from "@/types/Spotify";
import { fetchSpotify } from "./fetchSpotify";

export const fetchPlaylistTracks = async (href: string) => {
  return await fetchSpotify<SpotifyEnumeratedResponse<SpotifyPlaylistItem>>(
    href,
  );
};
