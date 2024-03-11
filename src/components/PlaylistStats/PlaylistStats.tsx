import React from "react";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import { ExplicitStatistic } from "./StatisticCards/ExplicitStatistic";
import { DurationStatistic } from "./StatisticCards/DurationStatistics";
import { TopAlbumsStatistics } from "./StatisticCards/TopAlbumsStatistics";
import { TopArtistsStatistics } from "./StatisticCards/TopArtistsStatistics";
import { ReleaseDateStatistics } from "./StatisticCards/ReleaseDateStatistics";
import { PopularityStatistics } from "./StatisticCards/PopularityStatistics";
import { DurationPopularityStatistic } from "./StatisticCards/DurationPopularityStatistic";

export const PlaylistStats = ({
  trackStatistics,
}: {
  trackStatistics: TrackStatistic[];
}) => {
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-2">
        <TopArtistsStatistics trackStatistics={trackStatistics} />
        <TopAlbumsStatistics trackStatistics={trackStatistics} />
        <DurationStatistic trackStatistics={trackStatistics} />
        <DurationPopularityStatistic trackStatistics={trackStatistics} />
        <PopularityStatistics trackStatistics={trackStatistics} />
        <ReleaseDateStatistics trackStatistics={trackStatistics} />
        <ExplicitStatistic trackStatistics={trackStatistics} />
      </div>
    </div>
  );
};
