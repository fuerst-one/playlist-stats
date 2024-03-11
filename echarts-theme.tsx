const getCssVar = (name: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
};

export const echartsTheme = {
  color: [
    getCssVar("--color-primary-light"),
    getCssVar("--color-primary"),
    getCssVar("--color-primary-dark"),
    "#91cc75",
    "#fac858",
    "#ee6666",
    "#73c0de",
    "#3ba272",
    "#fc8452",
    "#9a60b4",
    "#ea7ccc",
  ],
  backgroundColor: "rgba(0, 0, 0, 0)",
  textStyle: {
    color: "white",
  },
  title: {
    textStyle: {
      color: "#ddd",
    },
    subtextStyle: {
      color: "#888",
    },
  },
  line: {
    itemStyle: {
      normal: {
        borderWidth: 1,
      },
    },
    lineStyle: {
      normal: {
        width: 2,
      },
    },
    symbolSize: 4,
    symbol: "emptyCircle",
    smooth: false,
  },
  radar: {
    itemStyle: {
      normal: {
        borderWidth: 1,
      },
    },
    lineStyle: {
      normal: {
        width: 2,
      },
    },
    symbolSize: 4,
    symbol: "emptyCircle",
    smooth: false,
  },
  bar: {
    itemStyle: {
      normal: {
        barBorderWidth: 0,
        barBorderColor: "#555",
      },
      emphasis: {
        barBorderWidth: 0,
        barBorderColor: "#555",
      },
    },
  },
  pie: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: "#555",
      },
      emphasis: {
        borderWidth: 0,
        borderColor: "#555",
      },
    },
    label: {
      normal: {
        textStyle: {
          color: "#555",
        },
      },
    },
  },
  scatter: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: "#555",
      },
      emphasis: {
        borderWidth: 0,
        borderColor: "#555",
      },
    },
  },
  boxplot: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: "#555",
      },
      emphasis: {
        borderWidth: 0,
        borderColor: "#555",
      },
    },
  },
  parallel: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: "#555",
      },
      emphasis: {
        borderWidth: 0,
        borderColor: "#555",
      },
    },
  },
  sankey: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: "#555",
      },
      emphasis: {
        borderWidth: 0,
        borderColor: "#555",
      },
    },
  },
  funnel: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: "#555",
      },
      emphasis: {
        borderWidth: 0,
        borderColor: "#555",
      },
    },
  },
  gauge: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: "#555",
      },
      emphasis: {
        borderWidth: 0,
        borderColor: "#555",
      },
    },
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: "#c23531",
        color0: "#314656",
        borderColor: "#c23531",
        borderColor0: "#314656",
        borderWidth: 1,
      },
    },
  },
  graph: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: "#555",
      },
    },
    lineStyle: {
      normal: {
        width: 1,
        color: "#555",
      },
    },
    symbolSize: 4,
    symbol: "emptyCircle",
    smooth: false,
    color: [
      getCssVar("--color-primary-light"),
      getCssVar("--color-primary"),
      getCssVar("--color-primary-dark"),
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc",
    ],
    label: {
      normal: {
        textStyle: {
          color: "#888",
        },
      },
    },
  },
  map: {
    itemStyle: {
      normal: {
        areaColor: "#f3f3f3",
        borderColor: "#516b91",
        borderWidth: 0.5,
      },
      emphasis: {
        areaColor: "rgba(165,231,240,1)",
        borderColor: "#516b91",
        borderWidth: 1,
      },
    },
    label: {
      normal: {
        textStyle: {
          color: "#000",
        },
      },
      emphasis: {
        textStyle: {
          color: "rgb(81,107,145)",
        },
      },
    },
  },
  geo: {
    itemStyle: {
      normal: {
        areaColor: "#f3f3f3",
        borderColor: "#516b91",
        borderWidth: 0.5,
      },
      emphasis: {
        areaColor: "rgba(165,231,240,1)",
        borderColor: "#516b91",
        borderWidth: 1,
      },
    },
    label: {
      normal: {
        textStyle: {
          color: "#000",
        },
      },
      emphasis: {
        textStyle: {
          color: "rgb(81,107,145)",
        },
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#888",
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#888",
      },
    },
    axisLabel: {
      show: true,
      color: "#ccc",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#444", "#333"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#888",
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#888",
      },
    },
    axisLabel: {
      show: true,
      color: "#ccc",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#444", "#333"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#888",
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#888",
      },
    },
    axisLabel: {
      show: true,
      color: "#ccc",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#444", "#333"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#888",
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#888",
      },
    },
    axisLabel: {
      show: true,
      color: "#ccc",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#444", "#333"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"],
      },
    },
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: "#06467c",
      },
      emphasis: {
        borderColor: "#4187c2",
      },
    },
  },
  legend: {
    textStyle: {
      color: "#888",
    },
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: "#888",
        width: 1,
      },
      crossStyle: {
        color: "#888",
        width: 1,
      },
    },
  },
  timeline: {
    lineStyle: {
      color: "#293c55",
      width: 1,
    },
    itemStyle: {
      normal: {
        color: "#293c55",
        borderWidth: 1,
      },
      emphasis: {
        color: "#a9334c",
      },
    },
    controlStyle: {
      normal: {
        color: "#293c55",
        borderColor: "#293c55",
        borderWidth: 0.5,
      },
      emphasis: {
        color: "#293c55",
        borderColor: "#293c55",
        borderWidth: 0.5,
      },
    },
    checkpointStyle: {
      color: "#e43c59",
      borderColor: "rgba(194,53,49,0.5)",
    },
    label: {
      normal: {
        textStyle: {
          color: "#293c55",
        },
      },
      emphasis: {
        textStyle: {
          color: "#293c55",
        },
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
      color: "#888",
    },
  },
  markPoint: {
    label: {
      normal: {
        textStyle: {
          color: "#eeeeee",
        },
      },
      emphasis: {
        textStyle: {
          color: "#eeeeee",
        },
      },
    },
  },
};
