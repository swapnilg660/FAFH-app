import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";
import LineGraph from "@chartiful/react-native-line-graph";

import { BarChart, Grid, StackedBarChart, YAxis } from "react-native-svg-charts";
import { Center, useTheme } from "native-base";

const colors = ["#33691E", "#689F38", "#9CCC65", "#DCEDC8"];
const data = [
  {
    broccoli: {
      value: 3840,
      svg: {
        onPress: () => console.log("onPress => 0:broccoli:3840"),
      },
    },
    celery: {
      value: 1920,
      svg: {
        onPress: () => console.log("onPress => 0:celery:1920"),
      },
    },
    onions: {
      value: 960,
      svg: {
        onPress: () => console.log("onPress => 0:onions:960"),
      },
    },
    tomato: {
      value: 400,
      svg: {
        onPress: () => console.log("onPress => 0:tomato:400"),
      },
    },
  },
  {
    broccoli: {
      value: 1600,
      svg: {
        onPress: () => console.log("onPress => 1:broccoli:1600"),
      },
    },
    celery: {
      value: 1440,
      svg: {
        onPress: () => console.log("onPress => 1:celery:1440"),
      },
    },
    onions: {
      value: 960,
      svg: {
        onPress: () => console.log("onPress => 1:onions:960"),
      },
    },
    tomato: {
      value: 400,
      svg: {
        onPress: () => console.log("onPress => 1:tomato:400"),
      },
    },
  },
  {
    broccoli: {
      value: 640,
      svg: {
        onPress: () => console.log("onPress => 2:broccoli:640"),
      },
    },
    celery: {
      value: 960,
      svg: {
        onPress: () => console.log("onPress => 2:celery:960"),
      },
    },
    onions: {
      value: 3640,
      svg: {
        onPress: () => console.log("onPress => 2:onions:3640"),
      },
    },
    tomato: {
      value: 400,
      svg: {
        onPress: () => console.log("onPress => 2:tomato:400"),
      },
    },
  },
  {
    broccoli: {
      value: 3320,
      svg: {
        onPress: () => console.log("onPress => 3:broccoli:3320"),
      },
    },
    celery: {
      value: 480,
      svg: {
        onPress: () => console.log("onPress => 3:celery:480"),
      },
    },
    onions: {
      value: 640,
      svg: {
        onPress: () => console.log("onPress => 3:onions:640"),
      },
    },
    tomato: {
      value: 400,
      svg: {
        onPress: () => console.log("onPress => 3:tomato:400"),
      },
    },
  },
];
// create an array using all the value fields of the data

const keys = ["broccoli", "celery", "onions", "tomato"];

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

  const data1 = [
    14, -1, 100, -95, -94, -24, -8, 85, -91, 35, -53, 53, -78, 66, 96, 33, -26,
    -32, 73, 8,
  ].map((value) => ({ [value]: Math.abs(value) }));
  const data2 = [
    24, 28, 93, 77, -42, -62, 52, -87, 21, 53, -78, -62, -72, -6, 89, -70, -94,
    10, 86, 84,
  ].map((value) => ({ [value]: Math.abs(value) }));

  const barData = [
    {
      data: data1,
      svg: {
        fill: "rgb(134, 65, 244)",
      },
    },
    {
      data: data2,
    },
  ];

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

        <Center bg="primary.400" p="2" rounded="sm">
          {/* Y axis */}
          <YAxis
            data={data1}
            contentInset={{ top: 30, bottom: 30 }}
            svg={{
              fill: "grey",
              fontSize: 10,
            }}
            numberOfTicks={10}
            formatLabel={(value) => `${value}ºC`}
          />

          <BarChart
            style={{ height: 200 }}
            data={barData}
            yAccessor={({ item }) => item.value}
            svg={{
              fill: "green",
            }}
            contentInset={{ top: 30, bottom: 30 }}
            // {...this.props}
          >
            <Grid />
          </BarChart>
        </Center>
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
