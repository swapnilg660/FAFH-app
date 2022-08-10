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

function ConfirmMeal({ navigation, route }) {
  const { foodType, photo } = route.params;
  const { colors } = useTheme();
  const { setMeals, foundFood } = useContext(HomeContext);
  const { width, height } = Dimensions.get("window");

  //   Food selection
  //function to get food from the API

  // let foundFood = ["Chips", "Chicken", "Salad", "Rice", "Other"];
  //  i have no idea whats happening here
  const [selectedFood, setSelectedFood] = useState(
    foundFood.reduce((o, key) => ({ ...o, [key]: false }), {})
  );
  // const [selectedFood, setSelectedFood] = useState({});
  const [userSuggestion, setUserSuggestion] = React.useState("");
  const [isSuggestedFoodLoaded, setIsSuggestedFoodLoaded] = useState(false);
  const [isOtherInvalid, setIsOtherInvalid] = useState(false);

  const handleAddMeal = () => {
    if (selectedFood.Other === true && userSuggestion === "") {
      setIsOtherInvalid(true);
      alert("Please specify the food");
      return;
    }
    setIsOtherInvalid(false);
    setSelectedFood({ ...selectedFood, Other: userSuggestion });
    setMeals((prev) => [
      ...prev,
      {
        photo: photo,
        name: `meal from AI ${Math.random().toString().substring(2, 5)}`,
        nutritionalInfo: "nutritionalInfo we get from AI",
      },
    ]);
    navigation.navigate("CapturedMeal", {
      occasion: foodType,
      photo: photo,
    });
  };

  useEffect(() => {
    // console.log("[Confirm Meal] Selected Food:", selectedFood);
    if (foundFood.length > 0) {
      setIsSuggestedFoodLoaded(true);
    } else {
      console.log("[Confirm Meal] No suggested food found");
    }
    console.log("[ConfirmMeals.jsx] foundFood:", foundFood[0]);
  }, [foundFood]);

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
              {foundFood.map((item, index) => {
                // console.log(`selectedFood[${item}]:`, selectedFood[item]);
                return (
                  <Pressable
                    _pressed={{
                      bg: colors.primary["100"],

                      rounded: "lg",
                    }}
                    key={index}
                    onPress={() =>
                      // can we discuss this part of code please, i need to know how it works
                      setSelectedFood({
                        ...selectedFood,
                        [item]: !selectedFood[item],
                      })
                    }
                  >
                    <Box key={`${item.id}`}>
                      {isSuggestedFoodLoaded ? (
                        <Box
                          key={index}
                          bg={"primary.30"}
                          p={3}
                          rounded="lg"
                          w={width - width / 8}
                        >
                          {item.subclasses ? (
                            item.subclasses.map((subclass, index) => (
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
                                <Text>{subclass.name}</Text>
                              </HStack>
                            ))
                          ) : (
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
                              <Text>{item.name}</Text>
                            </HStack>
                          )}

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
                      ) : (
                        <Skeleton
                          my={1}
                          h={10}
                          width={(9 / 10) * width}
                          startColor={"primary.30"}
                          rounded="lg"
                        />
                      )}
                    </Box>
                  </Pressable>
                );
              })}
            </VStack>
            

            <Center mb={5}>
              <Button.Group>
                <Button width={"40%"} colorScheme="danger">
                  Cancel
                </Button>
                <Button
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
