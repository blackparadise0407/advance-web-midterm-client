import { ThemeProvider } from "@material-ui/core";
import { map } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import theme from "./assets/theme/theme";
import { Loader, ProtectedRoute } from "./components";
const HomePage = React.lazy(async () => await import("./pages/Home"));
const RegisterPage = React.lazy(async () => await import("./pages/Register"));
const LoginPage = React.lazy(async () => await import("./pages/Login"));

const pages = [
  {
    path: '/',
    component: HomePage,
    isExact: true,
  },
  {
    path: '/register',
    component: RegisterPage,
    isExact: true,
  },
  {
    path: '/login',
    component: LoginPage,
    isExact: true,
  }
]

const _renderPages = (pages) => {
  return (
    <>{map(pages, (page, idx) =>
      <Route key={idx} is exact={page.isExact} path={page.path} render={() => <page.component />} />
    )}</>
  )
}

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <React.Suspense fallback={<Loader isLoading={true} />}>
            {_renderPages(pages)}
          </React.Suspense>
          {/* <React.Suspense fallback={<Loader isLoading={true} />}>
          </React.Suspense> */}
          {/* <React.Suspense fallback={<Loader isLoading={true} />}>
            <Route path={page.path} render={() => <page.component />} />
          </React.Suspense> */}
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
