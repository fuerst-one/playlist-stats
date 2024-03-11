import React from "react";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import { ExplicitStatistic } from "./StatisticCards/ExplicitStatistic";
import { DurationStatistic } from "./StatisticCards/DurationStatistics";
import { TopArtistsStatistics } from "./StatisticCards/TopArtistsStatistics";
import { ReleaseDateStatistics } from "./StatisticCards/ReleaseDateStatistics";
import { PopularityStatistics } from "./StatisticCards/PopularityStatistics";

export const PlaylistStats = ({
  trackStatistics,
  isLoading,
}: {
  trackStatistics: TrackStatistic[];
  isLoading?: boolean;
}) => {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <TopArtistsStatistics
          trackStatistics={trackStatistics}
          isLoading={isLoading}
        />
        <ReleaseDateStatistics
          trackStatistics={trackStatistics}
          isLoading={isLoading}
        />
        <DurationStatistic
          trackStatistics={trackStatistics}
          isLoading={isLoading}
        />
        <PopularityStatistics
          trackStatistics={trackStatistics}
          isLoading={isLoading}
        />
        <ExplicitStatistic
          trackStatistics={trackStatistics}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
