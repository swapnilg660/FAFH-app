import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Insights from "./insights"
const Stack = createStackNavigator();

function InsightsStack({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Insights" component={Insights} />
    </Stack.Navigator>
  );
}

export default InsightsStack;
