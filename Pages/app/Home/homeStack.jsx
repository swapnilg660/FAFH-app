import { createStackNavigator } from "@react-navigation/stack";
import Home from "./home";
import RecordFood from "./RecordFood";
import React from "react";
import AdditionalInformation from "./AdditionalInformation";
import UploadPicture from "./Camera";
import AddNewFood from "./AddNewFood";
import ConfirmMeal from "./ConfirmMeal";
import CapturedMeals from "./CapturedMeals";
import { HomeContext } from "../../../hooks/context";
import RecipesInfo from "./recipesInfo";
const Stack = createStackNavigator();

function HomeStack() {
  const [meals, setMeals] = React.useState([]);
  const [foundFood, setFoundFood] = React.useState([]);
  const [homeError, setError] = React.useState({});
  return (
    <HomeContext.Provider
      value={{ meals, setMeals, foundFood, setFoundFood, homeError, setError }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="AdditionalInformationModal"
          component={AdditionalInformation}
        />
        <Stack.Screen name="RecordFood" component={RecordFood} />
        <Stack.Screen name="UploadPicture" component={UploadPicture} />
        <Stack.Screen name="AddNewFood" component={AddNewFood} />
        <Stack.Screen name="ConfirmMeal" component={ConfirmMeal} />
        <Stack.Screen name="CapturedMeal" component={CapturedMeals} />

        <Stack.Screen name="Recipes" component={RecipesInfo} />
      </Stack.Navigator>
    </HomeContext.Provider>
  );
}

export default HomeStack;
