import React from "react";
import {
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  ScrollView,
  Text,
  useTheme,
} from "native-base";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { HomeContext } from "../../../hooks/context";

function CapturedMeals({ navigation, route }) {
  const { colors } = useTheme();
  const { occasion } = route.params;
  const { meals } = React.useContext(HomeContext);

  React.useEffect(() => {
    console.log(meals);
  });

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <ScrollView py={10} px={5}>
        <Heading>{occasion}</Heading>

        {meals.map((meal, index) => {
          return (
            <HStack
              key={index}
              pl={3}
              bg="primary.50"
              rounded="lg"
              justifyContent={"space-between"}
              my={1}
              alignItems={"center"}
            >
              <Text style={{ fontFamily: "Poppins-Light" }}>{meal.name}</Text>
              <IconButton
                rounded={"none"}
                colorScheme="danger"
                variant="solid"
                borderRightRadius={"lg"}
                icon={
                  <MaterialIcons
                    name="remove-circle"
                    size={24}
                    color={colors.white}
                  />
                }
                onPress={() => {
                  console.log("hello");
                }}
              />
            </HStack>
          );
        })}
        <HStack
          pl={3}
          bg="primary.50"
          rounded="lg"
          justifyContent={"space-between"}
          alignItems={"center"}
          my={1}
        >
          <Text style={{ fontFamily: "Poppins-Light" }}>Add More...</Text>
          <IconButton
            rounded={"none"}
            colorScheme="secondary"
            variant="solid"
            borderRightRadius={"lg"}
            icon={
              <MaterialIcons name="add-circle" size={24} color={colors.white} />
            }
            onPress={() => {
              navigation.navigate("RecordFood", { foodType: occasion });
            }}
          />
        </HStack>
        <HStack
          space="3"
          mt={10}
          justifyContent={"flex-end"}
          alignItems="center"
        >
          <FormControl>
            <Input
              borderColor={colors["primary"]["30"]}
              bg={colors["primary"]["30"]}
              rounded="2xl"
              placeholder="Total Cost"
              style={{ fontFamily: "Poppins-Regular" }}
              fontSize={16}
              w={"50%"}
              rightElement={
                <Text px={5} pb={2} color={"muted.400"} fontSize="xl">
                  R
                </Text>
              }
            />
            <FormControl.HelperText>
              {
                "This helps you track your expenses blablabla.\nWe'll keep this between us."
              }
            </FormControl.HelperText>
          </FormControl>
        </HStack>
        <Center pt={10}>
          <Button.Group>
            <Button
              _text={{
                style: { fontFamily: "Poppins-Light" },
              }}
              onPress={() => {
                Alert.alert(
                  "Discard Meal",
                  "Are you sure you want to discard this meal?\nThis action cannot be undone.",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: () => {
                        // toast Meal Cancelled
                        navigation.navigate("Home");
                        console.log("OK Pressed");
                      },
                    },
                  ],
                  { cancelable: true }
                );
              }}
              colorScheme="danger"
            >
              Discard
            </Button>
            <Button
              _text={{
                style: { fontFamily: "Poppins-Light" },
              }}
              onPress={() => {
                //toast meal submitted successfully
                console.log("Food Submitted");
              }}
              colorScheme="primary"
            >
              Submit
            </Button>
          </Button.Group>
        </Center>
      </ScrollView>
    </>
  );
}

export default CapturedMeals;
