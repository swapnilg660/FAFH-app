import axios from "axios";
// Our database url <-- currently using localhost
const dbUrl = "https://glacial-refuge-38575.herokuapp.com";

export const storeCustomMeals = async (userId) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    mealName: "yelllow chicken",
    userId: "kshfkdjsh",
    mealNutrition: {
      energy: 23.45,
      protein: 34.5,
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `${dbUrl}/storeCustomeMeal`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};


