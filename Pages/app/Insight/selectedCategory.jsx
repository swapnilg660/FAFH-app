import React from "react";
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

function SelectedCategory({ category }) {
  const { colors } = useTheme();
  const [period, setPeriod] = React.useState([
    { name: "Daily", selected: false },
    { name: "Weekly", selected: true },
    { name: "Monthly", selected: false },
  ]);

  const fill = "rgb(134, 65, 244)";
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
        <BarChartCat data={dataWeek} fill={fill} />
        <VStack>
          {category.map((item) => (
            <HStack
              key={item.name}
              width={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text color="primary.600">{item.name}</Text>
              <Text color="primary.600">{item.value}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </>
  );
}

export default SelectedCategory;
