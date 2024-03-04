import {
  SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
  SPOTIFY_REFRESH_TOKEN_COOKIE_NAME,
} from "@/utils/constants";
import { useLocalStorage } from "@uidotdev/usehooks";

type SpotifyAccessToken = {
  token: string;
  expires: number;
};

export const getSpotifyAccessToken = () => {
  try {
    const valueRaw = localStorage.getItem(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME);
    const value = JSON.parse(valueRaw!) as SpotifyAccessToken;
    return value.expires > Date.now() ? value.token : null;
  } catch (error) {
    return null;
  }
};

export const setSpotifyAccessToken = (token: string, expires: number) => {
  localStorage.setItem(
    SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
    JSON.stringify({ token, expires }),
  );
};

export const clearSpotifyAccessToken = () => {
  localStorage.removeItem(SPOTIFY_ACCESS_TOKEN_COOKIE_NAME);
};

export const useSpotifyRefreshToken = () => {
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    SPOTIFY_REFRESH_TOKEN_COOKIE_NAME,
    null,
  );

  const clearRefreshToken = () => {
    setRefreshToken(null);
    return null;
  };

  return [refreshToken, setRefreshToken, clearRefreshToken] as const;
};

export const getSpotifyRefreshToken = () => {
  const refreshToken = localStorage.getItem(SPOTIFY_REFRESH_TOKEN_COOKIE_NAME);
  return refreshToken;
};

export const setSpotifyRefreshToken = (token: string) => {
  localStorage.setItem(SPOTIFY_REFRESH_TOKEN_COOKIE_NAME, token);
};

export const clearSpotifyRefreshToken = () => {
  localStorage.removeItem(SPOTIFY_REFRESH_TOKEN_COOKIE_NAME);
};
