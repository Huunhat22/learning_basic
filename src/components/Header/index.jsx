import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useState} from 'react';

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

  const handleClose = () => {
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

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown disableBackdropClick>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
              </DialogContentText>
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
