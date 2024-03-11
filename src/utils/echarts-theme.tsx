import { getCssVar } from "./getCssVar";

const textColor = "#ccc";
const axisTextColor = "#aaa";
const borderColor = "#555";
const axisLineColor = "#888";
const splitLineColor = ["#444", "#333"];

export const echartsTheme = {
  color: [
    getCssVar("--color-primary-light"),
    getCssVar("--color-primary-dark"),
    getCssVar("--color-primary"),
  ],
  backgroundColor: "rgba(0, 0, 0, 0)",
  textStyle: {
    color: textColor,
  },
  title: {
    textStyle: {
      color: textColor,
    },
    subtextStyle: {
      color: axisTextColor,
    },
  },
  line: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: 4,
    symbol: "emptyCircle",
    smooth: false,
  },
  radar: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: 4,
    symbol: "emptyCircle",
    smooth: false,
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: borderColor,
    },
    emphasis: {
      itemStyle: {
        barBorderWidth: 0,
        barBorderColor: borderColor,
      },
    },
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: borderColor,
    },
    label: {
      color: textColor,
    },
    emphasis: {
      itemStyle: {
        borderWidth: 0,
        borderColor: borderColor,
      },
    },
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: borderColor,
    },
    emphasis: {
      itemStyle: {
        barBorderWidth: 0,
        barBorderColor: borderColor,
      },
    },
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: borderColor,
    },
    emphasis: {
      itemStyle: {
        barBorderWidth: 0,
        barBorderColor: borderColor,
      },
    },
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: borderColor,
    },
    lineStyle: {
      width: 1,
      color: borderColor,
    },
    symbolSize: 4,
    symbol: "emptyCircle",
    smooth: false,
    color: [
      getCssVar("--color-primary-light"),
      getCssVar("--color-primary"),
      getCssVar("--color-primary-dark"),
    ],
    label: {
      color: axisLineColor,
    },
    emphasis: {
      itemStyle: {
        barBorderWidth: 0,
        barBorderColor: borderColor,
      },
    },
  },
  treemap: {
    itemStyle: {
      color: getCssVar("--color-primary-light"),
      areaColor: getCssVar("--color-primary-light"),
      borderColor: getCssVar("--color-primary"),
      borderWidth: 0.5,
    },
    label: {
      color: textColor,
    },
    emphasis: {
      itemStyle: {
        areaColor: getCssVar("--color-primary"),
        borderColor: getCssVar("--color-primary-dark"),
        borderWidth: 1,
      },
    },
  },
  geo: {
    itemStyle: {
      areaColor: "#f3f3f3",
      borderColor: "#516b91",
      borderWidth: 0.5,
    },
    label: {
      color: "#000",
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(165,231,240,1)",
        borderColor: "#516b91",
        borderWidth: 1,
      },
      label: {
        color: "rgb(81,107,145)",
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: axisLineColor,
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: axisLineColor,
      },
    },
    axisLabel: {
      show: true,
      color: axisTextColor,
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: splitLineColor,
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: splitLineColor,
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: axisLineColor,
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: axisLineColor,
      },
    },
    axisLabel: {
      show: true,
      color: axisTextColor,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: splitLineColor,
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: splitLineColor,
      },
    },
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: axisLineColor,
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: axisLineColor,
      },
    },
    axisLabel: {
      show: true,
      color: axisTextColor,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: splitLineColor,
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: splitLineColor,
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: axisLineColor,
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: axisLineColor,
      },
    },
    axisLabel: {
      show: true,
      color: axisTextColor,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: splitLineColor,
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: splitLineColor,
      },
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: getCssVar("--color-primary"),
    },
    emphasis: {
      iconStyle: {
        borderColor: getCssVar("--color-primary-dark"),
      },
    },
  },
  legend: {
    color: axisTextColor,
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: axisLineColor,
        width: 1,
      },
      crossStyle: {
        color: axisLineColor,
        width: 1,
      },
    },
  },
  timeline: {
    lineStyle: {
      color: axisLineColor,
      width: 1,
    },
    itemStyle: {
      color: getCssVar("--color-primary-light"),
      borderWidth: 1,
    },
    controlStyle: {
      color: getCssVar("--color-primary-light"),
      borderColor: getCssVar("--color-primary"),
      borderWidth: 0.5,
    },
    checkpointStyle: {
      color: getCssVar("--color-primary"),
      borderColor: getCssVar("--color-primary-dark"),
    },
    label: {
      color: axisTextColor,
    },
    emphasis: {
      lineStyle: {
        color: axisLineColor,
      },
      itemStyle: {
        color: getCssVar("--color-primary-light"),
      },
      controlStyle: {
        color: getCssVar("--color-primary-light"),
        borderColor: getCssVar("--color-primary"),
        borderWidth: 0.5,
      },
      label: {
        color: axisTextColor,
      },
    },
  },
  visualMap: {
    color: ["#bf444c", "#d88273", "#f6efa6"],
  },
  dataZoom: {
    backgroundColor: "rgba(47,69,84,0)",
    dataBackgroundColor: "rgba(47,69,84,0.3)",
    fillerColor: "rgba(167,183,204,0.4)",
    handleColor: "#a7b7cc",
    handleSize: "100%",
    textStyle: {
      color: axisLineColor,
    },
  },
  markPoint: {
    label: {
      color: textColor,
    },
    emphasis: {
      label: {
        color: textColor,
      },
    },
  },
};
