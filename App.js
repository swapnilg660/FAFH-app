import "react-native-gesture-handler";
//please make sure not add any import on line 1 of file
import { StatusBar } from "expo-status-bar";
import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as SecureStore from "expo-secure-store";

import AuthContext from "./hooks/context";
import { reducer, signIn, signOut } from "./services/auth";
import { NativeBaseProvider } from "native-base";
import AuthStack from "./routes/AuthStack";
import AppStack from "./routes/AppStack";


export default function App() {
  // user authentication
  const [userData, dispatch] = useReducer(reducer, {
    isLoading: true,
    isSignedOut: false,
    userToken: null,
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
    }),
    []
  );
  const restoreSavedUser = async () => {
    let userToken;
    console.log("userToken currently:", userToken);
    try {
      userToken = await SecureStore.getItemAsync("userToken");
      console.log("userToken after:", userToken);
    } catch (e) {
      // Restoring token failed
      console.log(e);
    }

    // After restoring token, we may need to validate it in production apps

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log("this point token:", userToken);
    dispatch({ type: "RESTORE_TOKEN", token: userToken });
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate screen
    restoreSavedUser();
  }, []);

  return (
    <NativeBaseProvider>
      <AuthContext.Provider value={contextData}>
        <NavigationContainer>
          {console.log("userData:", userData)}
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




