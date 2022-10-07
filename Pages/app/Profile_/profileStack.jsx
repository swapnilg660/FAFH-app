import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./profile";
import EditProfile from "./editProfile";

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
      </Stack.Navigator>
    </ProfileContext.Provider>
  );
}

export default ProfileStack;
