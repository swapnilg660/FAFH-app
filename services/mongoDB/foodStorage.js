import axios from "axios";
import * as SecureStore from "expo-secure-store";
// Our database url <-- currently using localhost
const dbUrl = "https://glacial-refuge-38575.herokuapp.com";



export const recordCustomeMeal = async (data) => {};

export const recordFood = async (mealId, mealName, mealNutrition) => {
  let token = await SecureStore.getItemAsync("userToken");
  var formdata = new FormData();
  formdata.append("userId", token);
  formdata.append("mealId", mealId);
  formdata.append("mealName", mealName);
  formdata.append("mealNutrition", mealNutrition);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch("glacial-refuge-38575.herokuapp.com/storeMealsRecord", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
