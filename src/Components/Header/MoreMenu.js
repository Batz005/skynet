import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { pageSelected, signInStatus, subPageSelected } from '../../app/site';


import {
  styled,
  IconButton,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@mui/material';
import nhost from '../../lib/nhost';

// const PREFIX = 'MoreMenu';

// const classes = {
//   root: `${PREFIX}-root`,
//   paper: `${PREFIX}-paper`
// };

// const Root = styled('div')((
//   {
//     theme
//   }
// ) => ({
//   [`& .${classes.root}`]: {
//     display: 'flex',
//   },

//   [`& .${classes.paper}`]: {
//     marginRight: theme.spacing(2),
//   }
// }));


export default function MoreMenu() {

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

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const dispatch = useDispatch();
  //Function for handling when help is clicked.
  const handleHelpClicked = (event) => {
    handleClose(event);
    dispatch(pageSelected({active__page: 'HELP__ACTIVE'}));
    dispatch(subPageSelected({active__subPage: 'FAQS__SUBPAGE__ACTIVE'}));
  }
  const handleOnMyAccountClicked = (event) => {
    handleClose(event);
    dispatch(pageSelected({active__page: 'MYACCOUNT__ACTIVE'}));
    dispatch(subPageSelected({active__subPage: 'PROFILE__SUBPAGE__ACTIVE'}));
  }
  
  const handleLogOutClicked =  (e)=>{
    handleClose(e);
    
    
    
    try {
      nhost.auth.signOut()
    }catch(error){
      console.log("Sign Out Unsuccessful - ")
      console.error(error)
    }
    dispatch(signInStatus({isSignedIn: false}))
  }

  return (
    <div className = "moremenu">
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        size="large">
        <ArrowDropDownIcon />
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement={'bottom-end'} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button" onKeyDown={handleListKeyDown}>
                    <Link to = "/myaccount/username" style = {{textDecoration: 'none', color: 'black'}}>
                      <MenuItem onClick={handleOnMyAccountClicked}>My account</MenuItem>
                    </Link>
                    <Link to="/help" style = {{ textDecoration: 'none', color: 'black'}}>
                      <MenuItem onClick={handleHelpClicked}>Help</MenuItem>
                    </Link>
                    <Link to = "/signin" style = {{ textDecoration: 'none', color: 'black'}}>
                      <MenuItem onClick={handleLogOutClicked}>Logout</MenuItem>
                    </Link>  
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  );
}

