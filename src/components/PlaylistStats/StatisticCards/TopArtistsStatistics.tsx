import React, { useMemo, useState } from "react";
import { StatisticCard } from "../StatisticCard";
import { TrackStatistic } from "@/lib/fetchPlaylistStats";
import countBy from "lodash/countBy";
import { getCssVar } from "@/utils/getCssVar";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { countGroupAndSort } from "./utils";

export const TopArtistsStatistics = ({
  trackStatistics,
  isLoading,
}: {
  trackStatistics: TrackStatistic[];
  isLoading?: boolean;
}) => {
  const [viewMode, setViewMode] = useState<"treemap" | "bar">("treemap");

  const chartOptions = useMemo(() => {
    if (viewMode === "treemap") {
      const artists = trackStatistics.map((track) => track.artists).flat();
      const artistCounts = countBy(artists, "name");
      const data = Object.entries(artistCounts)
        .sort((a, b) => b[1] - a[1])
        .filter((entry) => entry[1] > 1)
        .map(([name, value]) => ({
          name,
          value,
          children: [],
          itemStyle: {
            color: getCssVar("--color-primary-light"),
          },
          label: {
            color: getCssVar("--color-gray-600"),
          },
        }));

      return {
        xAxis: {
          show: false,
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            type: "treemap",
            data,
          },
        ],
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}",
        },
        dataZoom: {
          show: false,
        },
      };
    } else {
      const artists = trackStatistics.map((track) => track.artists).flat();
      const data = countGroupAndSort({
        data: artists,
        accessor: (artist) => artist.name,
        reverse: true,
      });

      return {
        xAxis: {
          show: true,
          type: "category",
          data: data.labels,
        },
        yAxis: {
          show: true,
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
        dataZoom: {
          show: true,
          start: 0,
          end: 10,
        },
      };
    }
  }, [trackStatistics, viewMode]);

  return (
    <StatisticCard
      label="Top Artists"
      addon={
        <ButtonGroup>
          <Button
            variant={viewMode === "treemap" ? "primary" : "outline"}
            size="xs"
            onClick={() => setViewMode("treemap")}
          >
            <span className="text-xs leading-tight">Treemap</span>
          </Button>
          <Button
            variant={viewMode === "bar" ? "primary" : "outline"}
            size="xs"
            onClick={() => setViewMode("bar")}
          >
            <span className="text-xs leading-tight">Bar</span>
          </Button>
        </ButtonGroup>
      }
      isLoading={isLoading}
      chartOptions={chartOptions}
    />
  );
};
