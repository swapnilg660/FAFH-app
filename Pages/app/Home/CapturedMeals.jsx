import React from "react";
import {
  Box,
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
import { Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { HomeContext } from "../../../hooks/context";

function CapturedMeals({ navigation, route }) {
  const { colors } = useTheme();
  const { occasion } = route.params;
  const { meals, setMeals } = React.useContext(HomeContext);

  // function to get a random number
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  React.useEffect(() => {
    // console.log(meals);
  });

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <ScrollView py={10} px={5}>
        <Heading>{occasion}</Heading>

        {meals.map((meal, index) => {
          return (
            <HStack
              key={`${index}${meal}${getRandomNumber(1000, 100000)}`}
              bg="primary.50"
              rounded="lg"
              justifyContent={"space-between"}
              my={1}
              alignItems={"center"}
            >
              <HStack alignItems={"center"} space={2}>
                <Box size={12} h={"100%"}>
                  {meal.photo ? (
                    <Image
                      source={{
                        uri: "data:image/jpeg;base64," + meal.photo.base64,
                      }}
                      alt="Image Preview"
                      style={{
                        alignSelf: "stretch",
                        flex: 1,
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                      }}
                    />
                  ) : (
                    <Center size={10}>
                      <MaterialIcons
                        name="fastfood"
                        size={30}
                        color={colors["primary"]["700"]}
                      />
                    </Center>
                  )}
                </Box>
                <Text style={{ fontFamily: "Poppins-Light" }}>{meal.name}</Text>
              </HStack>

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
                  Alert.alert(
                    "Remove the selected Meal",
                    `Are you sure you want to remove ${meal.name} from your list?\nThis action cannot be undone.`,
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Yes",
                        onPress: () => {
                          setMeals((prev) =>
                            prev.filter((item) => item.name !== meal.name)
                          );
                        },
                      },
                    ],
                    { cancelable: true }
                  );
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
                  `Discard ${occasion}`,
                  `Are you sure you want to discard ${occasion}?\nThis action cannot be undone.`,
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
