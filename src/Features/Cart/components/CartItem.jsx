import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import { formatPrice } from 'utils/common';

CartItem.propTypes = {
    product: PropTypes.object,
};

const useStyle =  makeStyles((theme) => ({
    root:{
        padding:theme.spacing(3),
        display:'flex',
        alignItems:'center',
    },

    item:{

    },

    thumbnail:{
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start',
    },

    image:{
        height:'80px',
        width:'80px',

        '& > img':{
            objectFit:'cover',
        }
    },

    price:{

    },

    quantity:{

    },

    total:{

    },

    remove:{

    },

}));

function CartItem({product={}}) {

    const {name,promotionPercent,originalPrice} = product;
    const classes = useStyle();
    // HẰNG SỐ ĐƯỢC IMPORT VÀO TỪ common.js thông qua index.js
    const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;

    return (
        <Paper elevation={0}>
            <Box className={classes.root}>
                <Box className={classes.thumbnail}>
                    {/* thumbnail cho item */}
                    <Box className={classes.image}>
                        <img src={thumbnailUrl} alt={product.name} width="100%"/>
                    </Box>
                    <Typography>{name}</Typography>
                </Box>
                <Box className={classes.price}>
                    <Typography width="60%">
                        {formatPrice(product.salePrice)}
                        {promotionPercent > 0 && <Box component="span" className={classes.originalPrice}> {formatPrice(originalPrice)} </Box>}
                    </Typography>
                </Box>
                <Box className={classes.quantity}>

                </Box>
                <Box className={classes.total}>

                </Box>
                <Box className={classes.remove}>

                </Box>
            </Box>
        </Paper>
    );
}

export default CartItem;