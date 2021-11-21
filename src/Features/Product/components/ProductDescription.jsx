import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import DOMPurify from 'dompurify'
ProductDescription.propTypes = {
    product:PropTypes.object,
};

function ProductDescription({product = {}}) {
    // Bài 152: sử dụng thư viện Dompurifly để hạn chế tấn công xss từ chuỗi dữ liệu
    const safeDescription = DOMPurify.sanitize(product.description);
    
    return (
        <Paper elevation={0} style={{padding:'16px'}}>
            <div dangerouslySetInnerHTML={{__html:safeDescription}}></div>
        </Paper>
    );
}

export default ProductDescription;