import axios from "axios";

// Gives possible food items from the image
export const RecognisePlate = async (image, userToken) => {
  var axios = require("axios");
  var FormData = require("form-data");
  // var fs = require("fs");
  var data = new FormData();
  data.append("image", image);

  var config = {
    method: "post",
    url: "https://api.logmeal.es/v2/image/recognition/complete/v1.0?skip_types=[1,3]&language=nld",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: "Bearer 938b6d43d5aa3008bafda72bbb9bb78cbe48f076",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log("error getting plate: ", error);
    });
};

// When user confirms actual ingridients
export const ConfirmPlate = (
  userToken,
  imageId,
  confirmedId,
  confirmedTitle,
  setConfirmationResults
) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + userToken);

  var raw = JSON.stringify({
    imageId: imageId,
    confirmedClass: [confirmedId, confirmedTitle],
    source: ["logmeal", "other"],
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://api.logmeal.es/v2/image/confirm/dish/v1.0?language=eng",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      result["imageId"] = imageId;
      setConfirmationResults(result);
    })
    .catch((error) => console.log("error", error));
};
