import { Box, Button, Dialog, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formatPrice } from 'utils/common';
import { removeCardItem, setQuantityItem } from '../cartSlice';
import ChangeQuantityItem from './ChangeQuantityItem';

CartItem.propTypes = {
  item: PropTypes.object,
};

CartItem.defaultProps ={
  item : {},
}

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

 

  dialog: {
    padding: theme.spacing(3),
    borderRadius:'5px',
    width:'400px',
  },

  message: {
    margin: theme.spacing(2,0),
    '& > p':{
      fontWeight:'700',
    },
  },

  action: {
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
  },

  dialogButton: {
    padding: theme.spacing(1,2),
    width: 'calc(50% - 10px)',
    textTransform: 'none',

    fontSize:'15px',
    fontWeight:'600',
  },

  cancel: {
    color:'#0d5cb6',
    border:'0.5px solid #0d5cb6', 
  },

  delete: {
    backgroundColor:'#ff424e',
    color:'#fff',
    border:'0.5px solid #ff424e',

    '&:hover': {
      backgroundColor:'rgb(255, 15, 30)',
    }
  },

}));

function CartItem({ item }) {
  const { product, quantity } = item;

  const classes = useStyle();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  // HẰNG SỐ ĐƯỢC IMPORT VÀO TỪ common.js thông qua index.js
  const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;
  const totalItem = quantity * product.salePrice;

  const HandleChangeQuantity = (formValues) => {
    // console.log('Fomr Submit',formValues);
    const action = setQuantityItem({
      id: product.id,
      quantity: formValues.quantity,
    });
    dispatch(action);
  };

  const handleDeleteItem = (idItem) => {
    const action = removeCardItem(idItem);

    dispatch(action);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Typography>{formatPrice(totalItem)}</Typography>
        </Box>
        <Box className={classes.remove}>
          <IconButton
            onClick = {handleClickOpen}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Dialog Confirm Delete Item */}
      <Dialog open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-remove-item"
        >
        <Box className={classes.dialog}>
          <Box className={classes.message}>
            <Typography >Do you want delete item ?</Typography>
          </Box>
          <Box className={classes.action}>
            <Button className={clsx(classes.dialogButton,classes.cancel)} onClick={handleClose}>Cancel</Button>
            <Button className={clsx(classes.dialogButton,classes.delete)} onClick={() => {handleDeleteItem(product.id)}} >Delete</Button>
          </Box>
        </Box>
      </Dialog>

    </Paper>
  );
}

export default CartItem;
