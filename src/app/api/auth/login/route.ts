"use server";

import { redirect } from "next/navigation";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = `${process.env.NEXTAUTH_URL}/api/auth/callback`;

const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-top-read",
  "user-library-read",
  "user-read-recently-played",
];

export const GET = () => {
  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID!,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: scopes.join(" "),
  });

  redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
};
