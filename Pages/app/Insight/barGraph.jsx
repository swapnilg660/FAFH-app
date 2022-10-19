import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";
import { useTheme } from "native-base";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

function BarGraphAll({ data }) {
  const { fonts, colors } = useTheme();

  const config = {
    xAxisLabelStyle: {
      fontFamily: fonts.body,
      fontWeight: 600,
      color: colors.primary["700"],
      suffix: "cal",
      xOffset: -15,
      position: "left",
    },
    yAxisLabelStyle: {
      fontFamily: fonts.body,
      // fontSize?: number
      fontWeight: 600,
      color: colors.primary["700"],
      // rotation?: number
      // xOffset?: number
      // yOffset?: number
      // height?: number
    },
    hasXAxisBackgroundLines: true,
    xAxisBackgroundLineStyle: {
      strokeWidth: 0.8,
      color: colors.primary["700"],
    },
  };
  useEffect(() => {
    console.log(fonts);
  }, [data]);

  return (
    <View
      style={
        {
          // borderWidth: 1,
        }
      }
    >
      <VerticalBarGraph
        data={data ? Object.values(data) : [10, 20, 30, 40, 40, 20, 20]}
        labels={
          data
            ? Object.keys(data)
            : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        }
        width={Dimensions.get("window").width - 50}
        height={300}
        barRadius={5}
        barWidthPercentage={0.65}
        baseConfig={config}
        style={styles.chart}
        barColor={colors.secondary["400"]}
      />
    </View>
  );
}

export default BarGraphAll;
const styles = StyleSheet.create({
  chart: {
    marginBottom: 10,
    padding: 5,
    paddingTop: 10,
    borderRadius: 20,
    backgroundColor: "transparent",
    width: Dimensions.get("window").width - 50,
  },
});
