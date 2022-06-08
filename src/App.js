import React from 'react'
import axios from 'axios';
// Routes
import Routes from './Routes';
// Components
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider, createTheme } from '@mui/material/styles'

import './App.css';

function App() {

  // defualt config for Axios
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

  const theme = createTheme({
    typography: {
      "fontFamily": `"Poppins", sans-serif`,
      "fontSize": 14
    },
    palette: {
      primary: {
        main: '#2063cf',
        light: '#b5c9e8',
        dark: '#061b65'
      },
      background: {
        main: "#f6f7f9"
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
