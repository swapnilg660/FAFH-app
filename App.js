import "react-native-gesture-handler";
//please make sure not add any import on line 1 of file
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useReducer, useMemo, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Toast from '@rimiti/react-native-toastify';

import * as SecureStore from "expo-secure-store";
import "./firebase/firebaseConfig";

import AuthContext from "./hooks/context";
import { reducer, signIn, signOut, signUp } from "./services/auth";
import { NativeBaseProvider } from "native-base";
import FAFHTHEME from "./assets/theme/extTheme";
import AuthStack from "./routes/AuthStack";
import AppStack from "./routes/AppStack";
import useFonts from "./hooks/useFonts";

// Counter push notification
import BackgroundFetch from "react-native-background-fetch";
import Notification from "./Components/pushNotification/generateToken";
import initBackgroundFetch from "./Components/pushNotification/backgroundActivity";
import StartBackgroundActivities from "./Components/pushNotification/backgroundActivity";

export default function App() {
  //Load fonts
  const fontsLoaded = useFonts();
  if (!fontsLoaded) {
    return null;
  }

  // steps counter
  const [steps, setSteps] = useState(0);
  // Push notification variables
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  // user authentication
  const [userData, dispatch] = useReducer(reducer, {
    isLoading: true,
    isSignedOut: false,
    userToken: null,
    // ...
  });
  const contextData = useMemo(
    () => ({
      signIn: async (data) => {
        let token = "";
        await signIn(data).then((res) => {
          token = res;
        });
        if (token?.includes("Error")) {
          return token;
        } else {
          dispatch({ type: "SIGN_IN", token });
          return "Success";
        }
      },
      signOut: async () => {
        const token = await signOut();
        dispatch({ type: "SIGN_OUT", token: token });
      },
      signUp: async (data) => {
        let token = "";
        await signUp(data).then((res) => {
          token = res;
        });
        if (token?.includes("Error")) {
          return token;
        } else {
          dispatch({ type: "SIGN_UP", token });
          return "Success";
        }
      },
      googleSignIn: async () => {
        const token = await googleSignIn();
        dispatch({ type: "GOOGLE_SIGN_IN", token: token });
      },
      steps,
      setSteps,
    }),
    []
  );
  const restoreSavedUser = async () => {
    let userToken;
    try {
      userToken = await SecureStore.getItemAsync("userToken");
    } catch (e) {
      // Restoring token failed
      console.log(e);
    }

    // After restoring token, we may need to validate it in production apps

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    dispatch({ type: "RESTORE_TOKEN", token: userToken });
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate screen
    restoreSavedUser();
    // push a notification to the user
    Notification(
      steps,
      expoPushToken,
      notification,
      setNotification,
      setExpoPushToken,
      notificationListener,
      responseListener
    );
    // Background fetch setup (recommend extracting into separate file)
    // StartBackgroundActivities();
    //fix memory leak
    return () => {
      //
    };
  }, []);

  return (
    <NativeBaseProvider theme={FAFHTHEME}>
      <AuthContext.Provider value={contextData}>
        <NavigationContainer>
          {userData.userToken == null ? <AuthStack /> : <AppStack />}
        </NavigationContainer>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
