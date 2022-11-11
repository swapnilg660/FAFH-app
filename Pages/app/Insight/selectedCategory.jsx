import React, { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Text,
  useTheme,
} from "native-base";
import { BarChartCat } from "./categoryCharts";
import { array } from "yup";
import { ScrollView } from "react-native-gesture-handler";
import Carrousel from "../../../Components/carrousel";
import { InsightContext } from "./insightStack";
import BarGraphAll from "./barGraph";

function SelectedCategory({ nutrient }) {
  const { filterList } = React.useContext(InsightContext);
  //Nutrition types
  const [nutrients, setNutrients] = React.useState([
    {
      name: "Carbs",
      bg: "primary.600",
      blurred: false,
      selected: false,
    },
    {
      name: "Fruits",
      bg: "yellow.700",
      blurred: false,
      selected: false,
    },
    {
      name: "Vegetables",
      bg: "green.400",
      blurred: false,
      selected: false,
    },
    {
      name: "Cereals",
      bg: "secondary.200",
      blurred: false,
      selected: false,
    },
    {
      name: "Protein",
      bg: "red.400",
      blurred: false,
      selected: false,
    },
    {
      name: "Fat",
      bg: "yellow.300",
      blurred: false,
      selected: false,
    },
    {
      name: "Dairy",
      bg: "blue.700",
      blurred: false,
      selected: false,
    },
  ]);
  const { colors } = useTheme();
  const [period, setPeriod] = React.useState([
    { name: "Daily", selected: false },
    { name: "Weekly", selected: true },
    { name: "Monthly", selected: false },
  ]);

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const dataWeek = [
    {
      day: "Mon",
      value: 2,
    },
    {
      day: "Tue",
      value: 1,
    },
    {
      day: "Wed",
      value: 1,
    },
    {
      day: "Thu",
      value: 0,
    },
    {
      day: "Fri",
      value: 2,
    },
    {
      day: "Sat",
      value: 3,
    },
    {
      day: "Sun",
      value: 5,
    },
  ];

  nutrient = nutrients.map((e) => {
    return {
      ...e,
      data: dataWeek.map((e) => {
        return { ...e, value: random(50, 300) };
      }),
    };
  });
  useEffect(() => {
    console.log("FilterList", filterList);
  }, [filterList]);

  const dataToShowOnChart = nutrient.filter((e) => filterList.includes(e.name));

  return (
    <>
      <HStack alignItems="center" width={"100%"}>
        {period.map((period) => (
          <Button
            colorScheme="primary"
            bg={period.selected ? "primary.600" : "primary.30"}
            flex={1}
            roundedLeft={period.name == "Daily" ? "xl" : "none"}
            roundedRight={period.name == "Monthly" ? "xl" : "none"}
            key={period.name}
            onPress={() => {
              setPeriod((prev) => {
                return prev.map((item) => {
                  if (item.name == period.name) {
                    return { ...item, selected: true };
                  } else {
                    return { ...item, selected: false };
                  }
                });
              });
            }}
          >
            <Text color={!period.selected ? "primary.600" : "white"}>
              {period.name}
            </Text>
          </Button>
        ))}
      </HStack>
      <Text mt={5}>Filter Nutrients</Text>
      <Carrousel
        dataFilter={nutrients.map((e) => e.name)}
        defaultElement="All"
      />
      <Heading
        mt={5}
        style={{
          fontFamily: "Poppins-SemiBold",
        }}
      >
        Calorie Intake
      </Heading>
      <Box
        alignSelf={"center"}
        m={2}
        p={5}
        rounded={10}
        width={"100%"}
        bg="primary.30"
        justifyContent={"center"}
        alignItems={"center"}
      >
        {filterList.length == 1 && filterList[0] == "All" ? (
          <BarGraphAll
            data={{
              Mon: 12,
              Tue: 10,
              Wed: 15,
              Thu: 20,
              Fri: 25,
              Sat: 30,
              Sun: 35,
            }}
          />
        ) : (
          <BarChartCat data={dataToShowOnChart} />
        )}
        <HStack
          justifyContent={"center"}
          alignItems={"center"}
          width="100%"
          bg={"muted.100"}
          p={2}
          rounded={"md"}
          space={2}
          flexWrap="wrap"
        >
          {nutrient.map((item) => {
            if (filterList.includes(item.name)) {
              return (
                <HStack key={item.name} alignItems={"center"}>
                  <Center bg={item.bg} m={1} p="1.5" rounded={"full"}></Center>
                  <Text color={"primary.600"}>{item.name}</Text>
                </HStack>
              );
            } else return null;
          })}

          {filterList.length == 1 && filterList[0] == "All" ? (
            <HStack alignItems={"center"}>
              <Text color={"primary.600"}>Average Calories</Text>
            </HStack>
          ) : null}
        </HStack>
      </Box>
    </>
  );
}

export default SelectedCategory;
