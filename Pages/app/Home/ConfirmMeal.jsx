import React, { useEffect, useContext, useState } from "react";
import {
  Box,
  Button,
  Center,
  // Checkbox,
  Container,
  FormControl,
  Heading,
  HStack,
  Input,
  Pressable,
  ScrollView,
  Skeleton,
  Text,
  useTheme,
  VStack,
} from "native-base";
import Checkbox from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, Image, useWindowDimensions } from "react-native";
import { HomeContext } from "../../../hooks/context";
import { background } from "native-base/lib/typescript/theme/styled-system";

function ConfirmMeal({ navigation, route }) {
  const { foodType, photo } = route.params;
  const { colors } = useTheme();
  const { setMeals, foundFood, homeError } = useContext(HomeContext);
  const { width, height } = Dimensions.get("window");

  const [displayedFood, setDisplayedFood] = useState([]);
  //   Food selection
  //  i have no idea whats happening here
  const [selectedFood, setSelectedFood] = useState();
  // const [selectedFood, setSelectedFood] = useState({});
  const [userSuggestion, setUserSuggestion] = React.useState("");
  const [isSuggestedFoodLoaded, setIsSuggestedFoodLoaded] = useState(true);
  const [isOtherInvalid, setIsOtherInvalid] = useState(false);

  const handleAddMeal = () => {
    if (userSuggestion.length) {
      if (selectedFood.Other === true && userSuggestion === "") {
        setIsOtherInvalid(true);
        alert("Please specify the food");
        return;
      }
      setIsOtherInvalid(false);
      // This is raising an error, will fix later

      // setSelectedFood({ ...selectedFood, Other: userSuggestion });
      setMeals((prev) => [
        ...prev,
        {
          photo: photo,
          name: `Meal from AI ${Math.random().toString().substring(2, 5)}`,
          nutritionalInfo: "nutritionalInfo we get from AI",
        },
      ]);
      navigation.navigate("CapturedMeal", {
        occasion: foodType,
      });
    } else {
      alert("Please select at least one suggestion");
    }
  };

  const getFood = (foundFood) => {
    console.log("ConfirmMeal.jsx: getFood() called", foundFood);
    if (foundFood?.length > 0) {
      let newFoundFood = foundFood.slice(0, 3);
      let subclasses = [];

      var toDisplayFood = newFoundFood.map((item) => {
        if (!item.subclasses.length > 0) {
          return item.name;
        } else {
          subclasses = [
            ...subclasses,
            ...item.subclasses.map((subitem) => subitem.name),
          ];
          return item.name;
        }
      });

      toDisplayFood = [...toDisplayFood, ...subclasses, "Other"].filter(
        (item) => item !== undefined
      );
      // Capitalize all the food names
      toDisplayFood = toDisplayFood.map(
        (item) => item.charAt(0).toUpperCase() + item.slice(1)
      );
      // console.log("[ConfirmMeal.jsx] toDisplayFood: ", toDisplayFood);
      setDisplayedFood(toDisplayFood);
      setSelectedFood(
        toDisplayFood.reduce((o, key) => ({ ...o, [key]: false }), {})
      );
      setIsSuggestedFoodLoaded(true);
    } else {
      console.log("[ConfirmMeal.jsx] getFood", "no food found");
      setIsSuggestedFoodLoaded(false);
    }
  };

  useEffect(() => {
    getFood(foundFood);
    return () => {
      setDisplayedFood([]);
      setSelectedFood([]);
    };
  }, [foundFood, homeError]);

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <ScrollView>
        {/* Header */}
        <HStack space="3" alignItems="center" my={10} mx={5} mb={5}>
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
          <Heading style={{ fontFamily: "Poppins-SemiBold" }}>
            {foodType}
          </Heading>
        </HStack>
        {/* Body */}
        <VStack space="2" px={2}>
          {/* Image Container */}
          <Box w={"full"} h={height / 3}>
            <Image
              source={{ uri: photo }}
              alt="Image Preview"
              style={{
                alignSelf: "stretch",
                flex: 1,
                borderRadius: 8,
              }}
            />
          </Box>
          {/* Suggestions Container */}
          <VStack space="5">
            <Heading
              style={{ fontFamily: "Poppins-Regular" }}
              pt={1}
              fontSize="md"
            >
              In this Image:
            </Heading>

            {/* Check box container */}
            <VStack alignItems={"center"} space={2}>
              {isSuggestedFoodLoaded &&
                [...new Set(displayedFood)].map((item, index) => {
                  console.log(
                    `\n${index}selectedFood[${item}]:`,
                    selectedFood[item]
                  );
                  return (
                    <Pressable
                      _pressed={{
                        bg: colors.primary["100"],

                        rounded: "lg",
                      }}
                      key={`${index}${index}`}
                      onPress={() =>
                        // can we discuss this part of code please, i need to know how it works
                        setSelectedFood({
                          ...selectedFood,
                          [item]: !selectedFood[item],
                        })
                      }
                    >
                      <Box>
                        <Box
                          bg={"primary.30"}
                          p={3}
                          rounded="lg"
                          w={width - width / 8}
                        >
                          <HStack space="3" alignItems="center">
                            <Checkbox
                              style={{
                                borderColor: colors.primary["600"],
                              }}
                              key={index}
                              value={selectedFood[item]}
                              color={
                                selectedFood[item]
                                  ? colors.primary["600"]
                                  : undefined
                              }
                            />
                            <Text>{item}</Text>
                          </HStack>
                          {selectedFood?.Other && item === "Other" && (
                            <FormControl isInvalid={isOtherInvalid}>
                              <Input
                                value={userSuggestion}
                                borderColor={"primary.30"}
                                p={2}
                                mt={2}
                                placeholder="Please specify"
                                fontSize={"md"}
                                bg={"white"}
                                onChangeText={(text) => {
                                  setUserSuggestion(text);
                                }}
                              />
                              <FormControl.ErrorMessage>
                                <Text fontSize="xs">
                                  This can't be empty if other is checked
                                </Text>
                              </FormControl.ErrorMessage>
                            </FormControl>
                          )}
                        </Box>
                      </Box>
                    </Pressable>
                  );
                })}
              {!isSuggestedFoodLoaded &&
                !homeError?.recError &&
                [1, 2, 3, 4].map((item, index) => (
                  <Skeleton
                    key={index}
                    my={1}
                    h={10}
                    width={(9 / 10) * width}
                    startColor={"primary.30"}
                    rounded="lg"
                  />
                ))}
              {homeError?.recError && (
                <Text>{homeError.recError}</Text>
              )}
            </VStack>

            <Center mb={5}>
              <Button.Group>
                <Button
                  onPress={() => {
                    navigation.goBack();
                  }}
                  width={"40%"}
                  colorScheme="danger"
                >
                  Cancel
                </Button>
                <Button
                  disabled={!userSuggestion.length && !isSuggestedFoodLoaded}
                  width={"40%"}
                  colorScheme="primary"
                  onPress={handleAddMeal}
                  
                >
                  Add
                </Button>
              </Button.Group>
            </Center>
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
}

export default ConfirmMeal;
