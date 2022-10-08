import axios from "axios";
import * as SecureStore from "expo-secure-store";
// Our database url <-- currently using localhost
const dbUrl = "https://glacial-refuge-38575.herokuapp.com";

export const recordCustomeMeal = async (data, occasion) => {
  console.log("saving to database");
  let token = await SecureStore.getItemAsync("userToken");
  var formdata = new FormData();
  formdata.append("userId", token);
  formdata.append("type", occasion);
  formdata.append("mealName", data.name);
  formdata.append("mealNutrition", JSON.stringify(data.nutritionalInfo));

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${dbUrl}/storeCustomeMeal`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const recordFood = async (occasion, mealArray, isFAFH, cost) => {
  let token = await SecureStore.getItemAsync("userToken");
  var formdata = new FormData();
  console.log(`{
    userId: ${token},
    mealList: ${JSON.stringify(mealArray)},
    mealCost: ${cost},
    occasion: ${occasion},
  }`);
  formdata.append("userId", token);
  formdata.append("mealList", JSON.stringify(mealArray));
  formdata.append("mealCost", cost);
  formdata.append("isFAFH", JSON.stringify(isFAFH));
  formdata.append("occasion", occasion);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${dbUrl}/storeMealsRecord`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error: ", error));
};

export const getCustomMeals = (setCustomMeals) => {
  let token = SecureStore.getItemAsync("userToken");
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  fetch(`${dbUrl}/getCustomeMeals?userId=${token}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("custom meals found:", result);
      setCustomMeals(result);
    })
    .catch((error) => console.log("custom meal", error));
};
