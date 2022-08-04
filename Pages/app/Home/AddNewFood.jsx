import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Input,
  ScrollView,
  Select,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import React from "react";

function AddNewFood({ navigation, route }) {
  //   const { foodType } = route.params;

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
  const { colors } = useTheme();
  return (
    <>
      <SafeAreaView></SafeAreaView>
      <ScrollView>
        <HStack
          space="3"
          alignItems="center"
          justifyContent={"space-between"}
          my={10}
          mx={5}
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
          <Button
            colorScheme="secondary"
            borderRadius={"2xl"}
            onPress={() => {
              console.log("pressed");
            }}
            leftIcon={
              <Ionicons
                name="checkmark-circle-sharp"
                size={24}
                color={colors["white"]}
              />
            }
          >
            Save
          </Button>
        </HStack>
        <Input
          borderColor={colors["primary"]["30"]}
          bg={colors["primary"]["30"]}
          m={5}
          mt={0}
          rounded="2xl"
          placeholder="Name of Food"
          style={{ fontFamily: "Poppins-Regular" }}
          fontSize={16}
          //   call search api here
          onSubmitEditing={(e) => console.log(e.nativeEvent.text)}
        />
        <HStack space="3" px={5} alignItems="center" mb={7}>
          <Input
            borderColor={colors["primary"]["30"]}
            bg={colors["primary"]["30"]}
            rounded="2xl"
            placeholder="Price"
            style={{ fontFamily: "Poppins-Regular" }}
            fontSize={16}
            w={"50%"}
            rightElement={
              // Currency will depend on the country/location
              <Text fontSize="lg" px={3} color={"muted.400"}>
                R
              </Text>
            }
          />
          <Select
            rounded="2xl"
            placeholder="Portion Size"
            style={{ fontFamily: "Poppins-Regular" }}
            minWidth="45%"
            fontSize={14}
            bg={colors["primary"]["30"]}
            borderColor={colors["primary"]["30"]}
          >
            <Select.Item label="JavaScript" value="js" />
            <Select.Item label="TypeScript" value="ts" />
            <Select.Item label="C" value="c" />
          </Select>
        </HStack>

        <VStack space="5" px={6} pb={10}>
          {Object.keys(nutritionalInfo).map((item) => {
            return (
              <HStack
                key={item}
                borderBottomColor={"muted.300"}
                borderBottomWidth={1}
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
                  <Text style={{ fontFamily: "Poppins-Light" }} fontSize="md">
                    {nutritionalInfo[item][0]}
                  </Text>
                  <Text style={{ fontFamily: "Poppins-Light" }}>
                    {nutritionalInfo[item][1]}
                  </Text>
                </HStack>
              </HStack>
            );
          })}
        </VStack>
      </ScrollView>
    </>
  );
}

export default AddNewFood;
