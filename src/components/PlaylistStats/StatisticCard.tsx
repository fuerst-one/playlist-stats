import React, { ReactNode, useMemo } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import ReactECharts, { EChartsReactProps } from "echarts-for-react";
import { echartsTheme } from "../../utils/echarts-theme";
import merge from "lodash/merge";

export const StatisticCard = ({
  label,
  isLoading,
  addon,
  chartOptions,
}: {
  label: string;
  isLoading?: boolean;
  addon?: ReactNode;
  chartOptions: EChartsReactProps["option"];
}) => {
  const option = useMemo(() => {
    return merge(
      {},
      {
        grid: { left: 35, right: 10, bottom: 20, top: 20, containLabel: true },
      },
      chartOptions,
    );
  }, [chartOptions]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="font-bold">{label}</div>
          {addon}
        </div>
      </CardHeader>
      <CardContent className="h-80">
        <div className="relative h-full w-full">
          <ReactECharts theme={echartsTheme} option={option} />
          {isLoading && (
            <div className="bg-gray-800/50 absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
              Loading...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
