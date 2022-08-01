import { createStackNavigator } from "@react-navigation/stack";
import Home from "./home";
import React from "react";
import AdditionalInformation from "./AdditionalInformation";
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="AdditionalInformationModal"
        component={AdditionalInformation}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
