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
import { Button, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
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
import { reducer, signIn, signOut } from "./services/auth";
import areYouSure from "./services/alert";

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

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
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

    restoreSavedUser();
  }, []);

  return (
    <AuthContext.Provider value={contextData}>
      <NavigationContainer>
        {console.log("userData:", userData)}
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
          <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
            drawerContent={CustomDrawerContent}
          >
            <Drawer.Screen
              name="HomeStack"
              options={{ headerTitle: "Home" }}
              component={HomeStackScreen}
            />
            <Drawer.Screen
              name="ProfileStack"
              options={{ headerTitle: "Profile" }}
              component={ProfileStackScreen}
            />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

//creating stack components
const HomeStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <Icon
            onPress={async () => {
              await navigation.toggleDrawer();
            }}
            name="md-menu"
            size={30}
          />
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
const ProfileStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <Icon
            onPress={async () => {
              await navigation.toggleDrawer();
            }}
            name="md-menu"
            size={30}
          />
        ),
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

// dummy component to mimic home stack navigation
function HomeScreen({ navigation }) {
  const [count, setCount] = React.useState(0);

  useEffect(() => {}, [navigation]);

  return <Text>Count: {count}</Text>;
}

function CustomDrawerContent(props) {
  const { signOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.DrawerContainer}
      // {...props}
    >
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        label="Settings"
        onPress={() => alert("Settings")}
        style={{ marginTop: 20 }}
        icon={() => (
          <Icon name="md-settings" size={30} color={colors.primary} />
        )}
      />
      <DrawerItem
        label="Log Out"
        onPress={async () => {
          const choice = await areYouSure({
            Title: "Log Out",
            Message: "Are you sure you want to log out?",
          });
          if (choice) signOut();
        }}
        style={{ bottom: 0, position: "absolute", left: 0, right: 0 }}
        icon={() => <Icon name="md-log-out" size={30} color={colors.primary} />}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  DrawerContainer: {
    flex: 1,
    position: "relative",
    // justifyContent: "space-between",
  },
});
