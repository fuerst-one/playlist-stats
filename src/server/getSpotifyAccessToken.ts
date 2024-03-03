"use server";

import { SPOTIFY_ACCESS_TOKEN_COOKIE_NAME } from "@/utils/constants";
import { cookies } from "next/headers";

export const getSpotifyAccessToken = () => {
  const spotifyAccessToken = cookies().get(
    SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
  )?.value;
  return spotifyAccessToken;
};
