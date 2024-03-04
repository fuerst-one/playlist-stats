"use client";

import React from "react";
import { Button, ButtonProps } from "./ui/button";
import {
  clearSpotifyAccessToken,
  clearSpotifyRefreshToken,
} from "@/lib/spotifyTokens";

export const LogoutButton = ({ size }: { size?: ButtonProps["size"] }) => {
  const logout = () => {
    clearSpotifyAccessToken();
    clearSpotifyRefreshToken();
    window.location.href = "/";
  };

  return (
    <Button size={size} variant="outline" onClick={logout}>
      Log out
    </Button>
  );
};
