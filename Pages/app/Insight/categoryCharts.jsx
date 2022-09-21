import { HStack, Box, useTheme } from "native-base";
import React from "react";
import { View } from "react-native";
import { LineChart, Path, Grid, XAxis, YAxis } from "react-native-svg-charts";
import Category from "./categoryComponent";

function BarChartCat({ data }) {
  const { colors } = useTheme();
  const axesSvg = { fontSize: 10, fill: "grey" };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;

  const yAxisData = [];
  let xAxisData = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].data.length; j++) {
      yAxisData.push(data[i].data[j].value);
      xAxisData.push(data[i].data[j].day);
    }
  }
  xAxisData = [...new Set(xAxisData)];
  let chartData = data.map((e) => {
    let color = e.bg;
    let [c, variation] = color.split(".");
    return {
      data: e.data.map((e) => e.value),
      svg: { stroke: colors[c][variation] },
    };
  });
  console.log("Chart data:", chartData);

  return (
    <HStack height={"200px"}>
      <YAxis
        data={yAxisData}
        style={{ marginBottom: xAxisHeight,marginHorizontal: 10 }}
        contentInset={verticalContentInset}
        svg={axesSvg}
        formatLabel={(value) => `${value}cal`}
      />
      <Box minWidth="100%">
        <LineChart
          style={{ flex: 1 }}
          data={chartData}
          contentInset={verticalContentInset}
        >
          <Grid />
        </LineChart>
        <XAxis
          style={{ marginHorizontal: -10, height: xAxisHeight }}
          data={xAxisData}
          formatLabel={(value, index) => {
            return xAxisData[index];
          }}
          contentInset={{ left: 20, right: 20 }}
          svg={axesSvg}
        />
      </Box>
    </HStack>
  );
}

export { BarChartCat };
