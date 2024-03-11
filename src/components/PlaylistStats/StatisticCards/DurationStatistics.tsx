import React, { useMemo } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { countGroupAndSort, formatTrackDuration, getAverage } from "./utils";

dayjs.extend(duration);

export const DurationStatistic = ({
  trackStatistics,
  isLoading,
}: {
  trackStatistics: TrackStatistic[];
  isLoading?: boolean;
}) => {
  const data = useMemo(() => {
    return countGroupAndSort({
      data: trackStatistics,
      accessor: (track) => Math.round(track.duration_ms / 15000) * 15000,
      sorter: (entry) => dayjs.duration(entry[0]).asSeconds(),
    });
  }, [trackStatistics]);

  const average = useMemo(() => {
    return getAverage(trackStatistics.map((track) => track.duration_ms));
  }, [trackStatistics]);

  return (
    <StatisticCard
      label={
        average
          ? `Duration - ${formatTrackDuration(average, "ms")} average`
          : "Duration"
      }
      isLoading={isLoading}
      chartOptions={{
        xAxis: {
          type: "category",
          data: data.labels.map((label) => {
            const dayjsDuration = dayjs.duration(parseInt(label));
            return dayjsDuration.asMinutes() > 60
              ? "> 60"
              : dayjsDuration.format("mm:ss");
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
