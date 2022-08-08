import React from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Input,
  Pressable,
  Radio,
  ScrollView,
  Stagger,
  Text,
  useTheme,
  useToast,
  View,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, useWindowDimensions } from "react-native";
import { AddFoodIcon, EmptyPlateIcon } from "../../../Components/customSvgIcon";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import AlertComponent from "../../../Components/alert";
import ToastComponent from "../../../services/CustomToast";
import {
  getFood,
  getSuggestions,
} from "../../../services/foodDatabase/FoodDatabase";
function RecordFood({ navigation, route }) {
  // Fake data, we need a GET request to get this data
  const fakeCustomMeals = [9, 98, 76];

  const { foodType } = route.params;
  const [tabValue, setTabValue] = useState("Custom");
  const [stagger, setStagger] = useState(false);
  const { height, width } = useWindowDimensions();
  const rotateFab = useRef(new Animated.Value(0)).current;
  const toast = useToast();

  //   Alert Component Data
  const [alertVisible, setAlertVisible] = useState(false);

  const swiperRef = useRef();
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [food, setFood] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const [customMeal, setCustomMeal] = useState("");

  const rotateFabForward = () => {
    Animated.timing(rotateFab, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const rotateFabBackward = () => {
    Animated.timing(rotateFab, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const { colors } = useTheme();

  useEffect(() => {
    if (stagger) {
      rotateFabForward();
    } else {
      rotateFabBackward();
    }
  }, [stagger]);
  return (
    <>
      <SafeAreaView></SafeAreaView>
      <ScrollView flex={1} h={height}>
        <HStack space="3" alignItems="center" my={10} mx={5}>
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

        <Input
          // ref={SearchRef}
          getRef={(input) => {
            searchRef = input;
          }}
          borderColor={colors["primary"]["30"]}
          bg={colors["primary"]["30"]}
          m={5}
          mt={0}
          rounded="2xl"
          placeholder="Search food"
          style={{ fontFamily: "Poppins-Regular" }}
          fontSize={16}
          leftElement={
            <Octicons
              style={{ paddingLeft: 10 }}
              name="search"
              size={24}
              color={colors.muted["400"]}
            />
          }
          // on change, query suggested foods
          onChangeText={(text) => {
            // handleSuggest(text);
          }}
          // let them select a food and then add it to the list of selected foods
          // onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
        />

        {/* Tab value */}
        <HStack bg="secondary.30" m={3} rounded="full" flexWrap={"nowrap"}>
          <Pressable
            w={"50%"}
            onPress={() => {
              setTabValue("Custom");
              swiperRef.current.scrollToIndex({ index: 0, animated: true });
            }}
          >
            <Center
              width={"100%"}
              _text={{
                color: tabValue == "Custom" ? "white" : "secondary.600",
                style: { fontFamily: "Poppins-Medium", fontSize: 18 },
              }}
              bg={tabValue == "Custom" ? "secondary.600" : "transparent"}
              p={3}
              rounded="full"
            >
              Custom
            </Center>
          </Pressable>

          <Pressable
            w={"50%"}
            onPress={() => {
              setTabValue("Skip Meal");
              swiperRef.current.scrollToIndex({ index: 1, animated: true });
              setAlertVisible(true);
            }}
          >
            <Center
              _text={{
                color: tabValue == "Skip Meal" ? "white" : "secondary.600",
                style: { fontFamily: "Poppins-Medium", fontSize: 18 },
              }}
              bg={tabValue == "Skip Meal" ? "secondary.600" : "transparent"}
              w={"100%"}
              p={3}
              rounded="full"
            >
              Skip Meal
            </Center>
          </Pressable>
        </HStack>

        {/* Custom meal Tab */}

        <SwiperFlatList
          onMomentumScrollEnd={({ index }) => {
            if (index) {
              setTabValue("Skip Meal");
              setAlertVisible(true);
            } else {
              setTabValue("Custom");
            }
          }}
          ref={swiperRef}
        >
          <Box width={width} p={5}>
            <Box p={2} flex={1} rounded="lg">
              <Heading
                style={{ fontFamily: "Poppins-Medium" }}
                fontSize={"lg"}
                ml={-4}
              >
                {!isSearch
                  ? "Custom Meals"
                  : `Showing results for '${searchValue}'`}
              </Heading>
              {fakeCustomMeals ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Radio.Group
                    name="CustomMealsRadioGroup"
                    value={customMeal}
                    onChange={(e) => {
                      setCustomMeal(e);
                    }}
                  >
                    {fakeCustomMeals.map((item, index) => {
                      return (
                        <HStack
                          rounded={"lg"}
                          key={index}
                          bg={colors["secondary"]["30"]}
                          mt={1}
                          p="2"
                          w={"100%"}
                        >
                          <Radio
                            value={item}
                            borderColor={"secondary.500"}
                            colorScheme="secondary"
                          >
                            <VStack>
                              <Heading
                                color={colors["secondary"]["600"]}
                                style={{ fontFamily: "Poppins-Regular" }}
                                fontSize={"lg"}
                              >
                                Burger king
                              </Heading>
                              <Text fontSize="xs" color={"muted.500"}>
                                I forgot what you had here
                              </Text>
                            </VStack>
                          </Radio>
                        </HStack>
                      );
                    })}
                  </Radio.Group>
                </ScrollView>
              ) : (
                <Center bg="secondary.30" p="10" rounded={"full"} mt={20}>
                  <EmptyPlateIcon
                    width={250}
                    height={150}
                    background={colors["muted"]["200"]}
                    fill={colors["secondary"]["100"]}
                  />
                </Center>
              )}
            </Box>

            {/* Confirm chosen custom meal */}
            {customMeal && (
              <Button.Group
                justifyContent={"space-evenly"}
                my={5}
                mx={{
                  base: "auto",
                  md: 0,
                }}
              >
                <Button
                  w={"100px"}
                  colorScheme="primary"
                  onPress={() => {
                    alert("Done");
                  }}
                  rounded={"lg"}
                >
                  Done
                </Button>
                <Button
                  w={"100px"}
                  rounded={"lg"}
                  colorScheme="danger"
                  onPress={() => {
                    alert("Canceling");
                    setCustomMeal(null);
                  }}
                >
                  Cancel
                </Button>
              </Button.Group>
            )}
          </Box>
          <Box width={width} p={5}>
            <AlertComponent
              bg={"secondary.30"}
              setModalVisible={setAlertVisible}
              modalVisible={alertVisible}
              message={"Are you sure you want to skip this meal?"}
              action={[
                {
                  label: "Yes, Skip",
                  onPress: () => {
                    // backend code that handles skipping meal
                    toast.show({
                      placement: "top",
                      duration: 1000,
                      render: () => (
                        <ToastComponent
                          state={true ? "Success" : "Error"}
                          message={true ? "Meal skipped successfully" : "Error"}
                        />
                      ),
                      onCloseComplete: () => {
                        setAlertVisible(false);
                        navigation.navigate("Home");
                      },
                    });
                  },
                },
                {
                  label: "No",
                  onPress: () => {
                    setAlertVisible(false);
                    swiperRef.current.scrollToIndex({
                      index: 0,
                      animated: true,
                    });
                    setTabValue("Custom");
                  },
                },
              ]}
            />
          </Box>
        </SwiperFlatList>
      </ScrollView>
      {/* My FAB */}
      <Center
        shadow={"5"}
        position={"absolute"}
        bottom={3}
        right={3}
        w="50px"
        p={0}
        zIndex={10}
      >
        <Box alignItems="center">
          <Stagger
            visible={stagger}
            initial={{
              opacity: 0,
              scale: 0,
              translateY: 34,
            }}
            animate={{
              translateY: 0,
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                mass: 0.8,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
            exit={{
              translateY: 34,
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 100,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
          >
            {/* Still need to decide */}
            <IconButton
              onPress={() =>
                navigation.navigate("UploadPicture", { foodType: foodType })
              }
              mb="4"
              variant="solid"
              rounded="full"
              icon={
                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={24}
                  color={colors.white}
                />
              }
            />
            <IconButton
              onPress={() =>
                navigation.navigate("AddNewFood", { foodType: foodType })
              }
              mb="4"
              variant="solid"
              rounded="full"
              icon={<AddFoodIcon />}
            />
            <IconButton
              onPress={() =>
                navigation.navigate("UploadPicture", { foodType: foodType })
              }
              mb="4"
              variant="solid"
              rounded="full"
              icon={
                <MaterialCommunityIcons
                  size={24}
                  name="camera"
                  color={colors["white"]}
                />
              }
            />
          </Stagger>
        </Box>
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotateFab.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "135deg"],
                }),
              },
            ],
          }}
        >
          <IconButton
            w="50px"
            variant="solid"
            rounded="full"
            size="lg"
            onPress={() => {
              setStagger(!stagger);
            }}
            icon={<AntDesign name="plus" size={24} color={colors["white"]} />}
          />
        </Animated.View>
      </Center>
      {/* </ScrollView> */}
    </>
  );
}

export default RecordFood;
