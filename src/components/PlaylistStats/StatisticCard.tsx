import React, { ReactNode } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";

export const StatisticCard = ({
  label,
  children,
}: {
  label: string;
  children?: ReactNode;
}) => {
  return (
    <Card>
      <CardHeader className="pb-0 font-bold">{label}</CardHeader>
      <CardContent className="h-80">
        <div className="h-full w-full">{children}</div>
      </CardContent>
    </Card>
  );
};
