import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const MainLayout = ({ children }) => {
  return <section>{children}</section>;
};

MainLayout.propTypes = {};

export default MainLayout;
