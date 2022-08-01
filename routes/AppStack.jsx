import { ScrollView, Text } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Home from "../Pages/app/Home/home";
import HomeStack from "../Pages/app/Home/homeStack";
import Profile from "../Pages/app/Profile/profile";
import Insights from "../Pages/app/Insight/insights";//route settings
const Tab = createBottomTabNavigator();

function AppStack() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="Insights" component={Insights} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default AppStack;
