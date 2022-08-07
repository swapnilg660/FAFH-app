import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
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
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, Image, useWindowDimensions } from "react-native";
import { HomeContext } from "../../../hooks/context";

function ConfirmMeal({ navigation, route }) {
  const { foodType, photo } = route.params;
  const { colors } = useTheme();
  const { setMeals } = useContext(HomeContext);
  const { width, height } = Dimensions.get("window");

  //   Food selection
  //function to get food from the API

  let foundFood = ["Chips", "Chicken", "Salad", "Rice", "Other"];
  let [selectedFood, setSelectedFood] = useState(
    foundFood.reduce((o, key) => ({ ...o, [key]: "" }), {})
  );
  const [userSuggestion, setUserSuggestion] = React.useState("");
  const [isSuggestedFoodLoaded, setIsSuggestedFoodLoaded] = useState(true);
  const [isOtherInvalid, setIsOtherInvalid] = useState(false);

  /*ADDRESS THIS ISSUE */
  const updateSelectedFood = (key, value) => {
    const newSelectedFood = { ...selectedFood, [key]: value };
    setSelectedFood(newSelectedFood);
    // setSelectedFood(prev => ({ ...prev, [key]: value }));
  };

  const handleAddMeal = () => {
    console.log("Selected food changed [Confirm Meal]:", selectedFood);
    // If other is selected, userSuggestion can't be null

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
        name: `meal from AI ${Math.random().toString().substring(2,5)}`,
        nutritionalInfo: "nutritionalInfo we get from AI",
      },
    ]);
    navigation.navigate("CapturedMeal", {
      occasion: foodType,
      photo: photo,
    });
  };

  useEffect(() => {
    console.log("[Confirm Meal] Selected Food:", selectedFood);
  }, [selectedFood]);

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
          <Box w={"full"} h={height / 3}>
            <Image
              source={{ uri: "data:image/jpeg;base64," + photo.base64 }}
              alt="Image Preview"
              style={{
                alignSelf: "stretch",
                flex: 1,
                borderRadius: 8,
              }}
            />
          </Box>
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
                return (
                  <Box key={`${item}${index}`}>
                    {isSuggestedFoodLoaded ? (
                      <Box
                        key={index}
                        bg={"primary.30"}
                        p={3}
                        rounded="lg"
                        w={width - width / 8}
                      >
                        <Checkbox
                          checked={selectedFood[item] === "true"}
                          id={item}
                          onChange={(value) => {
                            updateSelectedFood(item, value);
                          }}
                          value={item}
                          borderColor={"primary.600"}
                          colorScheme="primary"
                          _text={{
                            style: {
                              fontFamily: "Poppins-Light",
                            },
                          }}
                        >
                          {item}
                        </Checkbox>
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
                                console.log(text);
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
