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
import { reducer, signIn, signOut } from "./services/auth";
import { NativeBaseProvider } from "native-base";
import FAFHTHEME from "./assets/theme/extTheme";
import AuthStack from "./routes/AuthStack";
import AppStack from "./routes/AppStack";

export default function App() {
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
        const token = await signIn(data);
        dispatch({ type: "SIGN_IN", token: token });
      },
      signOut: async () => {
        const token = await signOut();
        dispatch({ type: "SIGN_OUT", token: token });
      },
      signUp: async (data) => {
        const token = await signUp(data);
        dispatch({ type: "SIGN_UP", token: token });
      },
      googleSignIn: async () => {
        const token = await googleSignIn();
        dispatch({ type: "GOOGLE_SIGN_IN", token: token });
      },
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
  }, []);

  return (
    <NativeBaseProvider theme={FAFHTHEME}>
      <AuthContext.Provider value={contextData}>
        <NavigationContainer>
          {/* <Toast ref={tosty} /> */}
          {userData.userToken == null ? (
            //if user is not logged in, show auth screens
            <AuthStack />
          ) : (
            //if user is logged in, show home screen
            <AppStack />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
