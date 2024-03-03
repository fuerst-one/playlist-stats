"use server";

import {
  SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
  SPOTIFY_REFRESH_TOKEN_COOKIE_NAME,
} from "@/utils/constants";
import { cookies } from "next/headers";

export const deleteSpotifyTokens = async () => {
  cookies().delete(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME);
  cookies().delete(SPOTIFY_REFRESH_TOKEN_COOKIE_NAME);
};
