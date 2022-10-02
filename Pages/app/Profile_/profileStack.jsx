import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./profile";
import EditProfile from "./editProfile";


const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile_" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
