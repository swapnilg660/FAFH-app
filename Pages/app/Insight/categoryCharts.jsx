import { HStack, Box } from "native-base";
import React from "react";
import { View } from "react-native";
import { LineChart, Path, Grid, XAxis, YAxis } from "react-native-svg-charts";

function BarChartCat({ data, fill }) {
  const axesSvg = { fontSize: 10, fill: "grey" };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;
  return (
    <HStack height={"200px"}>
      <YAxis
        data={data.map((item) => item.value)}
        style={{ marginBottom: xAxisHeight }}
        contentInset={verticalContentInset}
        svg={axesSvg}
      />
      <Box width="100%">
        <LineChart
          style={{ flex: 1 }}
          data={data.map((item) => item.value)}
          contentInset={verticalContentInset}
          svg={{ stroke: "rgb(134, 65, 244)" }}
        >
          <Grid />
        </LineChart>
        <XAxis
          style={{ marginHorizontal: -10, height: xAxisHeight }}
          data={data}
          formatLabel={(value, index) => {
            console.log("Format Label", data[index].day, index);
            return data[index].day;
          }}
          contentInset={{ left: 20, right: 20 }}
          svg={axesSvg}
        />
      </Box>
    </HStack>
  );
}

export { BarChartCat };
