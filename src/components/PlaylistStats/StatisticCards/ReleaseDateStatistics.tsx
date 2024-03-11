import React, { useMemo, useState } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import { countGroupAndSort } from "./utils";
import dayjs from "dayjs";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";

export const ReleaseDateStatistics = ({
  trackStatistics,
  isLoading,
}: {
  trackStatistics: TrackStatistic[];
  isLoading?: boolean;
}) => {
  const [granularity, setGranularity] = useState<"year" | "month">("year");

  const data = useMemo(() => {
    const formatByGranularity = granularity === "month" ? "YYYY-MM" : "YYYY";

    const { labels, values } = countGroupAndSort({
      data: trackStatistics,
      accessor: (track) => dayjs(track.releaseDate).format(formatByGranularity),
      sorter: (entry) => dayjs(entry[0]).unix(),
    });

    const axis = Array(dayjs().diff(dayjs(labels[0]), granularity) + 1).fill(0);

    return {
      labels: axis.map((_, index) =>
        dayjs(labels[0]).add(index, granularity).format(formatByGranularity),
      ),
      values: axis.map((_, index) => {
        const value = dayjs(labels[0])
          .add(index, granularity)
          .format(formatByGranularity);
        return values[labels.indexOf(value)] ?? 0;
      }),
    };
  }, [trackStatistics, granularity]);

  return (
    <StatisticCard
      label="Release Dates"
      isLoading={isLoading}
      addon={
        <ButtonGroup>
          <Button
            variant={granularity === "month" ? "default" : "outline"}
            size="xs"
            onClick={() => setGranularity("month")}
          >
            <span className="text-xs leading-tight">By Month</span>
          </Button>
          <Button
            variant={granularity === "year" ? "default" : "outline"}
            size="xs"
            onClick={() => setGranularity("year")}
          >
            <span className="text-xs leading-tight">By Year</span>
          </Button>
        </ButtonGroup>
      }
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
