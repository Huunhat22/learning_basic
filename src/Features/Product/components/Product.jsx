import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

Product.propTypes = {
    product: PropTypes.object,
};

function Product({ product }) {
    return (
        <Box padding={1}>
            <Skeleton variant="rect" width="100%" height={118} />
            <Typography>{product.name}</Typography>
            <Typography width="60%">
                {product.salePrice} - {product.promotionPercent}
            </Typography>
        </Box>
    );
}

export default Product;