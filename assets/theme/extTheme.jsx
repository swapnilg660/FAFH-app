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
      30: "#FF9B2125",
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
    tertiary: {
      50: "#f2f2f2",
      100: "#d9d9d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#737373",
      600: "#f2f2f2",
      700: "#d9d9d9",
      800: "#d9d9d9",
      900: "#d9d9d9",
    },
  },
  config: {
    // Changing initialColorMode to 'dark' AND it's working
    initialColorMode: "light",
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
        normal: "Poppins-Regular",
        italic: "Poppins-RegularItalic",
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
