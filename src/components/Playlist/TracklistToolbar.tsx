import React from "react";
import { Input } from "../ui/input";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";

export const TracklistToolbar = ({
  onChangeSearch,
}: {
  tracks: TrackStatistic[];
  onChangeSearch: (search: string) => void;
}) => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-2 lg:flex-nowrap">
      <Input
        placeholder="Filter tracks"
        onChange={(e) => onChangeSearch(e.currentTarget.value)}
        className="order-last w-full lg:order-none"
      />
    </div>
  );
};
