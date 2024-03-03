"use server";

import {
  SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
  SPOTIFY_REFRESH_TOKEN_COOKIE_NAME,
} from "@/utils/constants";
import { fetchJSON } from "@/utils/fetchJSON";
import { cookies } from "next/headers";

export const refreshSpotifyAccessToken = async () => {
  const spotifyRefreshToken = cookies().get(
    SPOTIFY_REFRESH_TOKEN_COOKIE_NAME,
  )?.value;

  if (!spotifyRefreshToken) {
    throw new Error("No refresh token found");
  }

  const response = await fetchJSON<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }>("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: spotifyRefreshToken!,
      client_id: process.env.SPOTIFY_CLIENT_ID!,
    }),
  });

  cookies().set(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME, response.access_token, {
    maxAge: response.expires_in,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  cookies().set(SPOTIFY_REFRESH_TOKEN_COOKIE_NAME, response.refresh_token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};
