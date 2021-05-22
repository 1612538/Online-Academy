import React from "react";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import {ColorButton} from '../NavBar'

import SmallCategoriesMenu from './SmallCategoriesMenu';

import "@fontsource/roboto";

export default function CatMenu() {
  const [open, setOpen] = React.useState(false);
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
                  <SmallCategoriesMenu handleClose={handleClose}></SmallCategoriesMenu>
                  </div>
                </ClickAwayListener>
                </div>
            </Grow>
          )}
        </Popper>
      </div>
    );
}