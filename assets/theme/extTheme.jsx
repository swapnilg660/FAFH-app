import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";

const FAFHTHEME = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: "#e0fdf5",
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
    secondary:
    {
      50: '#fff6da',
      100: '#ffe3ad',
      200: '#ffd17d',
      300: '#ffbe4b',
      400: '#ffab1a',
      500: '#e69200',
      600: '#e69200',
      700: '#815100',
      800: '#4e3000',
      900: '#1f0f00',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "dark",
  },
});

export default FAFHTHEME;
