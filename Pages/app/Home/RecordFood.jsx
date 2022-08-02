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
import { Animated, useWindowDimensions } from "react-native";
import { AddFoodIcon, EmptyPlateIcon } from "../../../Components/customSvgIcon";
import { SwiperFlatList } from "react-native-swiper-flatlist";
function RecordFood({ navigation, route }) {
  // Fake data, we need a GET request to get this data
  const fakeCustomMeals = [9, 98, 76];

  const { foodType } = route.params;
  const [tabValue, setTabValue] = useState("Custom");
  const [stagger, setStagger] = useState(false);
  const { height, width } = useWindowDimensions();
  const rotateFab = useRef(new Animated.Value(0)).current;

  const swiperRef = useRef();

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
          borderColor={colors["primary"]["30"]}
          bg={colors["primary"]["30"]}
          m={5}
          mt={0}
          rounded="2xl"
          placeholder="Search food/restaurant"
          style={{ fontFamily: "Poppins-Regular" }}
          fontSize={16}
          leftElement={
            <Octicons
              style={{ paddingLeft: 10 }}
              name="search"
              size={24}
              color={colors["black"]}
            />
          }
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
                Custom Meals
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
                    {fakeCustomMeals.map((item) => {
                      return (
                        <HStack
                          rounded={"lg"}
                          key={item}
                          bg={colors["secondary"]["30"]}
                          mt={1}
                          p="2"
                          w={"100%"}
                        >
                          <Radio value={item}>
                            <VStack>
                              <Heading
                                color={colors["secondary"]["600"]}
                                style={{ fontFamily: "Poppins-Regular" }}
                                fontSize={"lg"}
                              >
                                Big Bacon King Steer
                              </Heading>
                              <Text fontSize="xs" color={"muted.500"}>
                                839 kcal, Big Bacon King Steer(Steers)
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
                    console.log(customMeal);
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
                    console.log("Canceling");
                    setCustomMeal(null);
                  }}
                >
                  Cancel
                </Button>
              </Button.Group>
            )}
          </Box>
          <Box width={width} p={5}>
            <Box mx={10} bg="primary.400" p="12" rounded="lg">
              {/* Skip meal tab */}
              Box
            </Box>
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
            <IconButton
              mb="4"
              variant="solid"
              rounded="full"
              icon={<AddFoodIcon />}
            />
            <IconButton
              onPress={() => navigation.navigate("UploadPicture")}
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
