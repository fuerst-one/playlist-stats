import { fetchJSON } from "@/utils/fetchJSON";
import { refreshSpotifyAccessToken } from "./refreshSpotifyAccessToken";
import { getSpotifyAccessToken } from "./getSpotifyAccessToken";
import { isApiErrorWithStatus } from "@/utils/ApiError";

export const fetchSpotify = async <ReturnValue>(
  input: RequestInfo,
  init?: RequestInit | undefined,
): Promise<ReturnValue> => {
  const spotifyAccessToken = getSpotifyAccessToken();
  try {
    const response = await fetchJSON<ReturnValue>(input, {
      ...init,
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
        ...init?.headers,
      },
    });
    return response;
  } catch (error) {
    if (isApiErrorWithStatus(error, 401)) {
      await refreshSpotifyAccessToken();
      return await fetchSpotify<ReturnValue>(input, init);
    }
    throw error;
  }
};
