import React, { useMemo } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { countGroupAndSort } from "./utils";

dayjs.extend(duration);

export const PopularityStatistics = ({
  trackStatistics,
}: {
  trackStatistics: TrackStatistic[];
}) => {
  const data = useMemo(() => {
    return countGroupAndSort({
      data: trackStatistics,
      accessor: (track) => Math.round(track.popularity / 10) * 10,
      sorter: (entry) => entry,
      slice: 11,
    });
  }, [trackStatistics]);
  return (
    <StatisticCard
      label="Tracks by Popularity"
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
