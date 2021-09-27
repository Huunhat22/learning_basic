import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';


ProductFilters.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object.isRequired
};



function ProductFilters({ filters, onChange }) {

    // Bài 131: hàm này sẽ handle khi category bị thay đổi
    const handleCategoryChange = (newCategoryId) => {
        if (!onChange) return;

        const newFilters = {
            ...filters,
            "category.id": newCategoryId,
        };
        onChange(newFilters);
    }

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
        </Box>
    );
}

export default ProductFilters;