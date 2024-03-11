import React, { useMemo } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import { countGroupAndSort } from "./utils";

export const TopAlbumsStatistics = ({
  trackStatistics,
  isLoading,
}: {
  trackStatistics: TrackStatistic[];
  isLoading?: boolean;
}) => {
  const data = useMemo(() => {
    return countGroupAndSort({
      data: trackStatistics,
      accessor: "album",
      slice: 10,
      reverse: true,
    });
  }, [trackStatistics]);

  return (
    <StatisticCard
      label="Top 10 Albums"
      isLoading={isLoading}
      chartOptions={{
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
