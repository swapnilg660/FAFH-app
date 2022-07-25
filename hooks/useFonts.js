import * as Font from "expo-font";

export default useFonts = async () => {
   await Font.loadAsync({
      "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
      "Inter-Light": require("../assets/fonts/Inter-Light.ttf"),
      "Inter-ExtraLight": require("../assets/fonts/Inter-ExtraLight.ttf"),
      "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
      "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-MeduimItalic": require("../assets/fonts/Poppins-MediumItalic.ttf"),
      "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
      "Poppins-SemiBoldItalic": require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
      "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
      "Poppins-LightItalic": require("../assets/fonts/Poppins-LightItalic.ttf"),
      "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
      "Poppins-ExtraLightItalic": require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
      "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
      "Poppins-ThinItalic": require("../assets/fonts/Poppins-ThinItalic.ttf"),
      "Poppins-Italic": require("../assets/fonts/Poppins-Italic.ttf"),

    });
};