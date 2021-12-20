import { Box, IconButton, makeStyles, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root:{

    },
    cart__heading:{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        
        padding:theme.spacing(0,2),
    },
    
    cart__all: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexGrow: '1',

        fontFamily:[
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),

        width: '30%',
    },

    cart__price: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '20%',

        fontFamily:[
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),

    },

    cart__quantity: {
        width: '20%',

        fontFamily:[
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
    },
    
    cart__total: {
        width: '20%',

        fontFamily:[
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),

    },

    cart__delete: {

    },

}));


function CartHeading(props) {

    const classes = useStyles();

    return (
        <Paper elevation={0}>
            <Box className={classes.cart__heading}>
                <Box className={classes.cart__all} component='span'>All Items</Box>
                <Box className={classes.cart__price} component='span'>Price</Box>
                <Box className={classes.cart__quantity} component='span'>Quantity</Box>
                <Box className={classes.cart__total} component='span'>Total</Box>
                <Box className={classes.cart__delete} component='span'>
                    <IconButton>
                        <DeleteIcon></DeleteIcon>
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
}

export default CartHeading;