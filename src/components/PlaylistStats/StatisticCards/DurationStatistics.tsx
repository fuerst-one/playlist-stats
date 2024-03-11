import React, { useMemo } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { countGroupAndSort } from "./utils";

dayjs.extend(duration);

export const DurationStatistic = ({
  trackStatistics,
}: {
  trackStatistics: TrackStatistic[];
}) => {
  const data = useMemo(() => {
    return countGroupAndSort({
      data: trackStatistics,
      accessor: (track) => Math.round(track.duration_ms / 15000) * 15000,
      sorter: (entry) => dayjs.duration(entry).asSeconds(),
      slice: 10,
    });
  }, [trackStatistics]);
  return (
    <StatisticCard
      label="Tracks by Duration"
      option={{
        grid: { left: 20, right: 0, bottom: 20, top: 20 },
        xAxis: {
          type: "category",
          data: data.labels.map((duration) => {
            const durationMs = parseInt(duration, 10);
            return dayjs.duration(durationMs).format("mm:ss");
          }),
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
