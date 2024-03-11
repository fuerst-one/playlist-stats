import React, { useMemo } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import ReactECharts from "echarts-for-react";
import { countGroupAndSort } from "./utils";
import dayjs from "dayjs";
import { echartsTheme } from "../../../../echarts-theme";

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
    <StatisticCard label="Release Dates">
      <ReactECharts
        theme={echartsTheme}
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
    </StatisticCard>
  );
};
