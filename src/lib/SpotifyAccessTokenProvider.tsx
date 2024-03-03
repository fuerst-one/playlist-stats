"use client";

import { getSpotifyAccessToken } from "@/server/getSpotifyAccessToken";
import { useEffect } from "react";

export const SpotifyAccessTokenProvider = () => {
  useEffect(() => {
    if (!getSpotifyAccessToken()) {
      window.location.href = "/";
    }
  });
  return null;
};
