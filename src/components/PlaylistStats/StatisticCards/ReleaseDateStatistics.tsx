import React, { useMemo } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import { countGroupAndSort } from "./utils";
import dayjs from "dayjs";

export const ReleaseDateStatistics = ({
  trackStatistics,
}: {
  trackStatistics: TrackStatistic[];
}) => {
  const data = useMemo(() => {
    return countGroupAndSort({
      data: trackStatistics,
      accessor: (track) => dayjs(track.releaseDate).format("YYYY-MM"),
      sorter: (entry) => dayjs(entry[0]).unix(),
    });
  }, [trackStatistics]);

  return (
    <StatisticCard
      label="Release Dates"
      option={{
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
