import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { MyAppBar, Drawer } from "../../components";

const MainLayout = ({ children, logoutUser, user }) => {
  return (
    <div>
      <Drawer logoutUser={logoutUser} />
      <MyAppBar user={user} logoutUser={logoutUser} />
      {children}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
