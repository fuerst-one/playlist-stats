"use client";

import {
  getSpotifyAccessToken,
  getSpotifyRefreshToken,
  setSpotifyAccessToken,
} from "@/lib/spotifyTokens";
import { refreshSpotifyAccessToken } from "@/server/refreshSpotifyAccessToken";
import { useEffect } from "react";

export const SpotifyAccessTokenGuard = () => {
  // Check if the access token is expired and refresh it if it is
  useEffect(() => {
    const interval = setInterval(async () => {
      // getSpotifyAccessToken returns null if the token is expired
      // If we have an access token, we're good to go
      const accessToken = getSpotifyAccessToken();
      if (accessToken) {
        return;
      }

      // If we have a refresh token, we can get a new access token
      const refreshToken = getSpotifyRefreshToken();
      if (refreshToken) {
        const response = await refreshSpotifyAccessToken(refreshToken);
        console.log("Got new access token", response);
        setSpotifyAccessToken(response.accessToken, response.expires);
        return;
      }

      // If we don't have any token, we redirect to the homepage
      window.location.href = "/";
    }, 3600 * 1000); // Use expiry time from Spotify (1 hour) to check for a new token

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
};
