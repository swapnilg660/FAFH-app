export default async function uploadFile(file) {
  var formdata = new FormData();
  formdata.append("file", fileInput.files[0], file);
  //   console.log("[*] the file", file);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
    Headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  fetch("https://flask-production-b254.up.railway.app/test", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log("RES", result))
    .catch((error) => console.log("error", error));
}
