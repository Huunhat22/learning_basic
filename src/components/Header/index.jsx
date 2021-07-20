import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import Register from 'Features/Auth/components/Register';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
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
  }
}));

export default function Header() {
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

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown>
              <DialogContent>
                <Register />
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
