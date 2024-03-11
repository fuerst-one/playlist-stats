import React, { useMemo } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import { interpolate } from "@/utils/interpolate";
import { formatTrackDuration } from "./utils";
import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";

export const DurationPopularityStatistic = ({
  trackStatistics,
  isLoading,
}: {
  trackStatistics: TrackStatistic[];
  isLoading?: boolean;
}) => {
  const data = useMemo(() => {
    // Group by duration to calculate avg popularity
    const groupedByDuration = groupBy(
      trackStatistics,
      (track) => Math.round(track.duration_ms / 15000) * 15000,
    );
    const groupKeys = Object.keys(groupedByDuration);

    // Calculate symbol size based on popularity
    const lengthFactor = interpolate(1, 100, 10, 5, groupKeys.length);
    const popularities = trackStatistics.map((track) => track.popularity);
    const popularityMin = Math.min(...popularities);
    const popularityMax = Math.max(...popularities);

    const getSymbolSize = (popularity: number) => {
      return Math.round(
        interpolate(
          popularityMin,
          popularityMax,
          lengthFactor,
          lengthFactor * 5,
          popularity,
        ),
      );
    };

    const data = Object.entries(groupedByDuration).map(
      ([groupLabel, entries]) => {
        const duration = parseInt(groupLabel);
        const recordCount = entries.length;
        const popularitySum = sumBy(entries, "popularity");
        const popularityAvg = Math.round(popularitySum / recordCount);
        const name = formatTrackDuration(duration, "ms");
        const value = recordCount;
        const symbolSize = getSymbolSize(popularityAvg);
        return {
          name,
          value,
          symbolSize,
          duration,
          recordCount,
          popularitySum,
          popularityAvg,
        };
      },
    );

    return data;
  }, [trackStatistics]);

  return (
    <StatisticCard
      label="Recordcount by Duration"
      isLoading={isLoading}
      chartOptions={{
        xAxis: {
          type: "category",
          data: data.map((entry) => entry.name),
        },
        yAxis: {
          type: "value",
          data: data.map((entry) => entry.recordCount),
        },
        series: [
          {
            data: data,
            type: "scatter",
            label: {
              show: true,
              formatter: (param: { data: (typeof data)[number] }) => {
                const entry = param.data;
                return entry.popularityAvg;
              },
              minMargin: 3,
            },
          },
          {
            data: data,
            type: "bar",
            itemStyle: {
              width: 1,
            },
          },
        ],
        tooltip: {
          trigger: "item",
          formatter: (param: { data: (typeof data)[number] }) => {
            const entry = param.data;
            const duration = formatTrackDuration(entry.duration);
            return `Duration: ${duration}<br/>Tracks in range: ${entry.recordCount}<br/>Average popularity: ${entry.popularityAvg}`;
          },
        },
      }}
    />
  );
};
