"use client";

import { fetchJSON } from "@/utils/fetchJSON";
import { refreshSpotifyAccessToken } from "../server/refreshSpotifyAccessToken";
import { TokenMissingError } from "@/utils/TokenMissingError";
import {
  getSpotifyAccessToken,
  getSpotifyRefreshToken,
  setSpotifyAccessToken,
} from "@/lib/spotifyTokens";

export const fetchSpotify = async <ReturnValue>(
  input: RequestInfo,
  init?: RequestInit | undefined,
): Promise<ReturnValue> => {
  const accessToken = getSpotifyAccessToken();
  const refreshToken = getSpotifyRefreshToken();

  if (accessToken) {
    const response = await fetchJSON<ReturnValue>(input, {
      ...init,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...init?.headers,
      },
    });
    return response;
  }

  // Use refresh token to get a new access token if SpotifyAccessTokenGuard hasn't already done it
  if (refreshToken) {
    const response = await refreshSpotifyAccessToken(refreshToken);
    setSpotifyAccessToken(response.accessToken, response.expires);
    return fetchSpotify(input, init);
  }

  throw new TokenMissingError();
};
