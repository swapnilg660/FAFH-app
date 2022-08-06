import React, { useEffect } from "react";
import {
  Box,
  Center,
  Checkbox,
  Container,
  FormControl,
  Heading,
  HStack,
  Input,
  Pressable,
  ScrollView,
  useTheme,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, Image, useWindowDimensions } from "react-native";

function ConfirmMeal({ navigation, route }) {
  const { foodType, photo } = route.params;
  const { colors } = useTheme();

  const { width, height } = Dimensions.get("window");

  //   Food selection
  //function to get food from the API
  
  useEffect(() => {
  }, []);

  let foundFood = ["Chips", "Chicken", "Salad", "Rice", "Other"];
  const [selectedFood, setSelectedFood] = React.useState([]);

  useEffect(() => {});
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
          <Box borderWidth={1} w={"full"} h={height / 3} p={2}>
            <Image
              source={{ uri: "data:image/jpeg;base64," + photo.base64 }}
              alt="Image Preview"
              style={{
                alignSelf: "stretch",
                flex: 1,
              }}
            />
          </Box>
          <VStack space="5">
            <Heading style={{ fontFamily: "Poppins-Light" }} fontSize="md">
              In this Image:{" "}
            </Heading>

            <Checkbox.Group
              defaultValue={selectedFood}
              onChange={(value) => {
                setSelectedFood(value);
              }}
              px={2}
            >
              {foundFood.map((item, index) => {
                return (
                  <Box
                    key={index}
                    borderWidth={0.5}
                    m={1}
                    p="1"
                    rounded="lg"
                    w={"full"}
                  >
                    <Checkbox
                      value={item}
                      borderColor={"primary.600"}
                      colorScheme="primary"
                      style={{
                        fontFamily: "Poppins-Light",
                      }}
                    >
                      {item}
                    </Checkbox>
                    {selectedFood.some((item) => item === "Other") &&
                      item === "Other" && (
                        <FormControl>
                          <FormControl.Label></FormControl.Label>
                          <Input p={2} placeholder="Please specify other" />

                          <FormControl.ErrorMessage>
                            Something is wrong.
                          </FormControl.ErrorMessage>
                        </FormControl>
                      )}
                  </Box>
                );
              })}
            </Checkbox.Group>
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
}

export default ConfirmMeal;
