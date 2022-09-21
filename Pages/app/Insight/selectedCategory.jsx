import React, { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  VStack,
  Text,
  useTheme,
} from "native-base";
import { BarChartCat } from "./categoryCharts";
import { array } from "yup";
import { ScrollView } from "react-native-gesture-handler";

function SelectedCategory({ category }) {
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

  category = category.map((e) => {
    return {
      ...e,
      data: dataWeek.map((e) => {
        return { ...e, value: random(50,300) };
      }),
    };
  });
  useEffect(() => {
  }, [category]);

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
        <BarChartCat data={category} />
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
          {category.map((item) => (
            <HStack key={item.name} alignItems={"center"}>
              <Center bg={item.bg} m={1} p="1.5" rounded={"full"}></Center>
              <Text color={"primary.600"}>{item.name}</Text>
            </HStack>
          ))}
        </HStack>
      </Box>
    </>
  );
}

export default SelectedCategory;
