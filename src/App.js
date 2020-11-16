import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { map } from "lodash";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Router, Route, Switch } from "react-router-dom";
import theme from "./assets/theme/theme";
import { Loader } from "./components";
import NotFound from "./pages/NotFound";
import history from "./helpers/history";
const HomePage = React.lazy(async () => await import("./pages/Home"));
const RegisterPage = React.lazy(async () => await import("./pages/Register"));
const BoardPage = React.lazy(async () => await import("./pages/Board"));
const LoginPage = React.lazy(async () => await import("./pages/Login"));
const ProfilePage = React.lazy(async () => await import("./pages/Profile"));

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
  {
    path: "/profile",
    component: ProfilePage,
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
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Switch>
          <React.Suspense fallback={<Loader isLoading={true} />}>
            {_renderPages(pages)}
          </React.Suspense>
          <Route path="*" component={NotFound} />
        </Switch>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </Router>
  );
};

export default App;
