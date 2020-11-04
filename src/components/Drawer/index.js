import React from "react";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import "./styles.scss";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { Link } from "react-router-dom";

const Drawer = ({ logoutUser }) => {
  const drawerEl = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const handleClick = () => setOpen(!open);
  useOnClickOutside(drawerEl, () => setOpen(false));
  return (
    <div ref={drawerEl} className={"Drawer" + (open ? " open" : "")}>
      <div className="close-icon-container" onClick={handleClick}>
        <DoubleArrowIcon className="close-icon" />
      </div>
      <ul className="list-item">
        <Link to="/">
          <li className="item">All boards</li>
        </Link>
        <Link to="/profile">
          <li className="item">Profile</li>
        </Link>
        <Link to="#" onClick={logoutUser}>
          <li className="item">Logout</li>
        </Link>
      </ul>
    </div>
  );
};

export default Drawer;
