import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';


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

    // Bài 133: hàm này sẽ handle khi filterPrice thay đổi, nhận vào 1 object chưa 2 giá trị là gte và lte
    const handlePriceChange = (values) => {
        // console.log(values);
        if (onChange) {
            onChange(values)
        }
    };

    // bài 135
    const handelServiceChange = (values) => {
        if (onChange) {
            onChange(values)
        }
    };

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />

            {/* Bài 133: FilterByPrice */}
            <FilterByPrice onChange={handlePriceChange} />

            {/* Bài 135: FilterByService */}
            <FilterByService filters={filters} onChange={handelServiceChange} />
        </Box>
    );
}

export default ProductFilters;