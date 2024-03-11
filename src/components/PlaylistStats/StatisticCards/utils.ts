import { TODO } from "@/types/TODO";
import sortBy from "lodash/sortBy";
import countBy from "lodash/countBy";

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
  sorter?: keyof T | ((entry: V) => number);
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
