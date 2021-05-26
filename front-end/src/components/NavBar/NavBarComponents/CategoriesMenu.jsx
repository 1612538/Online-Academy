import React, { useEffect } from "react";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import {ColorButton} from '../NavBar';
import axios from 'axios';

import SmallCategoriesMenu from './SmallCategoriesMenu';

export default () => {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const getCategories = () =>{
    axios.get('http://localhost:8080/api/categories')
    .then(res => {
      const cats = res.data;
      setCategories(cats);
    })
    .catch(err => console.log(err));
  }

  useEffect(()=>{
    getCategories();
    return () => {
      setCategories([]);
    }
  }, [])

    return (
        <div>
        <ColorButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Categories
        </ColorButton>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{marginLeft: '107px'}}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
                <div>
                <ClickAwayListener onClickAway={handleClose}>
                  <div id="menu-list-grow">
                  <SmallCategoriesMenu categories={categories} handleClose={handleClose}></SmallCategoriesMenu>
                  </div>
                </ClickAwayListener>
                </div>
            </Grow>
          )}
        </Popper>
      </div>
    );
}