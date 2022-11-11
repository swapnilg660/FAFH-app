import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./profile";
import EditProfile from "./editProfile";
import ReportBug from "./reportBug";

const Stack = createStackNavigator();

export const ProfileContext = React.createContext();

function ProfileStack() {
  const [profilePicture, setProfilePicture] = React.useState(null);
  return (
    <ProfileContext.Provider
      value={{
        profilePicture,
        setProfilePicture,
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Profile_" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ReportBug" component={ReportBug} />
      </Stack.Navigator>
    </ProfileContext.Provider>
  );
}

export default ProfileStack;
