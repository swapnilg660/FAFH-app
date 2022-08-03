import { ScrollView, Text } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Home from "../Pages/app/Home/home";
import HomeStack from "../Pages/app/Home/homeStack";
import Profile from "../Pages/app/Profile/profile";
import Insights from "../Pages/app/Insight/insights"; //route settings
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
      <Tab.Screen name="Insights" component={Insights} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default AppStack;
