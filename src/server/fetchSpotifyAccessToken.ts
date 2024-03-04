"use server";

import { fetchJSON } from "@/utils/fetchJSON";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const SPOTIFY_REDIRECT_URI = process.env.NEXTAUTH_URL + "/api/auth/callback";

export const fetchSpotifyAccessToken = async (code: string) => {
  const response = await fetchJSON<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
  }>("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      redirect_uri: SPOTIFY_REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID!,
      client_secret: SPOTIFY_CLIENT_SECRET!,
      code,
    }),
  });

  return {
    accessToken: response.access_token,
    expires: Date.now() + response.expires_in * 1000, // convert expires_in from seconds to milliseconds
    refreshToken: response.refresh_token,
  };
};
