import React from "react";
import { SpotifyPlaylist } from "@/types/Spotify";

export const PlaylistItem = ({
  playlist,
  isSelected,
  onSelect,
}: {
  playlist: SpotifyPlaylist;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <>
      <div
        onClick={onSelect}
        className={`flex w-full cursor-pointer items-center space-x-4 rounded p-2 ${
          isSelected ? "bg-gray-700 hover:bg-gray-600" : "hover:bg-gray-800"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Playlist cover"
          height="64"
          src={playlist.images[0]?.url || "/placeholder-user.jpg"}
          width="64"
        />
        <div className="grid gap-1.5">
          <div className="font-semibold text-white">{playlist.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-100">
            {playlist.tracks.total} tracks
          </div>
        </div>
      </div>
      <div className="my-2 w-full border-t" />
    </>
  );
};
