import { ThemeProvider } from "@material-ui/core";
import { map } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import theme from "./assets/theme/theme";
import { Loader, ProtectedRoute } from "./components";
import NotFound from "./pages/NotFound";
const HomePage = React.lazy(async () => await import("./pages/Home"));
const RegisterPage = React.lazy(async () => await import("./pages/Register"));
const BoardPage = React.lazy(async () => await import("./pages/Board"));
const LoginPage = React.lazy(async () => await import("./pages/Login"));
// const NotFound = React.lazy(async () => await import("./pages/NotFound"));

const pages = [
  {
    path: "/",
    component: HomePage,
    isExact: true,
  },
  {
    path: "/register",
    component: RegisterPage,
    isExact: true,
  },
  {
    path: "/login",
    component: LoginPage,
    isExact: true,
  },
  {
    path: "/board/:id",
    component: BoardPage,
    isExact: true,
  },
  // {
  //   path: "*",
  //   component: NotFound,
  //   isExact: false,
  // },
];

const _renderPages = (pages) => {
  return (
    <>
      {map(pages, (page, idx) => (
        <Route
          key={idx}
          exact={page.isExact}
          path={page.path}
          component={page.component}
          // render={() => <page.component />}
        />
      ))}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <React.Suspense fallback={<Loader isLoading={true} />}>
            {_renderPages(pages)}
          </React.Suspense>
          <Route path="*" component={NotFound} />
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
