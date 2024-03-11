import React, { useMemo } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import { countGroupAndSort } from "./utils";

export const TopArtistsStatistics = ({
  trackStatistics,
}: {
  trackStatistics: TrackStatistic[];
}) => {
  const data = useMemo(() => {
    return countGroupAndSort({
      data: trackStatistics,
      accessor: (track) =>
        track.artists.map((artist) => artist.name).join(", "),
      slice: 10,
      reverse: true,
    });
  }, [trackStatistics]);
  return (
    <StatisticCard
      label="Top 10 Artists"
      option={{
        grid: { left: 20, right: 0, bottom: 20, top: 20 },
        xAxis: {
          type: "category",
          data: data.labels,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data.values,
            type: "bar",
          },
        ],
        tooltip: {
          trigger: "axis",
        },
      }}
    />
  );
};
