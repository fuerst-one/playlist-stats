import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SpotifyPlaylistItem } from "@/types/Spotify";
import uniqBy from "lodash/uniqBy";

export const TracklistToolbar = ({
  tracks,
  selectedTracks,
  onChangeSelectedTracks,
  onChangeSearch,
  onToggleShowOnlySelected,
}: {
  tracks: SpotifyPlaylistItem[];
  selectedTracks: SpotifyPlaylistItem[];
  onChangeSelectedTracks: (tracks: SpotifyPlaylistItem[]) => void;
  onChangeSearch: (search: string) => void;
  onToggleShowOnlySelected: () => void;
}) => {
  const onSelectAll = () => {
    onChangeSelectedTracks(uniqBy([...selectedTracks, ...tracks], "track.id"));
  };

  const onDeselectAll = () => {
    onChangeSelectedTracks([]);
  };

  return (
    <div className="flex flex-wrap items-center justify-start gap-2 lg:flex-nowrap">
      <Button
        variant="outline"
        disabled={selectedTracks.length === tracks.length}
        onClick={onSelectAll}
      >
        Select All
      </Button>
      <Button
        variant="outline"
        disabled={selectedTracks.length === 0}
        onClick={onDeselectAll}
      >
        Deselect All
      </Button>
      <Input
        placeholder="Filter tracks"
        onChange={(e) => onChangeSearch(e.currentTarget.value)}
        className="order-last w-full lg:order-none"
      />
      <Button variant="outline" onClick={onToggleShowOnlySelected}>
        Show only Selected
      </Button>
    </div>
  );
};
