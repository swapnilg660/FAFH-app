import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";
import LineGraph from "@chartiful/react-native-line-graph";
function ForgotPassword({ navigation }) {
  const config = {
    hasYAxisBackgroundLines: false,
    xAxisLabelStyle: {
      rotation: 0,
      fontSize: 12,
      width: 70,
      yOffset: 4,
      xOffset: -15,
    },
    yAxisLabelStyle: {
      rotation: 30,
      fontSize: 13,
      prefix: "$",
      position: "bottom",
      xOffset: 15,
      decimals: 2,
      height: 100,
    },
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <VerticalBarGraph
          data={[20, 45, 28, 80, 99, 43, 50]}
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
          width={Dimensions.get("window").width - 35}
          height={Dimensions.get("window").width / 7 + 225}
          barRadius={5}
          barWidthPercentage={0.65}
          baseConfig={{
            hasXAxisBackgroundLines: false,
            xAxisLabelStyle: {
              position: "right",
              prefix: "$",
            },
          }}
          style={{
            paddingVertical: 10,
          }}
          barColor={"#F2C94C"}
        />
      </SafeAreaView>
    </>
  );
}

export default React.memo(ForgotPassword);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chart: {
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    backgroundColor: "#fff551",
    width: 375,
  },
});
