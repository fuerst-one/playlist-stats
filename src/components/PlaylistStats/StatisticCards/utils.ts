import { TODO } from "@/types/TODO";
import sortBy from "lodash/sortBy";
import countBy from "lodash/countBy";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { DurationUnitType } from "dayjs/plugin/duration";

dayjs.extend(duration);

export const countGroupAndSort = <
  T extends Record<string, TODO>,
  V extends T[string],
>({
  data,
  accessor,
  sorter,
  reverse,
  slice,
}: {
  data: T[];
  accessor: keyof T | ((entry: T) => V);
  sorter?: keyof T | ((entry: [string, V]) => number);
  reverse?: boolean;
  slice?: number;
}) => {
  const counted = countBy(
    data,
    typeof accessor === "function" ? accessor : (track) => track[accessor],
  );

  const sorted = sortBy(
    Object.entries(counted),
    sorter ?? ((entry) => entry[1]),
  ) as [string, V][];

  if (reverse) {
    sorted.reverse();
  }

  const sliced = slice ? sorted.slice(0, slice) : sorted;

  return {
    labels: sliced.map(([label]) => label),
    values: sliced.map(([, count]) => count),
  };
};

export const formatTrackDuration = (
  duration: number,
  unit?: DurationUnitType,
) => {
  const dayjsDuration = dayjs.duration(duration, unit);
  return dayjsDuration.asMinutes() > 60
    ? "> 60"
    : dayjsDuration.format("mm:ss");
};

export const getAverage = (values: number[]) =>
  values.reduce((acc, value) => acc + value, 0) / values.length;
