import * as SecureStore from "expo-secure-store";
import mime from "mime";
import { Platform } from "react-native";
// mangoDB backend code url
const dbUrl = "https://glacial-refuge-38575.herokuapp.com";
const platform = Platform.OS;
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
export const getUser = async (setUserProfileData, email) => {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  let token = await SecureStore.getItemAsync("userToken");
  // console.log("email:", email,"SetUserProfileData:", setUserProfileData);

  await fetch(`${dbUrl}/getUser?userToken=${token}`, requestOptions)
    .then((response) => response.json())
    .then((result) => setUserProfileData(result.data))
    .catch((error) => console.log("error", error));
};

//please pass the current water value as glass
export const drinkWater = async (glass) => {
  let token = await SecureStore.getItemAsync("userToken");
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  fetch(`${dbUrl}/drinkWater?userToken=${token}&glass=${glass}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const getWater = async (setWater, water) => {
  let token = await SecureStore.getItemAsync("userToken");
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  fetch(`${dbUrl}/getWater?userToken=${token}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        setWater({
          ...water,
          current: result.data.water,
        });
      } else {
        setWater({
          ...water,
          current: 0,
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      setWater({
        ...water,
        current: 0,
      });
    });
};

// pass the image data you get from image picker, exif must be set to true on the image picker
export const uploadAvatar = async (image) => {
  console.log("[UPLOADING URI]:", image);
  var formdata = new FormData();
  var token = await SecureStore.getItemAsync("userToken");
  formdata.append("userToken", token);
  formdata.append("avatar", {
    // original data to pass
    uri: image.uri,
    name: image.uri.split("/").pop(),
    type: platform === "android" ? mime.getType(image.uri) : "jpeg",
    // customize data for FAFH backend
    filepath: image.uri,
    originalFilename: image.uri.split("/").pop(),
  });

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${dbUrl}/updateAvatar`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log("RESULT FROM UPLOADING AVATAR:",result))
    .catch((error) => console.log("error", error));
};
