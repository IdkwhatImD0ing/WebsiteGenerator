"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = (isDarkMode) =>
  createTheme({
    palette: {
      primary: {
        main: "#28282B",
      },
    },
    blue: {
      primary: {
        main: "#5D3FD3",
      },
    },
    green: {
      primary: {
        main: "#3FD3A7",
      },
    },
    yellow: {
      primary: {
        main: "#B5D33F",
      },
    },
    red: {
      primary: {
        main: "#D33F6B",
      },
    },
  });

export default function CustomTheme() {
  return <ThemeProvider theme={customTheme(false)}></ThemeProvider>;
}
