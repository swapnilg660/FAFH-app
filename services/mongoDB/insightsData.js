import * as SecureStore from "expo-secure-store";
// Our database url <-- currently using localhost
const dbUrl = "https://glacial-refuge-38575.herokuapp.com";

export const getDailyInsights = async (setDailyInsights) => {
  let token = await SecureStore.getItemAsync("userToken");
  var formdata = new FormData();

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${dbUrl}/getDailyNutrients?userId=${token}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("result: ", result);
      setDailyInsights(result);
    })
    .catch((error) => console.log("error", error));
};

export const getTopRestaurants = async (setTopRestaurants) => {
  let token = await SecureStore.getItemAsync("userToken");
  var formdata = new FormData();

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  console.log(`${dbUrl}/getTopRestaurants?userId=${token}`)

  fetch(`https://glacial-refuge-38575.herokuapp.com/getTopRestaurants?userId=tadaa`, requestOptions)
    .then((response) => response.json())
    .then((result) => setTopRestaurants(result.data))
    .catch((error) => console.log("error getting restaurants: ", error));
};
