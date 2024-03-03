"use client";

import { SpotifyPlaylist } from "@/types/Spotify";
import React, { useState } from "react";
import { PlaylistDetail } from "./PlaylistDetail";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPlaylists } from "@/server/fetchPlaylists";
import { PlaylistSearch } from "@/components/Playlist/PlaylistSearch";
import { AppLayout } from "@/components/AppLayout";
import { LegalLinks } from "@/components/LegalLinks";

export const PlaylistPage = () => {
  const [selectedPlaylist, setSelectedPlaylist] =
    useState<SpotifyPlaylist | null>(null);

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["playlists-infinite"],
    initialPageParam: "",
    queryFn: async ({ pageParam }) => await fetchPlaylists(pageParam),
    getNextPageParam: ({ next }) => next ?? undefined,
  });

  const playlists = data?.pages.map((page) => page.items).flat() ?? [];

  return (
    <AppLayout>
      <div className="flex flex-col lg:h-full lg:flex-row">
        <div className="h-[500px] w-full border-b shadow-lg lg:h-full lg:w-[400px] lg:border-b-0 lg:border-r">
          <PlaylistSearch
            playlists={playlists}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            selectedPlaylist={selectedPlaylist}
            onSelectPlaylist={setSelectedPlaylist}
          />
        </div>
        <div className="w-full lg:w-[calc(100%-400px)]">
          {selectedPlaylist ? (
            <PlaylistDetail playlist={selectedPlaylist} />
          ) : (
            <div className="flex h-full w-full items-center justify-center lg:p-4 lg:py-2">
              <h1 className="p-4 text-xl font-bold text-gray-500 lg:text-4xl">
                Select a playlist to start
              </h1>
            </div>
          )}
        </div>
      </div>
      <LegalLinks className="flex pb-4 lg:hidden" />
    </AppLayout>
  );
};
