"use client";

import React, { useEffect, useMemo, useState } from "react";
import { SpotifyPlaylist, SpotifyPlaylistItem } from "@/types/Spotify";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPlaylistTracks } from "@/lib/fetchPlaylistTracks";
import { TrackList } from "./TrackList";
import dynamic from "next/dynamic";

// CollageCreator has to be imported dynamically because it uses Konva, which is a client-side only library
const CollageCreator = dynamic(
  async () => (await import("../CollageCreator/CollageCreator")).CollageCreator,
  {
    ssr: false,
  },
);

export const PlaylistDetail = ({ playlist }: { playlist: SpotifyPlaylist }) => {
  const [selectedTracks, setSelectedTracks] = useState<SpotifyPlaylistItem[]>(
    [],
  );

  const { data, isError, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["playlist", playlist.id],
    initialPageParam: playlist.tracks.href,
    queryFn: async ({ pageParam }) => await fetchPlaylistTracks(pageParam),
    getNextPageParam: ({ next }) => next ?? undefined,
  });

  useEffect(() => {
    if (!data?.pages.length) {
      setSelectedTracks([]);
      return;
    }
    setSelectedTracks(data.pages.flatMap((page) => page.items) ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.pages]);

  const isInitialLoading = !data?.pages.length && !isError;
  const tracksTotal = data?.pages[0].total;

  const tracks = useMemo(() => {
    return data?.pages.map((page) => page.items).flat() ?? [];
  }, [data?.pages]);

  const images = useMemo(() => {
    return selectedTracks.map((track) => ({
      ...(track.track.album.images[1] ?? track.track.album.images[0]),
      meta: {
        name: `${track.track.artists.map((a) => a.name).join(", ")} - ${track.track.name}`,
        link: track.track.external_urls.spotify,
      },
    }));
  }, [selectedTracks]);

  return (
    <div className="h-full w-full p-4 scrollbar scrollbar-track-gray-800 scrollbar-thumb-gray-600 lg:overflow-y-scroll lg:p-8">
      <h1 className="mb-4 text-5xl font-bold text-white">{playlist.name}</h1>
      <h2 className="mb-2 text-lg font-semibold text-gray-200">Your Collage</h2>
      <CollageCreator
        id={playlist.name}
        images={images}
        isInitialLoading={isInitialLoading}
      />
      <h2 className="mb-2 mt-8 text-lg font-semibold text-gray-200">
        {tracksTotal ?? "Loading"} Tracks{" "}
        {!isInitialLoading && (
          <span className="text-md font-normal text-gray-400">
            ({tracks.length} loaded / {selectedTracks.length} selected)
          </span>
        )}
      </h2>
      <TrackList
        tracks={tracks}
        selectedTracks={selectedTracks}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        onChangeSelectedTracks={setSelectedTracks}
      />
    </div>
  );
};
