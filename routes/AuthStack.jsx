import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../assets/colors/colors";
import Welcome from "../Pages/auth/welcome";
import Login from "../Pages/auth/login";
import Register from "../Pages/auth/register";
import ForgotPassword from "../Pages/auth/forgotPassword";

const Stack = createNativeStackNavigator();
function AuthStack() {
  useEffect(() => {
    //fix memory leak
    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
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
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

export default AuthStack;
