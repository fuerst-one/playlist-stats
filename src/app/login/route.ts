import { SPOTIFY_ACCESS_TOKEN_COOKIE_NAME } from "@/utils/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback`;

const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-top-read",
  "user-library-read",
  "user-read-recently-played",
];

export const GET = () => {
  const spotifyAccessToken = cookies().get(
    SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
  )?.value;
  if (spotifyAccessToken) {
    redirect("/");
  }

  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: clientId!,
    scope: scopes.join(" "),
    redirect_uri: redirectUri,
  });
  redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
};
