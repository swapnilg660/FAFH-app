import * as Font from "expo-font";

export default useFonts = async () => {
   await Font.loadAsync({
      "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
      "Inter-Light": require("../assets/fonts/Inter-Light.ttf"),
      "Inter-ExtraLight": require("../assets/fonts/Inter-ExtraLight.ttf"),
      "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
      "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),

    });
};