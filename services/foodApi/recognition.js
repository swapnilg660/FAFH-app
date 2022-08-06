import axios from "axios";

// Gives possible food items from the image
export const RecognisePlate = async (image, userToken) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");
  myHeaders.append("Accept", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer 58559af7a8010b3c325b79302fb1c2796ca86d73"
  );

  var formdata = new FormData();
  formdata.append("image", image, image.uri);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(
    "https://api.logmeal.es/v2/image/recognition/type/v1.0?skip_types=[1,3]&language=eng",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      alert(sucess);
      alert(result);
    })
    .catch((error) => alert(error));
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
