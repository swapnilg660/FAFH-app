import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Insights from "./insights";
const Stack = createStackNavigator();
export const InsightContext = React.createContext();

function InsightsStack({ navigation }) {
  const [filterList, setFilterList] = React.useState(["All"]);

  return (
    <InsightContext.Provider
      value={{
        filterList,
        setFilterList,
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Insights" component={Insights} />
      </Stack.Navigator>
    </InsightContext.Provider>
  );
}

export default InsightsStack;
