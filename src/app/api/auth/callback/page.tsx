"use client";

import { NoAccessError } from "@/utils/NoAccessError";
import {
  setSpotifyAccessToken,
  setSpotifyRefreshToken,
} from "@/lib/spotifyTokens";
import { fetchSpotifyAccessToken } from "@/server/fetchSpotifyAccessToken";
import { useEffect } from "react";

const AuthCallback = ({
  searchParams: { code, error },
}: {
  searchParams: { code: string; error?: string };
}) => {
  if (error || !code) {
    throw new NoAccessError();
  }

  useEffect(() => {
    // Exchange code for token
    const getAccessToken = async () => {
      const response = await fetchSpotifyAccessToken(code);

      // Save tokens to local storage
      setSpotifyAccessToken(response.accessToken, response.expires);
      setSpotifyRefreshToken(response.refreshToken);
      window.location.href = "/playlists";
    };
    getAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center text-center text-xl font-semibold text-gray-300">
      Loading...
    </div>
  );
};

export default AuthCallback;
