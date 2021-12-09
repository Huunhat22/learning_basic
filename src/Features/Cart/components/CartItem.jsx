import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography } from '@material-ui/core';

CartItem.propTypes = {
    product: PropTypes.object,
};

function CartItem({product={}}) {

    const {name} = product;

    return (
        <Paper elevation={0}>
            <Typography>{name}</Typography>
        </Paper>
    );
}

export default CartItem;