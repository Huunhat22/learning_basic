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

// Bài 106 : tạo 1 hằng số để định nghĩa Login, Register
const MODE = {
  LOGIN: 'login',
  REGISTER: 'register'
};

export default function Header() {
  // Bài 110: thêm dispatch cho hàm logout
  const dispatch = useDispatch();
  // Bài 109: Tạo loggedInUser để nhận biết đã đăng nhập hay chưa
  const loggedInUser = useSelector(state => state.user.current)
  const ShowMiniCart = useSelector(state => state.cart.showMiniCart)
  const isLoggedIn = !!loggedInUser.id;

  // Bài 106: tạo State để phân biệt khi nào là đăng nhập,đang kí
  const [mode, setMode] = useState(MODE.LOGIN);

  // Bài 110: Tạo state cho anchorEl
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openMiniCart, setOpenMiniCart] = useState(ShowMiniCart);

  console.log(typeof (openMiniCart), openMiniCart);

  // Bài 159: sử dụng useSelector để đẻ lấy quantity từ custom Selector, sử dụng useHistory() để đẩy vào url
  const quantity = useSelector(cartItemsCountSelector)
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e, reason) => {
    if (reason === 'backdropClick') return;
    setOpen(false);
  };

  // thêm hàm handleUserClick
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  // Bài 109: thêm hàm handleCloseMenu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Bài 101: thêm hàm handlelogoutClick
  const handlelogoutClick = () => {
    // do đã export từ userSlice
    const action = logout();
    dispatch(action);

    setAnchorEl(null);
  }

  // Bài 159: handleGoToCart
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


          {/* Bài 109: hiển thị tùy chỉnh khi đang nhập đăng kí, Nếu chưa đăng nhập !isLoggedIn thì hiển thị Login*/}
          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
          )}

          {/* Bài 109: hiển thị tùy chỉnh khi đang nhập đăng kí, Nếu đã isLoggedIn thì hiển thị */}
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

      {/* Bài 110: thêm menu khi click vào iconUser */}
      <Menu
        keepMounted
        anchorEl={anchorEl}
        // nếu có giá trị thị là true, còn không thì là false
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        // tùy chỉnh vị trí menu xuất hiện
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

      {/* Khi nhấn vào button Login thì sẽ show ra dialog này */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          {/* Bài 106 : tạo nút chuyển đổi giữa register và login */}
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
