const apiId = "0ecfa796";
const apiKey = "%206f49fee3718084681eaf706314748108";

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
