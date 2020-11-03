import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { MyAppBar, Drawer } from "../../components";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Drawer />
      <MyAppBar />
      {children}
    </div>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
