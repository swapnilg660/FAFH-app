import { createStackNavigator } from "@react-navigation/stack";
import Home from "./home";
import RecordFood from "./RecordFood";
import React from "react";
import AdditionalInformation from "./AdditionalInformation";
import UploadPicture from "./Camera";
import AddNewFood from "./AddNewFood";
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="AdditionalInformationModal"
        component={AdditionalInformation}
      />
      <Stack.Screen name="RecordFood" component={RecordFood} />
      <Stack.Screen name="UploadPicture" component={UploadPicture} />
      <Stack.Screen name="AddNewFood" component={AddNewFood} />
    </Stack.Navigator>
  );
}

export default HomeStack;
