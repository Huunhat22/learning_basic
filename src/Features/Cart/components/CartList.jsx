import React from 'react';
import PropTypes from 'prop-types';
import { Box,Grid } from '@material-ui/core';

CartList.propTypes = {
    
};

function CartList(props) {
    return (
        <Box>
            <Grid container>
                Cart Items
            </Grid>
        </Box>
    );
}

export default CartList;