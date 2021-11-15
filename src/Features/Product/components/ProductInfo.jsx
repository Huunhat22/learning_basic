import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from 'utils/common';


ProductInfo.propTypes = {
    product: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
    root: {
        borderBottom:`1px solid ${theme.palette.grey[200]}`,
        paddingBottom:theme.spacing(2),
    },

    description:{
        margin:theme.spacing(2 , 0),
    },
    salePrice:{
        marginRight:theme.spacing(3),
        fontSize: theme.typography.h4.fontSize,
        fontWeight:'bold',
    },

    originalPrice:{
        marginRight:theme.spacing(3),
        textDecoration:'line-through',
    },
    promotionPercent:{},

    priceBox:{
        padding:theme.spacing(1),
        backgroundColor:theme.palette.grey[100],
    },
    
  }));

function ProductInfo({product = {}}) {
    const {name, shortDescription,salePrice,originalPrice,promotionPercent} = product;

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography component="h1" variant="h4">{name}</Typography>
            <Typography variant="body2" className={classes.description}>{shortDescription}</Typography>

            <Box className={classes.priceBox}>
                <Box component="span" className={classes.salePrice}>{formatPrice(salePrice)}</Box>

                {promotionPercent > 0 &&
                    <>
                    <Box component="span" className={classes.originalPrice}>{formatPrice(originalPrice)}</Box>
                    <Box component="span" className={classes.promotionPercent}>{`-${promotionPercent}%`}</Box>
                    </>
                }
                
            </Box>
        </Box>
    );
}

export default ProductInfo;