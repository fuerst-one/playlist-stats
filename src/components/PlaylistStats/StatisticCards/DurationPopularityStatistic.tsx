import React, { useMemo } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import { groupBy } from "lodash";
import dayjs from "dayjs";

export const DurationPopularityStatistic = ({
  trackStatistics,
}: {
  trackStatistics: TrackStatistic[];
}) => {
  const data = useMemo(() => {
    const baseData = trackStatistics.map(
      (track) =>
        [Math.round(track.duration_ms / 15000) * 15, track.popularity] as const,
    );

    const byDuration = groupBy(baseData, (entry) => entry[0]);

    const result = Object.entries(byDuration).map(([duration, entries]) => {
      const popularityAvg =
        entries.reduce((acc, entry) => acc + entry[1], 0) / entries.length;
      return [parseInt(duration, 10), popularityAvg, entries.length] as const;
    });

    const resultFiltered = result.filter(
      (entry) => entry[0] > 60 && entry[0] < 10 * 60,
    );

    return resultFiltered;
  }, [trackStatistics]);
  return (
    <StatisticCard
      label="Duration vs Popularity"
      option={{
        xAxis: {
          type: "value",
          dataIndex: 0,
          scale: true,
          axisLabel: {
            formatter: function (param: number) {
              console.log(param);
              return dayjs.duration(param, "seconds").format("mm:ss");
            },
          },
        },
        yAxis: {
          scale: true,
        },
        series: [
          {
            name: "Duration vs Popularity",
            data: data,
            type: "scatter",
            symbolSize: function (data: number[]) {
              return Math.sqrt(data[1]) ** 4 / 100;
            },
            label: {
              show: true,
              formatter: function (param: { data: number[] }) {
                return param.data[2];
              },
              minMargin: 3,
            },
          },
        ],
      }}
    />
  );
};
