const Admin_token = "d41f77f0757947896887b5144513cbb647560a54";

// pass in a a unique username and password and it will return a token and id.
// Second parameter takes a state changer that will store the token and id in context.
export const SigUpUser = (username, setUser) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + Admin_token);

  var raw = JSON.stringify({
    username: username,
    language: "eng",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.logmeal.es/v2/users/signUp", requestOptions)
    .then((response) => JSON.parse(response))
    .then((result) => {
      console.log("Sucess full sign up: ", result);
      setUser(result);
    })
    .catch((error) => console.log("error", error));
};

// The parameter is a user ID not token
export const DeleteUser = (userId) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + Admin_token);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = "https://api.logmeal.es/v2/users/deleteAPIUser/" + userId;
  fetch("", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

// Pass only the values that have been edited by the user in a list form
export const ModifyUser = (userId, editedArray) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + Admin_token);

  const formData = {};
  editedArray.map((item, index) => {
    formData[item.name] = item.value;
  });

  var raw = JSON.stringify(formData);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let url = "https://api.logmeal.es/v2/users/modifyUserProfileInfo/" + userId;

  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const GetUser = (userId, setUser) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + Admin_token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = "https://api.logmeal.es/v2/users/getUserProfileInfo/" + userId;

  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => {console.log(result); setUser(result)})
    .catch((error) => console.log("error", error));
};
