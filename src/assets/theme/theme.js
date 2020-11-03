import { createMuiTheme } from '@material-ui/core/styles';
import { red, blue, indigo, lightGreen, lightBlue } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[200],
    },
    secondary: {
      main: lightBlue[500],
    },
    error: {
      main: red[500],
    },
    success: {
      main: lightGreen[700]
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
    }
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: `"Quicksand", sans-serif;`,
    fontSize: 10,
    h1: {
      fontWeight: 700,
      fontFamily: `'Poppins', sans-serif;`,
    },
    h2: {
      fontWeight: 700,
      fontFamily: `'Poppins', sans-serif;`,
    },
    h3: {
      fontWeight: 700,
      fontFamily: `'Poppins', sans-serif;`,
    },
    h4: {
      fontWeight: 700,
      fontFamily: `'Poppins', sans-serif;`,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      wordWrap: true
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      wordWrap: true
    }
  }
});

export default theme;