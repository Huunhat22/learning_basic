import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';
import { NavLink } from 'react-router-dom';

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
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <GitHubIcon className={classes.menuButton} color="inherit" aria-label="menu"/>
            <Typography variant="h6" className={classes.title}>
                ThoundSand
            </Typography>
            <Button color="inherit">To do list</Button>
            <Button color="inherit">Album Music</Button>
            <Button color="inherit">State Exvercise</Button>
            <Button color="inherit">Login</Button>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
