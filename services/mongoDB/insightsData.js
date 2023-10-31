import * as SecureStore from "expo-secure-store";
// Our database url <-- currently using localhost
import { BASE_URL } from "../../config";

// This function is made to work with home page and insights page, please specify the route you calling it from.
export const getDailyInsights = async (setDailyInsights, route = "home") => {
  let token = await SecureStore.getItemAsync("userToken");
  var formdata = new FormData();

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  console.log("token", token);

  fetch(`${BASE_URL}/getDailyNutrients?userId=${token}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("Daily nutrients data: " + JSON.stringify(result));
      if (route == "home") {
        var data = [];
        var d = result.data.dailyNutrients;
        data.push(d["Protein"] ? d["Protein"] : 0);
        data.push(d["Carbohydrate, by difference"] ? d["Carbohydrate, by difference"] : 0);
        data.push(d["Total lipid (fat)"] ? d["Total lipid (fat)"] : 0);
        data.push(result.data.dailyCalories ? result.data.dailyCalories : 0);
        setDailyInsights((prev) => {
          return { ...prev, data: data };
        });
      } else {
        setDailyInsights(result.data);
      }

      // setDailyInsights(result);
    })
    .catch((error) => console.log("Error Getting daily nutrients", error));
};

export const getTopRestaurants = async (setTopRestaurants) => {
  let token = await SecureStore.getItemAsync("userToken");
  var formdata = new FormData();

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  // console.log(`${BASE_URL}/getTopRestaurants?userId=${token}`)

  fetch(`https://glacial-refuge-38575.herokuapp.com/getTopRestaurants?userId=${token}`, requestOptions)
    .then((response) => response.json())
    .then((result) => setTopRestaurants(result.data))
    .catch((error) => console.log("error getting restaurants: ", error));
};
