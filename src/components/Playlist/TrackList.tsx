import React, { ReactNode, useEffect, useState } from "react";
import { TrackListItem } from "./TrackListItem";
import { SpotifyPlaylistItem } from "@/types/Spotify";
import { TracklistToolbar } from "./TracklistToolbar";
import InfiniteScroll from "react-infinite-scroll-component";

export const TrackList = ({
  tracks,
  selectedTracks,
  hasNextPage,
  fetchNextPage,
  onChangeSelectedTracks,
}: {
  tracks: SpotifyPlaylistItem[];
  selectedTracks: SpotifyPlaylistItem[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  onChangeSelectedTracks: (tracks: SpotifyPlaylistItem[]) => void;
}) => {
  const [search, setSearch] = useState("");
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  // If search is used, call fetchNextPage until all tracks are loaded
  useEffect(() => {
    if (search && hasNextPage) {
      fetchNextPage();
    }
  }, [tracks, search, hasNextPage, fetchNextPage]);

  const toggleShowOnlySelected = () => setShowOnlySelected(!showOnlySelected);
  const toggleTrackSelected = (selectedTrack: SpotifyPlaylistItem) => {
    if (
      selectedTracks.find((track) => track.track.id === selectedTrack.track.id)
    ) {
      onChangeSelectedTracks(
        selectedTracks.filter(
          (track) => track.track.id !== selectedTrack.track.id,
        ),
      );
    } else {
      onChangeSelectedTracks([...selectedTracks, selectedTrack]);
    }
  };

  const filteredTracks = (showOnlySelected ? selectedTracks : tracks).filter(
    (track) =>
      !search ||
      track.track.name.toLowerCase().includes(search.toLowerCase()) ||
      track.track.artists.some((artist) =>
        artist.name?.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  return (
    <div className="space-y-4">
      <TracklistToolbar
        tracks={tracks}
        selectedTracks={selectedTracks}
        onChangeSelectedTracks={onChangeSelectedTracks}
        onChangeSearch={setSearch}
        onToggleShowOnlySelected={toggleShowOnlySelected}
      />
      <div className="overflow-hidden rounded border">
        <InfiniteScroll
          dataLength={filteredTracks.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Message>Loading...</Message>}
          height={450}
          className="scrollbar scrollbar-thumb-gray-600 scrollbar-track-gray-800 flex w-full flex-wrap items-start justify-start bg-gray-950 pr-1 pt-2"
        >
          {filteredTracks.map((track) => (
            <TrackListItem
              key={track.track.id}
              track={track}
              isSelected={
                !!selectedTracks.find(
                  (selectedTrack) => selectedTrack.track.id === track.track.id,
                )
              }
              onClick={() => toggleTrackSelected(track)}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const Message = ({ children }: { children: ReactNode }) => (
  <div className="my-4 w-full text-center text-lg font-semibold text-gray-500">
    {children}
  </div>
);
