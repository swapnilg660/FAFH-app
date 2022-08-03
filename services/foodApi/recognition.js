
// Gives possible food items from the image
export const RecognisePlate = (image, userToken, setRecognitionResults) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + userToken
    );

    var formdata = new FormData();
    formdata.append(
      "image",
      image,
      image.path
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://api.logmeal.es/v2/image/recognition/complete/v1.0?skip_types=[]&language=eng",
      requestOptions
    )
      .then((response) => JSON.parse(response))
      .then((data) => {
        console.log("Recognition results: ", data);
        setRecognitionResults(data);
      })
      .catch((error) => console.log("error", error));
}

// When user confirms actual ingridients
export const ConfirmPlate = (userToken,imageId, confirmedId, confirmedTitle, setConfirmationResults) => {
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append(
  "Authorization",
  "Bearer " + userToken
);

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

}