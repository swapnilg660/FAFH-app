// Store recipes in MongoDB
const saveRecipe = (recipe) => {
  var formdata = new FormData();
  formdata.append("userId", "sgfgdfgdfg");
  formdata.append("userName", "Suprise Ngoveni");
  formdata.append("name", "Pancakes");
  formdata.append("calories", "24");
  formdata.append("totalTime", "40");
  formdata.append("prepTime", "23");
  formdata.append("description", "This is a really delicious bread");
  formdata.append("ingredients", '["1/2 milk", "2 cpus of flower"]');
  formdata.append("servings", "0");
  formdata.append(
    "directions",
    '[{"title":"break eggs","description":"break eggs and stir well"}, {"title":"mix well","description":"mix eggs with milk and flavour"}]'
  );
  formdata.append("type", "breakfast");
  formdata.append("category", "protein");
  formdata.append(
    "picture",
    fileInput.files[0],
    "/C:/Users/Dr Tadaa/Downloads/star-wars-spaceship-zoom-background-copbqhzqdbha7i0z-copbqhzqdbha7i0z.jpg"
  );

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch("http://localhost:5000/saveRecipe", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

// Get recipes from MongoDB
const getRecipes = () => {
  var formdata = new FormData();

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch("http://localhost:5000/getRecipes", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

// Get recipe image from MongoDB
const getRecipeImage = (recipeId) => {
  var formdata = new FormData();

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(
    `http://localhost:5000/getRecipeImage?recipeId=${recipeId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
