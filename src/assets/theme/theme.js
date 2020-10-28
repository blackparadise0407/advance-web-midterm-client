import { createMuiTheme } from '@material-ui/core/styles';
import { red, blue, indigo, lightGreen } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: indigo[600],
    },
    error: {
      main: red[800],
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
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
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