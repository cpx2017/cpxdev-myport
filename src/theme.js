import { createMuiTheme as createTheme } from '@material-ui/core';

const theme = createTheme({
    typography: {
        fontFamily: ['Anakotmai', 'san-serif'].join(',')
    },
    palette: {
        primary: {
            main: "#FFD700",
            contrastText: "#000"
          },
          secondary: {
            main: "#0f3bc0",
            contrastText: "#0f3bc0"
          },
      },
     breakpoints: {
    values: {
         xs: 300,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
    },
  },
});

export default theme;
