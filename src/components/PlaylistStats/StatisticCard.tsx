import React from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import ReactECharts, { EChartsReactProps } from "echarts-for-react";
import { echartsTheme } from "../../../echarts-theme";

export const StatisticCard = ({
  label,
  option,
}: {
  label: string;
  option: EChartsReactProps["option"];
}) => {
  return (
    <Card>
      <CardHeader className="pb-0 font-bold">{label}</CardHeader>
      <CardContent className="h-80">
        <div className="h-full w-full">
          <ReactECharts
            theme={echartsTheme}
            option={{
              grid: { left: 35, right: 5, bottom: 20, top: 20 },
              ...option,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
