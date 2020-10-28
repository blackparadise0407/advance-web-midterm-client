import React from "react";

const ScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <></>;
};

export default ScrollToTop;
