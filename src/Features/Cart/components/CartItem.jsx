import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import { formatPrice } from 'utils/common';
import ChangeQuantityItem from './ChangeQuantityItem';
import { setQuantityItem } from '../cartSlice';
import { useDispatch } from 'react-redux';

CartItem.propTypes = {
    item: PropTypes.object,
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

function CartItem({item}) {

    const {product, quantity} = item;
    
    const classes = useStyle();
    const dispatch = useDispatch();

    // HẰNG SỐ ĐƯỢC IMPORT VÀO TỪ common.js thông qua index.js
    const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;

    const HandleChangeQuantity = (formValues) => {
        // console.log('Fomr Submit',formValues);

        // Bài 158 : handle addToCart
        const action = setQuantityItem({
            id: product.id,
            quantity: formValues.quantity,

        });
        dispatch(action);
    }
    console.log("quantiy of item: ",typeof(quantity));
    return (
        <Paper elevation={0}>
            <Box className={classes.root}>
                <Box className={classes.thumbnail}>
                    {/* thumbnail cho item */}
                    <Box className={classes.image}>
                        <img src={thumbnailUrl} alt={product.name} width="100%"/>
                    </Box>
                    <Typography>{product.name}</Typography>
                </Box>
                <Box className={classes.price}>
                    <Typography width="60%">
                        {formatPrice(product.salePrice)}
                        {product.promotionPercent > 0 && <Box component="span" className={classes.originalPrice}> {formatPrice(product.originalPrice)} </Box>}
                    </Typography>
                </Box>
                <Box className={classes.quantity} >
                    <ChangeQuantityItem onSubmit={HandleChangeQuantity} quantity={quantity}></ChangeQuantityItem>
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