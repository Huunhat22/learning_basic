import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from './selectors';

CartFeatur.propTypes = {

};

function CartFeatur(props) {

    // Bài 159: lấy ra tổng số tiền của giỏ hàng
    const totalCart = useSelector(cartTotalSelector);

    return (
        <div>
            CartFeatur {totalCart}
        </div>
    );
}

export default CartFeatur;