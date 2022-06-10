import AlertAsync from "react-native-alert-async";

export default async function areYouSure({ Title, Message }) {
  const choice = await AlertAsync(
    Title,
    Message,
    [
      { text: "No", onPress: () => Promise.resolve("no") },
      { text: "Yes", onPress: () => "yes" },
    ],
    {
      cancelable: true,
      onDismiss: () => "no",
    }
  );

  if (choice === "yes") {
    return true;
  } else {
    return false;
  }
}
