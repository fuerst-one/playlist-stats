import React, { useState } from "react";
import { TrackListItem } from "./TrackListItem";
import { TracklistToolbar } from "./TracklistToolbar";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";

export const TrackList = ({ tracks }: { tracks: TrackStatistic[] }) => {
  const [search, setSearch] = useState("");

  const filteredTracks = tracks.filter(
    (track) =>
      !search ||
      track.name.toLowerCase().includes(search.toLowerCase()) ||
      track.artists.some((artist) =>
        artist.name?.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  return (
    <div className="space-y-4">
      <TracklistToolbar tracks={tracks} onChangeSearch={setSearch} />
      <div className="overflow-hidden rounded border">
        <div className="flex h-[450px] w-full flex-wrap items-start justify-start overflow-y-auto bg-gray-950 pr-1 pt-2 scrollbar scrollbar-track-gray-800 scrollbar-thumb-gray-600">
          {filteredTracks.map((track) => (
            <TrackListItem key={track.id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
};
