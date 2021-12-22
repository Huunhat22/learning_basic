import { Box, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
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
                    <CartItem item={item}></CartItem>
                </li>
            ))}
        </Box>
    );
}

export default CartList;