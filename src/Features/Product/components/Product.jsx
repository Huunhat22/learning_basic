import { Box, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  // HẰNG SỐ ĐƯỢC IMPORT VÀO TỪ common.js thông qua index.js
  const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;
  return (
    <Box padding={1}>
      {/* Thumbnail cho sản phẩm */}
      <Box padding={1}>
        <img src={thumbnailUrl} alt={product.name} width="100%" minheight={200} />
      </Box>

      <Typography>{product.name}</Typography>
      <Typography width="60%">
        <Box component={'span'} fontWeight="bold" mr={1}>
          {/* intl NumberFormat */}
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}
        </Box>

        {/* nếu lớn hơn 0 thì hiển thị phần trăm, ngược lại thì ko hiển thị */}
        {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default Product;
