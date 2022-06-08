import { StatusBar } from "expo-status-bar";


import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//importing pages
import Welcome from "./Pages/auth/welcome";
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";
import ForgotPassword from "./Pages/auth/forgotPassword";
import Home from "./Pages/home/home";

//custom hooks import


export default function App() {
  //route settings
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
