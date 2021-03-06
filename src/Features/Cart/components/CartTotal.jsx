import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from '../selectors';
import { formatPrice } from 'utils/common';

CartTotal.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {

    },

    infor: {
        padding: theme.spacing(2),
    },

    delivery: {
        fontSize: '14px',
        color: '#242424',
        marginBottom: '15px',
        fontWeight: 'bold'
    },

    fullname: {
        fontSize: '15px',
        fontWeight: 'bold',
        marginBottom: '15px',
    },

    address: {
        fontSize: '13px',
        color: theme.palette.grey[500],
    },

    detail: {
        margin: theme.spacing(2, 0),
    },

    priceItems: {
        margin: '0',
        padding: theme.spacing(2),
        listStyle: 'none',
        borderBottom: '1px solid rgb(244 , 244 ,244)',
    },

    priceItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',

    },

    text: {
        fontSize: '14px',
        color: theme.palette.grey[700],
    },

    value: {
        fontSize: '14px',
        color: theme.palette.grey[700],
        fontWeight: 'bold',
    },

    total: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        padding: theme.spacing(2),
    },

    price: {
        color: 'rgb(254, 56, 52)',
    },

    note: {
        fontSize: '13px',
        color: theme.palette.grey[700],
    },

    submit: {
        backgroundColor: 'rgb(255, 66, 78)',
        color: '#fff',
        width: '100%',
        textTransform: 'none',

        '&:hover': {
            backgroundColor: 'rgb(255, 15, 30)',
        }
    }


}));

function CartTotal(props) {

    const classes = useStyles();

    const totalCart = useSelector(cartTotalSelector);

    return (
        <Box>
            <Paper elevation={0}>
                <Box className={classes.infor}>
                    <Typography className={classes.delivery}>Delivered to</Typography>
                    <Typography className={classes.fullname}>V?? H???u Nh???t | 012345678</Typography>
                    <Typography variant='body2' className={classes.address}>123 Tr?????ng sa,Ph?????ng 2,Ph?? Nhu???n, Ph?????ng 02, Qu???n Ph?? Nhu???n, H??? Ch?? Minh</Typography>
                </Box>
            </Paper>

            <Paper elevation={0}>
                <Box className={classes.detail}>
                    <Box className={classes.priceItems} component='ul'>
                        <li className={classes.priceItem}>
                            <span className={classes.text}>Temporary Price</span>
                            <span className={classes.value}>{formatPrice(totalCart)}</span>
                        </li>
                        <li className={classes.priceItem}>
                            <span className={classes.text}>Discount Price</span>
                            <span className={classes.value}>0</span>
                        </li>
                    </Box>
                    <Box className={classes.total}>
                        {/* B??i 159: l???y ra t???ng s??? ti???n c???a gi??? h??ng */}
                        <span className={classes.text}>Total Payment</span>
                        <Box style={{ textAlign: 'right' }}>
                            <Typography className={classes.price}>{totalCart > 0 ? formatPrice(totalCart): `Please select item` }</Typography>
                            <Typography variant='body2' className={classes.note}>(VAT incluled)</Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
            <Button type="submit" className={classes.submit} >Place Order</Button>

        </Box>

    );
}

export default CartTotal;