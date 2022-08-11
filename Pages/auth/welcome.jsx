import * as SplashScreen from "expo-splash-screen";
import { Image, useWindowDimensions, Animated } from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import useFonts from "../../hooks/useFonts";
import { Button, Center, Text, useTheme, VStack } from "native-base";
import { FAFH_logo } from "../../Components/customSvgIcon";

function Welcome({ navigation }) {
  const { colors } = useTheme();
  const { height } = useWindowDimensions();
  const slideIn = useRef(new Animated.Value(-height)).current;
  const slideInEffect = () => {
    Animated.timing(slideIn, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  //loading fonts
  // const [appIsReady, setAppIsReady] = useState(false);
  const appIsReady = useRef(false);

  // animation for image to slide down

  useEffect(() => {
    //splash screen
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await useFonts();
        console.log("fonts loaded");
      } catch (e) {
        console.warn(e);
      } finally {
        // setAppIsReady(true);
        appIsReady.current = true;
        SplashScreen.hideAsync();
      }
    }
    prepare();
    slideInEffect();

    //...more code
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady.current) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <VStack
      position={"relative"}
      flex={1}
      // justifyContent="center"
      // alignItems="center"
      onLayout={onLayoutRootView}
    >
      <Animated.Image
        style={{ transform: [{ translateY: slideIn }] }}
        source={require("../../assets/images/HomeImage.png")}
      />

      <Animated.View
        style={{
          transform: [
            {
              translateY: slideIn.interpolate({
                inputRange: [-height, 0],
                outputRange: [height, 0],
              }),
            },
          ],
        }}
      >
        <Center mt={-height / 7}>
          <FAFH_logo fill={colors.secondary["500"]} width={110} height={110} />
        </Center>
        <Center>
          <Text
            fontSize="32"
            // pt={7}
            style={{ fontFamily: "Poppins-SemiBold" }}
            color="primary.600"
          >
            FAFH
          </Text>
          <Text
            color={"primary.600"}
            px="20"
            textAlign="center"
            style={{ fontFamily: "Poppins-Light" }}
          >
            Tracking food and beverages you consume away from home
          </Text>
        </Center>
        <Center p={5}>
          <Button
            w={"50%"}
            colorScheme="secondary"
            onPress={() => {
              navigation.navigate("Onboarding");
            }}
          >
            Get Started
          </Button>
        </Center>
      </Animated.View>
    </VStack>
  );
}

export default React.memo(Welcome);
