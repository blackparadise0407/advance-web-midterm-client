import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const Loader = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="Loader">
        <div className="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else return null;
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
