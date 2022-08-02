import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";

const FAFHTHEME = extendTheme({
  colors: {
    // Add new color
    primary: {
      30: "#4CCB7025",
      50: "#F2FFFC",
      100: "#bdf0e3",
      200: "#98e5d1",
      300: "#71dabe",
      400: "#4cd0ab",
      500: "#33b692",
      600: "#258e72",
      700: "#176551",
      800: "#073e30",
      900: "#00160f",
    },
    secondary: {
      30:"#FF9B2125",
      50: "#fff6da",
      100: "#ffe3ad",
      200: "#ffd17d",
      300: "#ffbe4b",
      400: "#ffab1a",
      500: "#e69200",
      600: "#e69200",
      700: "#815100",
      800: "#4e3000",
      900: "#1f0f00",
    },
  },
  config: {
    // Changing initialColorMode to 'dark' AND it's working
    // initialColorMode: "dark",
  },
  fontConfig: {
    Poppins: {
      50: {
        normal: "Poppins-Thin",
        italic: "Poppins-ThinItalic",
      },
      100: {
        normal: "Poppins-ExtraLight",
        italic: "Poppins-ExtraLightItalic",
      },
      200: {
        normal: "Poppins-Light",
        italic: "Poppins-LightItalic",
      },
      300: {
        normal: "Poppins-Regular",
        italic: "Poppins-Italic",
      },
      400: {
        normal: "Poppins-Medium",
        italic: "Poppins-MediumItalic",
      },
      500: {
        normal: "Poppins-SemiBold",
        italic: "Poppins-SemiBoldItalic",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
});

export default FAFHTHEME;
