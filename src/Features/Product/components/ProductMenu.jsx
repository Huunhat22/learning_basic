import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {
    
};

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        flexFlow:'row noWrap',
        justifyContent:'center',
        alignItems:'center',

        padding:0,
        listStyle:'none',

        '& > li':{
            padding: theme.spacing(2,4),
        },

        '& > li > a':{
            color: theme.palette.grey[700],
        },

        '& > li > a.active':{
            color: theme.palette.primary,
            textDecoration:'underline',
        }
    },
  

  }));

function ProductMenu(props) {
    // Tạo useRoudMatch()
    const {url} = useRouteMatch();

    const classes = useStyles();

    return (
        <Box component='ul' className={classes.root}>
            <li>
                <Link to={url}>Description</Link>
            </li>
            <li>
                <Link to={`${url}/additional`} exact>Additional Information</Link>
            </li>
            <li>
                <Link to={`${url}/reviews`} exact>Reviews</Link>    
            </li>
        </Box>
    );
}

export default ProductMenu;