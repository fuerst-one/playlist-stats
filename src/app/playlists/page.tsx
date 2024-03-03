import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PlaylistPage } from "../../components/Playlist/PlaylistPage";
import { SPOTIFY_ACCESS_TOKEN_COOKIE_NAME } from "@/utils/constants";

const Playlists = async () => {
  const spotifyAccessToken = cookies().get(
    SPOTIFY_ACCESS_TOKEN_COOKIE_NAME,
  )?.value;
  if (!spotifyAccessToken) {
    redirect("/");
  }

  return <PlaylistPage />;
};

export default Playlists;
