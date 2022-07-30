import React from "react";
import { Box, Button, ScrollView, Text, useTheme } from "native-base";
import { BarChart, Grid, LineChart, YAxis } from "react-native-svg-charts";
import { Dimensions, View } from "react-native";

// Icons
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Insights({ navigation }) {
  const { colors } = useTheme();
  const [value, setValue] = React.useState(0);

  // chart data
  const labels = [
    <MaterialCommunityIcons name="food-drumstick" size={24} color="black" />,
    <MaterialCommunityIcons name="bread-slice" size={24} color="black" />,
    <FontAwesome5 name="pizza-slice" size={24} color="black" />,
    <MaterialCommunityIcons name="fruit-watermelon" size={24} color="black" />,
    <MaterialCommunityIcons name="cup" size={24} color="black" />,
  ];

  //   const data = labels.map(() => {
  //     return {
  //       value: Math.random() * 100,
  //       svg: { fill: colors["primary"]["500"] },
  //     };
  //   });
  const data = [
    {
      value: 50,
      svg: {
        fill: "red",
      },
    },
    {
      value: 10,
      svg: {
        fill: "orange",
      },
    },
    {
      value: 95,
      svg: {
        fill: "purple",
      },
    },
    {
      value: 40,
      svg: {
        fill: "blue",
      },
    },
    {
      value: 85,
      svg: {
        fill: "green",
      },
    },
  ];

  return (
    <ScrollView>
      <Text>Insights page</Text>
      <ScrollView horizontal="true" p="2" rounded="lg">
        {/* <View style={{ height: 200, flexDirection: "row", borderWidth: 2 }}> */}
        {/* {console.log(data)} */}
        <YAxis
          data={data}
          contentInset={{ top: 30, bottom: 30 }}
          svg={{
            fill: "red",
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${value}ºC`}
        />
        <BarChart
          style={{ height: 200 }}
          spacingInner={0.1}
          gridMin={-10}
          gridMax={120}
          data={data}
          yAccessor={({ item }) => item.value}
          contentInset={{ top: 30, bottom: 30 }}
        />
        {/* </View> */}
      </ScrollView>
    </ScrollView>
  );
}

export default React.memo(Insights);
