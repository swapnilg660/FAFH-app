import axios from "axios";
import * as SecureStore from "expo-secure-store";
// Our database url <-- currently using localhost
const dbUrl = "https://glacial-refuge-38575.herokuapp.com";

export const recordCustomeMeal = async (data) => {};

export const recordFood = async (occasion, mealId, mealArray, cost) => {
  let token = await SecureStore.getItemAsync("userToken");
  var formdata = new FormData();

  formdata.append("userId", token);
  formdata.append("type", occasion);
  formdata.append("mealId", mealId);
  formdata.append("mealList", JSON.stringify(mealArray));
  formdata.append("mealCost", cost);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${dbUrl}/storeMealsRecord`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error : ", error));
};
