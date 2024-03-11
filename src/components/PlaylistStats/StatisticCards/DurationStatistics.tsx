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
      sorter: (entry) => dayjs.duration(entry[0]).asSeconds(),
    });
  }, [trackStatistics]);

  return (
    <StatisticCard
      label="Tracks by Duration"
      option={{
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
