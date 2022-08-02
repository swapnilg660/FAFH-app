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
  useTheme,
  View,
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
import { AddFoodIcon } from "../../../Components/customSvgIcon";
function RecordFood({ navigation, route }) {
  const { foodType } = route.params;
  const [tabValue, setTabValue] = useState("Custom");
  const [stagger, setStagger] = useState(false);
  const { height, width } = useWindowDimensions();
  const rotateFab = useRef(new Animated.Value(0)).current;

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

  useEffect(()=>{
    if (stagger) {
        rotateFabForward();
      } else {
        rotateFabBackward();
      }
  },[stagger])
  return (
    <>
      <SafeAreaView></SafeAreaView>
      <View flex={1} h={height}>
        <HStack space="3" alignItems="center" my={10} mx={5}>
          <Center bg="primary.600" p="2" pl={2.5} rounded="full">
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={colors["white"]}
            />
          </Center>
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
        <HStack bg="secondary.30" m={3} rounded="full" flexWrap={"nowrap"}>
          <Pressable
            w={"50%"}
            onPress={() => {
              setTabValue("Custom");
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

        <Center position={"absolute"} bottom={3} right={3} w="50px" p={0}>
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
      </View>
      {/* </ScrollView> */}
    </>
  );
}

export default RecordFood;
