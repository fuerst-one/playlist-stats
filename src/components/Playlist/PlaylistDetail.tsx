"use client";

import React from "react";
import { SpotifyPlaylist } from "@/types/Spotify";
import { useQuery } from "@tanstack/react-query";
import { fetchPlaylistStats } from "@/lib/fetchPlaylistStats";
import { TrackList } from "./TrackList";
import dynamic from "next/dynamic";

const PlaylistStats = dynamic(
  async () => (await import("../PlaylistStats/PlaylistStats")).PlaylistStats,
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

export const PlaylistDetail = ({ playlist }: { playlist: SpotifyPlaylist }) => {
  const playlistStatsQuery = useQuery({
    queryKey: ["playlist stats", playlist.tracks.href],
    queryFn: () => fetchPlaylistStats(playlist.tracks.href),
    refetchInterval: 0,
    staleTime: 0,
  });

  return (
    <div className="h-full w-full p-4 scrollbar scrollbar-track-gray-800 scrollbar-thumb-gray-600 lg:overflow-y-scroll lg:p-8">
      <h1 className="mb-4 text-5xl font-bold text-white">{playlist.name}</h1>
      <h2 className="mb-2 text-lg font-semibold text-gray-200">
        Playlist Statistics
      </h2>
      <PlaylistStats trackStatistics={playlistStatsQuery.data ?? []} />
      <h2 className="mb-2 mt-8 text-lg font-semibold text-gray-200">
        {playlistStatsQuery.data?.length ?? "Loading"} Tracks
      </h2>
      <TrackList tracks={playlistStatsQuery.data ?? []} />
    </div>
  );
};
