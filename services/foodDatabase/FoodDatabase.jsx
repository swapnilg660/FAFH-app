import mime from "mime";

// Edamam api query details: https://developer.edamam.com/edamam-docs-recipe-api
const apiId = "0ecfa796";
const apiKey = "%206f49fee3718084681eaf706314748108";

// get suggestions from Edamam api while typing in the search bar
export const getSuggestions = (word, setSuggestions) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.edamam.com/auto-complete?app_id=${apiId}&app_key=${apiKey}&q=${word}&limit=${5}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      setSuggestions(result.slice(0, 5));
    })
    .catch((error) => console.log("error", error));
};

// get more forrd from Edamam api based on the search query
export const getFood = (word, setFood) => {
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
      let hints = result.hints;
      let food = [];
      hints.map((hint) => {
        let store = {};
        store["id"] = hint.food.foodId;
        store["label"] = hint.food.label.split(",")[0];
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

  fetch(
    `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${apiId}&app_key=${apiKey}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => setNutrition(result.totalNutrients))
    .catch((error) => console.log("error", error));
};

// recognise the food from the image
export const recogniseFood = async (image, setFood) => {
  const url = "http://www.dbaretna.com/api/base64/img";
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      img: image,
    }),
  })
    .then((data) => console.log("successfully sent", data))
    .catch((error) => {
      console.warn(error);
    });
};
