import * as SplashScreen from "expo-splash-screen";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect, useCallback } from "react";
import useFonts from "../../hooks/useFonts";

function Welcome({ navigation }) {
  //loading fonts
  const [appIsReady, setAppIsReady] = useState(false);

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
        setAppIsReady(true);
      }
    }
    prepare();

    //...more code
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View
      onLayout={onLayoutRootView}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    ><Pressable

      onPress={() => {
        console.log("Going to login page");
        navigation.navigate("Login");
      }}
    >
        <Text style={styles.buttons}>Login</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          console.log("Going to register page");
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.buttons}>Register</Text>
      </Pressable>
    </View>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    fontSize: 30,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  }

});