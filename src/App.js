import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import theme from "./assets/theme/theme";
import { ErrorBoundary, Loader } from "./components";
const HomePage = React.lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route
            path="/"
            render={() => (
              <React.Suspense fallback={<Loader isLoading={true} />}>
                <HomePage />
              </React.Suspense>
            )}
          />
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
