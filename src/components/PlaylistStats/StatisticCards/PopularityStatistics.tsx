import React, { useMemo } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { countGroupAndSort, getAverage } from "./utils";

dayjs.extend(duration);

const GRANULARITY = 5;

export const PopularityStatistics = ({
  trackStatistics,
  isLoading,
}: {
  trackStatistics: TrackStatistic[];
  isLoading?: boolean;
}) => {
  const data = useMemo(() => {
    const { labels, values } = countGroupAndSort({
      data: trackStatistics,
      accessor: (track) =>
        Math.round(track.popularity / GRANULARITY) * GRANULARITY,
      sorter: (entry) => parseInt(entry[0]),
    });

    const axis = Array(100 / GRANULARITY + 1).fill(0);

    return {
      labels: axis.map((_, index) => index * GRANULARITY + "%"),
      values: axis.map((_, index) => {
        const value = index * GRANULARITY;
        const valueIndex = labels.indexOf(value.toString());
        return values[valueIndex] ?? 0;
      }),
    };
  }, [trackStatistics]);

  const average = useMemo(() => {
    return Math.round(
      getAverage(trackStatistics.map((track) => track.popularity)),
    );
  }, [trackStatistics]);

  return (
    <StatisticCard
      label={average ? `Popularity - ${average}% average` : "Popularity"}
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
            type: "bar",
            data: data.values,
          },
        ],
        tooltip: {
          trigger: "axis",
        },
      }}
    />
  );
};
