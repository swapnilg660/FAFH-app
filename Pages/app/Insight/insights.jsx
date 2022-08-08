import React from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { BarChart, Grid, LineChart, YAxis } from "react-native-svg-charts";
import { Dimensions } from "react-native";
import * as Progress from "react-native-progress";

// Icons
import { FontAwesome5, Foundation, MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CarbsIcon,
  CerealIcon,
  FruitIcon,
  PieChartInsights,
  VegsIcon,
} from "./insightSvg";
import { PieChart } from "react-native-chart-kit";

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

  const data = [
    {
      name: "Carbs",
      quantity: 195,
      color: colors.primary["600"],
      legendFontColor: colors.primary["600"],
      legendFontSize: 15,
    },
    {
      name: "Protein",
      quantity: 100,
      color: colors.secondary["600"],
      legendFontColor: colors.secondary["600"],
      legendFontSize: 15,
    },
    {
      name: "Fat",
      quantity: 50,
      color: colors.danger["600"],
      legendFontColor: colors.danger["600"],
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <ScrollView>
        <Heading style={{ fontFamily: "Poppins-SemiBold" }} p={3} fontSize={35}>
          Insights
        </Heading>
        <HStack space="3" alignItems="center" justifyContent={"space-evenly"}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          <HStack space="3" justifyContent={"center"} alignItems="flex-start">
            <Foundation name="calendar" size={24} color="black" />
            <Heading style={{ fontFamily: "Poppins-Medium" }}>Today</Heading>
          </HStack>

          <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </HStack>
        <Heading
          m={4}
          style={{ fontFamily: "Poppins-Regular" }}
          fontSize={"2xl"}
        >
          Categories
        </Heading>
        <HStack
          space="3"
          alignItems="center"
          justifyContent={"space-between"}
          px={3}
        >
          <VStack space="1" alignItems={"center"}>
            <Center bg="secondary.200" rounded={"full"} size="16">
              <CerealIcon />
            </Center>
            <Text style={{ fontFamily: "Poppins-Light" }}>Cereals</Text>
          </VStack>
          <VStack space="1" alignItems={"center"}>
            <Center bg="primary.100" rounded={"full"} size="16">
              <FruitIcon />
            </Center>
            <Text style={{ fontFamily: "Poppins-Light" }}>Fruits</Text>
          </VStack>

          <VStack space="1" alignItems={"center"}>
            <Center bg="secondary.100" rounded={"full"} size="16">
              <VegsIcon />
            </Center>
            <Text style={{ fontFamily: "Poppins-Light" }}>Vegetables</Text>
          </VStack>

          <VStack space="1" alignItems={"center"}>
            <Center bg="primary.200" rounded={"full"} size="16">
              <CarbsIcon />
            </Center>
            <Text style={{ fontFamily: "Poppins-Light" }}>Carbs</Text>
          </VStack>
        </HStack>
        {/* Main VStack for all charts */}
        <VStack px={5} mt={5} space="5">
          {/* Body Intakes charts */}
          <VStack p={3} bg="primary.30" rounded="lg">
            <Box my={2}>
              <Text style={{ fontFamily: "Poppins-Light" }}>Carbs</Text>
              <Progress.Bar
                progress={65 / 100}
                width={Dimensions.get("window").width * 0.8}
                height={8}
                color={colors.primary[500]}
                unfilledColor={colors.primary[50]}
                borderWidth={0}
              />
            </Box>
            <Box my={2}>
              <Text style={{ fontFamily: "Poppins-Light" }}>Protein</Text>
              <Progress.Bar
                progress={35 / 100}
                width={Dimensions.get("window").width * 0.8}
                height={8}
                color={colors.secondary[500]}
                unfilledColor={colors.secondary[50]}
                borderWidth={0}
              />
            </Box>
            <Box my={2}>
              <Text style={{ fontFamily: "Poppins-Light" }}>Fat</Text>
              <Progress.Bar
                progress={49 / 100}
                width={Dimensions.get("window").width * 0.8}
                height={8}
                color={colors.red[600]}
                unfilledColor={colors.red[50]}
                borderWidth={0}
              />
            </Box>
            <HStack
              my={5}
              bg="primary.50"
              rounded={"xl"}
              p={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <VStack space="1">
                <Heading
                  color={"muted.400"}
                  style={{ fontFamily: "Poppins-SemiBold" }}
                >
                  Total Calories
                </Heading>
                <Heading
                  fontSize={"lg"}
                  style={{ fontFamily: "Poppins-Light" }}
                >
                  {/* {value} */}
                  320 Calories
                </Heading>
              </VStack>
              <PieChartInsights
                td={1}
                colors={[
                  colors.primary["500"],
                  colors.secondary["500"],
                  colors.danger["500"],
                ]}
              />
            </HStack>
          </VStack>
          {/* Expenditure */}
          <Heading
            style={{
              fontFamily: "Poppins-Regular",
            }}
          >
            Expenditure
          </Heading>

          <VStack p={3} bg="secondary.30" rounded="lg">
            <HStack
              space="3"
              alignItems="center"
              justifyContent={"space-evenly"}
            >
              <PieChartInsights
                colors={[
                  colors.primary["500"],
                  colors.secondary["500"],
                  colors.danger["500"],
                ]}
              />
              <VStack space="2">
                <HStack space="3" alignItems="center">
                  <Center bg="primary.500" rounded={"full"} size="3"></Center>
                  <Text style={{ fontFamily: "Poppins-Light" }}>Home</Text>
                </HStack>
                <HStack space="3" alignItems="center">
                  <Center bg="danger.500" rounded={"full"} size="3"></Center>
                  <Text style={{ fontFamily: "Poppins-Light" }}>Away</Text>
                </HStack>
              </VStack>
            </HStack>

            <Text
              fontSize="md"
              style={{
                fontFamily: "Poppins-Light",
              }}
            >
              You ve Spent 75% more money on food away from home, bringing food
              from home to work might help you save money.
            </Text>
          </VStack>

          <Heading
            style={{
              fontFamily: "Poppins-Regular",
            }}
          >
            Top Restaurants
          </Heading>
          <VStack space="3" mb={3}>
            {["McDonalds", "KFC", "Burger King", "Pizza Hut"].map(
              (item, index) => {
                return (
                  <HStack
                    key={index}
                    justifyContent={"space-between"}
                    p={4}
                    rounded={"xl"}
                    mb={1}
                    alignItems="center"
                    bg={"primary.30"}
                  >
                    <Text
                      fontSize="md"
                      style={{
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {`${index + 1}. ${item}`}
                    </Text>
                    <Text
                      fontSize="md"
                      style={{
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {`R${index + 1}000`}
                    </Text>
                  </HStack>
                );
              }
            )}
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
}

export default React.memo(Insights);
