import {
  SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
  SPOTIFY_REFRESH_TOKEN_COOKIE_NAME,
} from "@/utils/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const SPOTIFY_REDIRECT_URI = process.env.NEXTAUTH_URL + "/api/auth/callback";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  // Exchange code for token
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
          "base64",
        ),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID!,
      client_secret: SPOTIFY_CLIENT_SECRET!,
    }),
  });
  const tokenResponseData = await tokenResponse.json();
  const { access_token, expires_in, refresh_token } = tokenResponseData;

  cookies().set(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME, access_token, {
    maxAge: expires_in,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  cookies().set(SPOTIFY_REFRESH_TOKEN_COOKIE_NAME, refresh_token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  redirect("/");
};
