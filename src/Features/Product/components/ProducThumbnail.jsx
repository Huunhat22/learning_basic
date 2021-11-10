import { Box } from '@material-ui/core';
import { THUMBNAIL_PLACEHOLDER } from 'constants/common';
import { STATIC_HOST } from 'constants/index';
import React from 'react';

ProducThumbnail.propTypes = {
    
};

function ProducThumbnail({product={}}) {
    // HẰNG SỐ ĐƯỢC IMPORT VÀO TỪ common.js thông qua index.js
    const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;

    return (
        <Box padding={1}>
            <img src={thumbnailUrl} alt={product.name} width="100%" minheight={200} />
        </Box>
    );
}

export default ProducThumbnail;