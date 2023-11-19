'use client'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = (isDarkMode) => 
createTheme({
    palette: {
        mode: isDarkMode ? 'dark' : 'light',
        primary: {
            main: "#28282B",
            blue: "#5D3FD3",
            green: "#3FD3A7",
            yellow: "#B5D33F",
            red: "#D33F6B"
        },
        background: {
            default: isDarkMode ? '#121212' : '#28282B',
            inverted: '#28282B',
            blue: "#5D3FD3",
            green: "#3FD3A7",
            yellow: "#B5D33F",
            red: "#D33F6B"
        },
        text: {
            primary: isDarkMode ? '#ffffff' : '#000000',
            secondary: isDarkMode ? '#a0a0a0' : '#303030',
        },
        typography: {
            fontFamily: "'Roboto', sans-serif",
        },
    }
});

export default function CustomTheme({children}) {
    return (
        <ThemeProvider theme={customTheme(false)}>
            {children}
        </ThemeProvider>
    );
};