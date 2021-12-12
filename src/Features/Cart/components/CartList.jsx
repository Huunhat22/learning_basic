import React from 'react';
import PropTypes from 'prop-types';
import { Box,Grid, makeStyles, Paper } from '@material-ui/core';
import CartItem from './CartItem';

CartList.propTypes = {
    data:PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
    root:{},
    CartList:{
        listStyle:'none',
        margin:'0',
        padding:'0',
    },
    CartItem:{
        margin:theme.spacing(2 ,0),
    },
}));

function CartList({data=[]}) {
    const classes = useStyles();
    return (
        <Box component='ul' className={classes.CartList}>
            {data.map((item)=> (
                <li item key={item.id} className={classes.CartItem}>
                    <CartItem product={item.product}></CartItem>
                </li>
            ))}
        </Box>
    );
}

export default CartList;