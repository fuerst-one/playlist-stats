import React, { useMemo } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";

export const ExplicitStatistic = ({
  trackStatistics,
  isLoading,
}: {
  trackStatistics: TrackStatistic[];
  isLoading?: boolean;
}) => {
  const data = useMemo(() => {
    return [
      {
        name: "Not Explicit",
        value: trackStatistics.filter((track) => !track.explicit).length,
      },
      {
        name: "Explicit",
        value: trackStatistics.filter((track) => track.explicit).length,
      },
    ];
  }, [trackStatistics]);

  return (
    <StatisticCard
      label="Explicit Ratio"
      isLoading={isLoading}
      chartOptions={{
        series: [
          {
            data: data,
            type: "pie",
            radius: "66%",
            label: {
              show: true,
              formatter: "{b}: {c} ({d}%)",
              color: "#ccc",
            },
          },
        ],
        tooltip: {
          trigger: "axis",
        },
      }}
    />
  );
};
