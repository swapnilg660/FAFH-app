import "react-native-gesture-handler";
//please make sure not add any import on line 1 of file
import { StatusBar } from "expo-status-bar";
import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useMemo,
} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SecureStore from "expo-secure-store";

//importing pages
import Welcome from "./Pages/auth/welcome";
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";
import ForgotPassword from "./Pages/auth/forgotPassword";
import Home from "./Pages/home/home";
import Profile from "./Pages/home/profile";

//importing utilities
import colors from "./assets/colors/colors";
import AuthContext from "./hooks/context";
import { reducer, signIn } from "./services/auth";

//route settings
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
      signOut: () => {
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        const token = await signUp(data);
        dispatch({ type: "SIGN_UP", token: token });
      },
    }),
    []
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const restoreSavedUser = async () => {
      let userToken;
      // await SecureStore.deleteItemAsync("userToken");
      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
        console.log(e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      console.log("token:", userToken);
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    restoreSavedUser();
  }, []);

  return (
    <AuthContext.Provider value={contextData}>
      <NavigationContainer>
        {userData.userToken == null ? (
          //if user is not logged in, show auth screens

          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: colors.primary },
              headerTitleStyle: {
                color: colors.textLight,
              },
              headerTintColor: colors.textLight,
              headerTransparent: true,
            }}
          >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen
              name="Login"
              options={{
                headerTitle: "",
                headerStyle: { backgroundColor: "transparent" },
                headerTintColor: colors.primary,
              }}
              component={Login}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </Stack.Navigator>
        ) : (
          //if user is logged in, show home screen
          <Drawer.Navigator initialRouteName="Home" >
            <Drawer.Screen name="Home" component={HomeStackScreen} />
            <Drawer.Screen
              name="Profile"
              component={ProfileStackScreen}
            />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

//creating stack components
const HomeStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="HomeStack" component={Home} />
    </Stack.Navigator>
  );
};
const ProfileStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="ProfileStack" component={Profile} />
    </Stack.Navigator>
  );
};
