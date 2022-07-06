import { ScrollView, Text } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Pages/home/home";
import Profile from "../Pages/home/profile";
//route settings
const Tab = createBottomTabNavigator();

function AppStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default AppStack;
