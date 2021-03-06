import { Badge, Box, ClickAwayListener, IconButton, Menu, MenuItem, Paper } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons';
import GitHubIcon from '@material-ui/icons/GitHub';
import Login from 'Features/Auth/components/Login';
import Register from 'Features/Auth/components/Register';
import { logout } from 'Features/Auth/userSlice';
import { hideMiniCart, showMiniCart } from 'Features/Cart/cartSlice';
import { cartItemsCountSelector } from 'Features/Cart/selectors';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },

  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },

  miniCart: {
    position: 'absolute',
    top: '70px',
    right: '30px',
    display: 'block',

    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      backgroundColor: 'inherit',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },

  miniBox: {
    padding: theme.spacing(2),
  },

  miniGoToCart: {
    width: '100%',
    backgroundColor: 'rgb(255, 66, 78)',
    color: '#fff',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: 'rgb(255, 15, 30)',
    }
  },

  miniheader: {
    marginBottom: theme.spacing(1),
    display: 'flex',

    '& > svg': {
      marginRight: theme.spacing(1),
      color: '#12df12',
    }
  }



}));

// B??i 106 : t???o 1 h???ng s??? ????? ?????nh ngh??a Login, Register
const MODE = {
  LOGIN: 'login',
  REGISTER: 'register'
};

export default function Header() {
  // B??i 110: th??m dispatch cho h??m logout
  const dispatch = useDispatch();
  // B??i 109: T???o loggedInUser ????? nh???n bi???t ???? ????ng nh???p hay ch??a
  const loggedInUser = useSelector(state => state.user.current)
  const ShowMiniCart = useSelector(state => state.cart.showMiniCart)
  const isLoggedIn = !!loggedInUser.id;

  // B??i 106: t???o State ????? ph??n bi???t khi n??o l?? ????ng nh???p,??ang k??
  const [mode, setMode] = useState(MODE.LOGIN);

  // B??i 110: T???o state cho anchorEl
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openMiniCart, setOpenMiniCart] = useState(ShowMiniCart);

  console.log(typeof (openMiniCart), openMiniCart);

  // B??i 159: s??? d???ng useSelector ????? ????? l???y quantity t??? custom Selector, s??? d???ng useHistory() ????? ?????y v??o url
  const quantity = useSelector(cartItemsCountSelector)
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e, reason) => {
    if (reason === 'backdropClick') return;
    setOpen(false);
  };

  // th??m h??m handleUserClick
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  // B??i 109: th??m h??m handleCloseMenu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // B??i 101: th??m h??m handlelogoutClick
  const handlelogoutClick = () => {
    // do ???? export t??? userSlice
    const action = logout();
    dispatch(action);

    setAnchorEl(null);
  }

  // B??i 159: handleGoToCart
  const handleGoToCart = () => {
    history.push('/Cart');
    dispatch(hideMiniCart());
  };

  const handleClickAway = () => {
    dispatch(hideMiniCart());
  };

  const handleClick = () => {
    dispatch(showMiniCart());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <GitHubIcon className={classes.menuButton} color="inherit" aria-label="menu" />
          <Typography variant='h6' className={classes.title}>
            <Link to="/" className={classes.link}>
              ThoundSand
            </Link>
          </Typography>

          <NavLink to="/Todo" className={classes.link}>
            <Button color="inherit">To do list</Button>
          </NavLink>

          <NavLink to="/AlbumMusic" className={classes.link}>
            <Button color="inherit">Album Music</Button>
          </NavLink>

          <NavLink to="/StateExvercise" className={classes.link}>
            <Button color="inherit">State Exvercise</Button>
          </NavLink>


          {/* B??i 109: hi???n th??? t??y ch???nh khi ??ang nh???p ????ng k??, N???u ch??a ????ng nh???p !isLoggedIn th?? hi???n th??? Login*/}
          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
          )}

          {/* B??i 109: hi???n th??? t??y ch???nh khi ??ang nh???p ????ng k??, N???u ???? isLoggedIn th?? hi???n th??? */}
          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircle />
            </IconButton>
          )}


          <IconButton
            aria-label="show new notifications"
            color="inherit"
            onClick={handleClick}
          >
            <Badge badgeContent={quantity} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* B??i 110: th??m menu khi click v??o iconUser */}
      <Menu
        keepMounted
        anchorEl={anchorEl}
        // n???u c?? gi?? tr??? th??? l?? true, c??n kh??ng th?? l?? false
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        // t??y ch???nh v??? tr?? menu xu???t hi???n
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handlelogoutClick}>Logout</MenuItem>
      </Menu>

      {/* Khi nh???n v??o button Login th?? s??? show ra dialog n??y */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          {/* B??i 106 : t???o n??t chuy???n ?????i gi???a register v?? login */}
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose}></Register>
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already an account. Login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose}></Login>
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Don't have an account. Register here
                </Button>
              </Box>
            </>
          )}

        </DialogContent>

      </Dialog>

      {/* Show mini cart */}

      {ShowMiniCart ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper className={classes.miniCart}>
            <Box className={classes.miniBox}>
              <Box className={classes.miniheader}>
                <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                <Typography>Add to cart completed</Typography>
              </Box>
              <Button variant='contained' className={classes.miniGoToCart} onClick={handleGoToCart}>Go to cart</Button>
            </Box>
          </Paper>
        </ClickAwayListener>
      ) : null}

    </div>
  );
}
