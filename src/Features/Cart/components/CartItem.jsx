import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Paper, Typography, IconButton } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import { formatPrice } from 'utils/common';
import ChangeQuantityItem from './ChangeQuantityItem';
import { setQuantityItem } from '../cartSlice';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';

CartItem.propTypes = {
  item: PropTypes.object,
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  thumbnail: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexGrow: '1',

    width: '30%',
  },

  image: {
    height: '80px',
    width: '80px',

    '& > img': {
      objectFit: 'cover',
    },
  },
  
  content: {
    width: 'calc(100% - 80px)',
    paddingLeft: '10px',
    position: 'relative',
  },

  title: {
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',

    overflow: 'hidden',
    fontSize: '13px',
    marginBottom: '5px',
    lineHeight: '20px',
  },

  price: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '20%',
  },

  salePrice: {
    marginRight: '10px',
    fontWeight: '500',
  },

  originalPrice: {
    fontSize: '11px',
    color: 'rgb(153, 153, 153)',
    textDecoration: 'line-through',
  },

  quantity: {
    width: '20%',
  },

  total: {
    width: '20%',

    '& > p': {
      fontSize: '13px',
      fontWeight: '600',
      color: 'rgb(254, 56, 52)',
    },
  },

  remove: {},
}));

function CartItem({ item }) {
  const { product, quantity } = item;

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
  };
  console.log('quantiy of item: ', typeof quantity);
  return (
    <Paper elevation={0}>
      <Box className={classes.root}>
        <Box className={classes.thumbnail}>
          {/* thumbnail cho item */}
          <Box className={classes.image}>
            <img src={thumbnailUrl} alt={product.name} width="100%" />
          </Box>
          <Box className={classes.content}>
            <Typography className={classes.title}>{product.name}</Typography>
          </Box>
        </Box>
        <Box className={classes.price}>
          <Box component="span" className={classes.salePrice}>
            {formatPrice(product.salePrice)}
          </Box>
          <Box>
            {product.promotionPercent > 0 && (
              <Box component="span" className={classes.originalPrice}>
                {formatPrice(product.originalPrice)}
              </Box>
            )}
          </Box>
        </Box>
        <Box className={classes.quantity}>
          <ChangeQuantityItem onSubmit={HandleChangeQuantity} quantity={quantity}></ChangeQuantityItem>
        </Box>
        <Box className={classes.total}>
          <Typography>100.000.000</Typography>
        </Box>
        <Box className={classes.remove}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}

export default CartItem;
