import { ScrollView, Text } from "native-base";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Home from "../Pages/app/Home/home";
import HomeStack from "../Pages/app/Home/homeStack";
import InsightsStack from "../Pages/app/Insight/insightStack";
import Profile from "../Pages/app/Profile_/profile"; //route settings
import TabBarComponent from "../Components/TabBarComponent";
const Tab = createBottomTabNavigator();

function AppStack() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBarComponent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="InsightsStack"
        component={InsightsStack}
        options={{ title: "Insights" }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default AppStack;
