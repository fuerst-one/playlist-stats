import { SpotifyPlaylist } from "@/types/Spotify";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { PlaylistItem } from "./PlaylistItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { LegalLinks } from "../LegalLinks";

export function PlaylistSearch({
  playlists,
  fetchNextPage,
  isLoading,
  hasNextPage,
  selectedPlaylist,
  onSelectPlaylist,
}: {
  playlists: SpotifyPlaylist[];
  fetchNextPage: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
  selectedPlaylist: SpotifyPlaylist | null;
  onSelectPlaylist: (playlist: SpotifyPlaylist | null) => void;
}) {
  const [search, setSearch] = useState("");

  // If search is used, call fetchNextPage until all tracks are loaded
  useEffect(() => {
    if (search && hasNextPage) {
      fetchNextPage();
    }
  }, [playlists, search, hasNextPage, fetchNextPage]);

  const filteredPlaylists = playlists.filter(
    (playlist) =>
      !search || playlist.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col p-4">
        <label htmlFor="playlist-search" className="hidden">
          Search Playlists
        </label>
        <Input
          id="playlist-search"
          placeholder="Search playlists"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          className="mb-2"
        />
        <LoadingMessage />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col p-4">
      <label htmlFor="playlist-search" className="hidden">
        Search Playlists
      </label>
      <Input
        id="playlist-search"
        placeholder="Search playlists"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        className="mb-2"
      />
      <div className="flex h-full w-full justify-stretch overflow-hidden rounded border">
        <InfiniteScroll
          dataLength={filteredPlaylists.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<LoadingMessage />}
          height="100%"
          className="h-full w-full overflow-y-scroll p-sm scrollbar scrollbar-track-gray-800 scrollbar-thumb-gray-600"
        >
          {filteredPlaylists.map((playlist) => (
            <PlaylistItem
              key={playlist.id}
              playlist={playlist}
              isSelected={selectedPlaylist?.id === playlist.id}
              onSelect={() =>
                onSelectPlaylist(
                  selectedPlaylist?.id === playlist.id ? null : playlist,
                )
              }
            />
          ))}
        </InfiniteScroll>
      </div>
      <LegalLinks className="mt-4 hidden lg:flex" />
    </div>
  );
}

const LoadingMessage = () => (
  <div className="mt-4 text-center font-semibold text-gray-500">Loading...</div>
);
