import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import './styles.scss';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Drawer = () => {
  const drawerEl = React.useRef(null)
  const [open, setOpen] = React.useState(false)
  const handleClick = () => setOpen(!open)
  useOnClickOutside(drawerEl, () => setOpen(false));
  return (
    <div ref={drawerEl} className={'Drawer' + (open ? ' open' : '')}>
      <div className="close-icon-container"
        onClick={handleClick}>
        <DoubleArrowIcon className='close-icon' />
      </div>
      <ul className='list-item'>
        <li className='item'>
          All boards
        </li>
        <li className='item'>
          Create new board
        </li>
        <li className='item'>
          Profile
        </li>
        <li className='item'>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Drawer;
