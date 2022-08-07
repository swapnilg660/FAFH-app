import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Select,
  Skeleton,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ScrollView, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { HomeContext } from "../../../hooks/context";
import Collapsible from "react-native-collapsible";

function AddNewFood({ navigation, route }) {
  const [wasFoodSearched, setWasFoodSearched] = React.useState(false);
  const { foodType } = route.params;
  const { setMeals } = React.useContext(HomeContext);

  //display controllers
  const scrollViewRef = React.useRef();
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  // food search skeleton controller
  const [isNutritionalInfoLoaded, setIsNutritionalInfoLoaded] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  // dummy nutritional info data
  const nutritionalInfo = {
    "Calories/ serving": [300, "kcal"],
    Protein: [130, "g"],
    "Total Carbohydrate": [30, "g"],
    "Total Fat": [30, "g"],
    Sodium: [10, "mg"],
    Sugar: [13, "g"],
    Cholesterol: [10, "mg"],
    Fiber: [10, "g"],
    "Saturated Fat": [10, "g"],
    Potassium: [13, "mg"],
    "Vitamin A": [10, "%"],
    "Vitamin C": [13, "%"],
    Calcium: [10, "%"],
    Iron: [10, "%"],
    "Trans Fat": [10, "g"],
    "Dietary Fibre": [10, "g"],
  };

  // theme settings
  const { colors } = useTheme();

  React.useEffect(() => {
    // call search function
  }, [searchQuery]);
  return (
    <>
      <SafeAreaView></SafeAreaView>
      <ScrollView ref={scrollViewRef}>
        <HStack
          space="3"
          alignItems="center"
          justifyContent={"space-between"}
          m={5}
        >
          <HStack alignItems={"center"}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Center bg="primary.600" p="2" pl={2.5} rounded="full">
                <MaterialIcons
                  name="arrow-back-ios"
                  size={24}
                  color={colors["white"]}
                />
              </Center>
            </Pressable>
            <Heading style={{ fontFamily: "Poppins-SemiBold" }} pl={5}>
              Add New Food
            </Heading>
          </HStack>
        </HStack>
        {/* Search filters */}
        <>
          {wasFoodSearched ? (
            <Center bg="primary.30" py={5} m={3} mx={5} rounded={"xl"}>
              {/* Should be one of the selected search suggestion we get from autocomplete */}
              <Heading
                style={{ fontFamily: "Poppins-Medium" }}
                color="primary.700"
                textAlign={"center"}
                px={2}
              >
                {searchQuery}
                {/* A very long name of the food that we are looking for */}
              </Heading>
            </Center>
          ) : (
            <VStack px={5}>
              <Input
                borderColor={colors["primary"]["30"]}
                bg={colors["primary"]["30"]}
                my={5}
                rounded="2xl"
                placeholder="Name of Food"
                style={{ fontFamily: "Poppins-Regular" }}
                fontSize={16}
                //   call search api here
                onChangeText={(text) => {
                  setSearchQuery(text);
                }}
                onSubmitEditing={(e) => console.log(e.nativeEvent.text)}
              />
              <HStack space="3" alignItems="center" mb={7}>
                <Input
                  borderColor={colors["primary"]["30"]}
                  bg={colors["primary"]["30"]}
                  rounded="2xl"
                  placeholder="Portion Size"
                  style={{ fontFamily: "Poppins-Regular" }}
                  fontSize={16}
                  w={"50%"}
                />
                <Select
                  rounded="2xl"
                  placeholder="Portion Unit"
                  style={{ fontFamily: "Poppins-Regular" }}
                  minWidth="45%"
                  fontSize={14}
                  bg={colors["primary"]["30"]}
                  borderColor={colors["primary"]["30"]}
                >
                  <Select.Item label="Grammes" value="js" />
                  <Select.Item label="Ounce" value="ts" />
                  <Select.Item label="Milliliter" value="c" />
                </Select>
              </HStack>
              <Text style={{ fontFamily: "Poppins-Light" }} fontSize="md">
                More Search parameters
              </Text>
            </VStack>
          )}
        </>

        {wasFoodSearched ? (
          <VStack space="2" px={6} pb={10}>
            {/* Basic nutritional information */}
            <Heading color={"secondary.700"} style={{ fontFamily: "Poppins-Regular" }}>
              Basic nutritional information
            </Heading>

            {isCollapsed && Object.keys(nutritionalInfo)
              .slice(0, 5)
              .map((item, index) => {
                return (
                  <HStack
                    key={index}
                    borderBottomColor={"muted.300"}
                    borderBottomWidth={isNutritionalInfoLoaded ? 1 : 0}
                    justifyContent={"space-between"}
                    alignItems="center"
                  >
                    <Text
                      style={{ fontFamily: "Poppins-Light" }}
                      color={"primary.700"}
                      fontSize="md"
                    >
                      {item}
                    </Text>
                    <HStack
                      justifyContent={"space-between"}
                      alignItems="baseline"
                      bg="primary.30"
                      rounded="sm"
                      px={2}
                      width={"30%"}
                    >
                      <Text
                        style={{ fontFamily: "Poppins-Light" }}
                        fontSize="md"
                      >
                        {nutritionalInfo[item][0]}
                      </Text>
                      <Text style={{ fontFamily: "Poppins-Light" }}>
                        {nutritionalInfo[item][1]}
                      </Text>
                    </HStack>
                  </HStack>
                );
              })}

            {/* Collapsible controller */}
            <Button
              _text={{ style: { fontFamily: "Poppins-Regular" } }}
              colorScheme="primary"
              onPress={() => {
                setIsCollapsed((prev) => !prev);
              }}
              rightIcon={
                <MaterialIcons
                  name={isCollapsed ? "arrow-right" : "arrow-drop-down"}
                  size={24}
                  color={colors["primary"]["300"]}
                />
              }
            >
              Show All Nutritional information
            </Button>

            <Collapsible collapsed={isCollapsed}>
              {Object.keys(nutritionalInfo).map((item) => {
                return (
                  <HStack
                    key={item}
                    borderBottomColor={"muted.300"}
                    borderBottomWidth={isNutritionalInfoLoaded ? 1 : 0}
                    justifyContent={"space-between"}
                    alignItems="center"
                  >
                    <Skeleton
                      isLoaded={isNutritionalInfoLoaded}
                      my={1}
                      h={5}
                      rounded="md"
                      startColor="secondary.30"
                    >
                      <Text
                        style={{ fontFamily: "Poppins-Light" }}
                        color={"primary.700"}
                        fontSize="md"
                      >
                        {item}
                      </Text>
                    </Skeleton>
                    <HStack
                      justifyContent={"space-between"}
                      alignItems="baseline"
                      bg="primary.30"
                      rounded="sm"
                      px={2}
                      width={"30%"}
                    >
                      <Text
                        style={{ fontFamily: "Poppins-Light" }}
                        fontSize="md"
                      >
                        {nutritionalInfo[item][0]}
                      </Text>
                      <Text style={{ fontFamily: "Poppins-Light" }}>
                        {nutritionalInfo[item][1]}
                      </Text>
                    </HStack>
                  </HStack>
                );
              })}
            </Collapsible>
          </VStack>
        ) : (
          <Center>
            <Button
              disabled={!searchQuery.length > 0}
              onPress={() => {
                console.log("search query", searchQuery);
                setWasFoodSearched(true);
                scrollViewRef?.current?.scrollTo({
                  animated: true,
                  y: Dimensions.get("window").height,
                });
              }}
              colorScheme={searchQuery.length > 0 ? "secondary" : "muted"}
              _text={{ style: { fontFamily: "Poppins-Regular", fontSize: 17 } }}
              leftIcon={
                <MaterialIcons name="search" size={30} color={colors.white} />
              }
              w={"40%"}
            >
              Search
            </Button>
          </Center>
        )}
        {wasFoodSearched && (
          <Center p={4}>
            <Button.Group>
              <Button
                onPress={() => {
                  setWasFoodSearched(false);
                }}
                _text={{
                  style: { fontFamily: "Poppins-Regular", fontSize: 17 },
                }}
                leftIcon={
                  <MaterialIcons
                    name="youtube-searched-for"
                    size={30}
                    color={colors.white}
                  />
                }
                w={"50%"}
                colorScheme="secondary"
              >
                Search again
              </Button>
              <Button
                onPress={() => {
                  // navigation.navigate("RecordFood");
                  setMeals((prev) => [
                    ...prev,
                    { name: searchQuery, nutritionalInfo: nutritionalInfo },
                  ]);
                  navigation.navigate("CapturedMeal", {
                    occasion: foodType,
                  });
                }}
                colorScheme="primary"
                _text={{
                  style: { fontFamily: "Poppins-Regular", fontSize: 17 },
                }}
                rightIcon={
                  <MaterialIcons
                    name="check-circle"
                    size={30}
                    color={colors.white}
                  />
                }
                w={"40%"}
              >
                Save
              </Button>
            </Button.Group>
          </Center>
        )}
      </ScrollView>
    </>
  );
}

export default AddNewFood;
