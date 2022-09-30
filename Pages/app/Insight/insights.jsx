import React, { useEffect } from "react";
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
  DairyIcon,
  FatIcon,
  FruitIcon,
  PieChartInsights,
  ProteinIcon,
  VegsIcon,
} from "./insightSvg";
import Category from "./categoryComponent";
import SelectedCategory from "./selectedCategory";
import { getTopRestaurants } from "../../../services/mongoDB/insightsData";

function Insights({ navigation }) {
  const { colors } = useTheme();
  const [topRestaurants, setTopRestaurants] = React.useState(null);

  //categories data
  const [categories, setCategories] = React.useState([
    {
      name: "Carbs",
      Icon: CarbsIcon,
      bg: "primary.600",
      blurred: false,
      selected: false,
    },
    {
      name: "Fruits",
      Icon: FruitIcon,
      bg: "yellow.700",
      blurred: false,
      selected: false,
    },
    {
      name: "Vegetables",
      Icon: VegsIcon,
      bg: "green.400",
      blurred: false,
      selected: false,
    },
    {
      name: "Cereals",
      Icon: CerealIcon,
      bg: "secondary.200",
      blurred: false,
      selected: false,
    },
    {
      name: "Protein",
      Icon: ProteinIcon,
      bg: "red.400",
      blurred: false,
      selected: false,
    },
    {
      name: "Fat",
      Icon: FatIcon,
      bg: "yellow.300",
      blurred: false,
      selected: false,
    },
    {
      name: "Dairy",
      Icon: DairyIcon,
      bg: "blue.700",
      blurred: false,
      selected: false,
    },
  ]);
  const CategoriesScrollRef = React.useRef();

  useEffect(() => {
    //getting top restaurants
    getTopRestaurants(setTopRestaurants);
    console.log("TOP RESTAURANTS :", topRestaurants);
  }, []);

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

        {/* Categories */}
        <Heading
          m={4}
          style={{ fontFamily: "Poppins-Regular" }}
          fontSize={"2xl"}
        >
          Categories
        </Heading>
        <ScrollView
          ref={CategoriesScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <HStack
            space="3"
            alignItems="center"
            justifyContent={"space-between"}
            px={3}
          >
            {categories.map((category, index) => (
              <Category
                key={index}
                name={category.name}
                Icon={category.Icon}
                bg={category.bg}
                blurred={category.blurred}
                selected={category.selected}
                onPress={() => {
                  CategoriesScrollRef.current.scrollTo({
                    x: 0,
                    animated: true,
                  });
                  let newCategories = [...categories];
                  newCategories[index].selected =
                    !newCategories[index].selected;
                  if (newCategories.some((category) => category.selected)) {
                    newCategories = newCategories.map((category, i) => {
                      //if this category is selected don't blur it
                      return category.selected
                        ? { ...category, blurred: false }
                        : { ...category, blurred: true };
                    });
                  } else {
                    newCategories = newCategories.map((category, i) => {
                      category.blurred = false;
                      return category;
                    });
                  }

                  //sorting newCategories by selected [Copilot didn't help here by the way]
                  newCategories.sort((a, b) => {
                    a = a.selected ? 2 : 1;
                    b = b.selected ? 2 : 1;
                    return b - a;
                  });
                  setCategories(newCategories);
                }}
              />
            ))}
          </HStack>
        </ScrollView>
        {/* Main VStack for all charts */}
        <VStack px={5} mt={5} space="5">
          {categories.some((c) => c.selected) ? (
            <SelectedCategory category={categories.filter((c) => c.selected)} />
          ) : (
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
          )}
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

          {/* Top Restaurants */}
          <Heading
            style={{
              fontFamily: "Poppins-Regular",
            }}
          >
            Top Restaurants
          </Heading>
          <VStack space="3" mb={3}>
            {topRestaurants?.map((item, index) => {
              const [restaurantName, restaurantExpenses] = item;
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
                    {`${index + 1}. ${restaurantName}`}
                  </Text>
                  <Text
                    fontSize="md"
                    style={{
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    {`R${restaurantExpenses}`}
                  </Text>
                </HStack>
              );
            })}
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
}

export default React.memo(Insights);
