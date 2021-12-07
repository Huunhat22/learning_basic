import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CartList from '../components/CartList';
import CartTotal from '../components/CartTotal';

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
    
    left: {
        flex: '1 1 0'
    },
    
    right: {
        width: '350px',
    }

}));

function CartPage(props) {
    const classes = useStyles();
    return (
        <Box>
            <Container>
                <Typography variant='h6' className={classes.title}>Cart List</Typography>
                <Grid container spacing={2}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <CartList></CartList>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <CartTotal></CartTotal>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default CartPage;