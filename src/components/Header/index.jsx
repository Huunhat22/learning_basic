import { Box, IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Close } from '@material-ui/icons';
import GitHubIcon from '@material-ui/icons/GitHub';
import Login from 'Features/Auth/components/Login';
import Register from 'Features/Auth/components/Register';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

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
  link:{
    color: '#fff',
    textDecoration: 'none',
  },

  closeButton:{
    position:'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  }
}));

  // Bài 106 : tạo 1 hằng số để định nghĩa Login, Register
  const MODE = {
    LOGIN:'login',
    REGISTER:'register'
  };

export default function Header() {
  // Bài 106: tạo State để phân biệt khi nào là đăng nhập,đang kí
  const [mode, setMode] = useState(MODE.LOGIN);
  const classes = useStyles();

  const [open, setOpen] =useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e,reason) => {
    if (reason === 'backdropClick') return;
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <GitHubIcon className={classes.menuButton} color="inherit" aria-label="menu"/>
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
            
            <Button color="inherit" onClick={handleClickOpen}>Register</Button>

        </Toolbar>
      </AppBar>

      {/* Khi nhấn vào button Login thì sẽ show ra dialog này */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <Close />
          </IconButton>

          <DialogContent>
            {/* Bài 106 : tạo nút chuyển đổi giữa register và login */}
            {mode===MODE.REGISTER &&(
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
    </div>
  );
}
