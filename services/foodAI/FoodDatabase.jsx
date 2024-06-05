import mime from "mime";
import { Platform } from "react-native";

// Edamam api query details: https://developer.edamam.com/edamam-docs-recipe-api
const apiId = "0ecfa796";
const apiKey = "6f49fee3718084681eaf706314748108";

// heroku hosting link
const dbUrl = "https://glacial-refuge-38575.herokuapp.com";

// const logmeal userToken <-- will be auto generated when user logs in

// 5619	APIUser_Suprise	6be478499e6b7bcc7fd7b994948a1fd9be779e9e
const userToken = "02513d9f9dbbd1d069c409c01c562a5ab60ffcaa";

// get suggestions from Edamam api while typing in the search bar
export const getSuggestions = (word, setSuggestions) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`https://api.edamam.com/auto-complete?app_id=${apiId}&app_key=${apiKey}&q=${word}&limit=${5}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("suggeestion: ", result);
      setSuggestions(result.slice(0, 5));
    })
    .catch((error) => console.log("error", error));
};

// get more food from Edamam api based on the search query
export const getFood = (word, setFood) => {
  console.log("getFood() called");
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Cookie", "route=1ec7638396cb58f649ca30dda440f445");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.edamam.com/api/food-database/v2/parser?app_id=${apiId}&app_key=${apiKey}&ingr=${word}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // console.log("FOOD DATABASE:", result);
      let hints = result.hints;
      let food = [];
      hints.map((hint) => {
        let store = {};
        store["id"] = hint.food.foodId;
        store["label"] = hint.food.label;
        store["image"] = hint.food.image;
        store["energy"] = hint.food.nutrients.ENERC_KCAL + " kcal";
        store["protein"] = hint.food.nutrients.PROCNT + " g";
        store["fat"] = hint.food.nutrients.FAT + " g";
        store["measureUri"] = hint.measures[0].label;

        food.push(store);
      });
      setFood(food);
    })
    .catch((error) => console.log("search error", error));
};

export const getBarcodeFood = (barcode, setFood) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Cookie", "route=1ec7638396cb58f649ca30dda440f445");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.edamam.com/api/food-database/v2/parser?app_id=${apiId}&app_key=${apiKey}&upc=${barcode}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => setFood(result))
    .catch((error) => console.log("error", error));
};

// get food nutritrition for the selected meal
export const getNutrition = (params, setNutrition) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Cookie", "route=1ec7638396cb58f649ca30dda440f445");

  var raw = JSON.stringify(params);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`https://api.edamam.com/api/food-database/v2/nutrients?app_id=${apiId}&app_key=${apiKey}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("NUTRITION:", result);
      setNutrition(result.totalNutrients);
    })
    .catch((error) => console.log("error", error));
};

// recognise the food from the image
export const recogniseFood = async (image, setFood, setError) => {
  // get current platform
  console.log("recogniseFood() called");
  const platform = Platform.OS;
  // <-- pass another parameter for user token
  var formdata = new FormData();
  formdata.append("pic", {
    // originagl data to pass
    uri: image.uri,
    name: image.uri.split("/").pop(),
    type: platform === "android" ? mime.getType(image.uri) : "jpeg",
    // customize data for FAFH backend
    filepath: image.uri,
    originalFilename: image.uri.split("/").pop(),
  });
  formdata.append("userToken", userToken);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${dbUrl}/recogniseImage`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("[RecogniseFood(res):]", result);
      setFood(result.recognition_results);
      result.success === false ? setError({ recError: result.message }) : console.log("No error");
    })
    .catch((error) => {
      console.log("[FoodDatabase.jsx] recogniseFoodError:", error);
      setError({ recError: "Error in recognizing food!" });
    });
};
