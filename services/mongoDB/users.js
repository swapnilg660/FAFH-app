import * as SecureStore from "expo-secure-store";

// mangoDB backend code url
const dbUrl = "https://glacial-refuge-38575.herokuapp.com";

// current logged user token
let token = SecureStore.getItemAsync("userToken");

// create new user using firebase token
export const mongoCreateUser = async (data) => {
  let userToken = await SecureStore.getItemAsync("userToken");
  var formdata = new FormData();
  formdata.append("userToken", userToken);
  formdata.append("fullName", data.name);
  formdata.append("email", data.email);
  formdata.append("phoneNumber", data.cell);
  formdata.append("dateOfBirth", data.doB);
  formdata.append("weight", data.weight);
  formdata.append("heightUnit", data.height);
  formdata.append("weightUnit", data.weightUnit);
  formdata.append("height", data.height);
  formdata.append("gender", data.gender);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${dbUrl}/createUser`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log("user successfully created:", result))
    .catch((error) => console.log("error creating user:", error));
};

// update user information
export const updateUser = (userId, fields) => {
  let userToken = SecureStore.getItemAsync("userToken");
  var formdata = new FormData();
  Object.keys(fields).map((item) => {
    formdata.append(item, fields[item]);
  });

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${dbUrl}/updateUser?userToken=${token}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

// Get user data when logged in
export const getUser = async () => {
  let token = await SecureStore.getItemAsync("userToken");
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  let userData;

  await fetch(`${dbUrl}/getUser?userToken=${token}`, requestOptions)
    .then((response) => response.json())
    .then((result) => (userData = result))
    .catch((error) => console.log("error", error));

  return userData;
};
