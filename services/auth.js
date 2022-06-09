import * as SecureStore from "expo-secure-store";

export const signIn = async (data) => {
  // return firebase token
  const token = `${data?.email}-token`;
  // save it to secure store if user wants to stay logged in
  if (data.stayLoggedIn) {
    await SecureStore.setItemAsync("userToken", token);
    console.log("data:", data);
    console.log("token saved");
  }
  return token;
};
export const signUp = async (data) => {
  //register user and sign them in then
  const token = `${data?.username}-token`;
  // save it to secure store if user wants to stay logged in
  if (data.stayLoggedIn) await SecureStore.setItemAsync("userToken", token);
  return token;
};
export const signOut = async () => {
  //sign out
  return true;
};

//standalone functions
export const reducer = (prevState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignedOut: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignedOut: true,
        userToken: null,
      };
  }
};
//   We are gonna use the useReducer hook to manage
// the state of the user's authentication throughout the whole App.
// please communicate before editing.
