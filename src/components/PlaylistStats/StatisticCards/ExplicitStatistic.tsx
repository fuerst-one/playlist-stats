import React, { useMemo } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";

export const ExplicitStatistic = ({
  trackStatistics,
}: {
  trackStatistics: TrackStatistic[];
}) => {
  const data = useMemo(() => {
    return [
      trackStatistics.filter((track) => !track.explicit).length,
      trackStatistics.filter((track) => track.explicit).length,
    ];
  }, [trackStatistics]);
  return (
    <StatisticCard
      label="Explicit or not?"
      option={{
        grid: { left: 20, right: 0, bottom: 20, top: 20 },
        xAxis: {
          type: "category",
          data: ["Not Explicit", "Explicit"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data,
            type: "pie",
            label: {
              show: true,
              formatter: "{b}: {c} ({d}%)",
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
