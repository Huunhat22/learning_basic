import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CartList from '../components/CartList';
import CartTotal from '../components/CartTotal';
import { useSelector } from 'react-redux';
import CartHeading from '../components/CartHeading';

CartPage.propTypes = {
    
};

const useStyles = makeStyles((theme) => ({
    root:{

    },
    title:{
        margin:'16px 0',
        fontWeight:'500',
        lineHeight:'28px',
    },
    
    cart__inner: {
        flex: '1 1 0'
    },
    
    cart__total: {
        width: '350px',
    }

}));

function CartPage(props) {
    const classes = useStyles();

    const cartList = useSelector(state => state.cart.cartItems);
    console.log({cartList});

    return (
        <Box>
            <Container>
                <Typography variant='h6' className={classes.title}>Cart List</Typography>
                <Grid container spacing={2}>
                    <Grid item className={classes.cart__inner}>
                        <CartHeading></CartHeading>
                        <CartList data={cartList}></CartList>
                    </Grid>
                    <Grid item className={classes.cart__total}>
                        <CartTotal></CartTotal>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default CartPage;