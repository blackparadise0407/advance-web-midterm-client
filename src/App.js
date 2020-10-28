import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ErrorBoundary, Loader } from "./components";
const HomePage = React.lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
