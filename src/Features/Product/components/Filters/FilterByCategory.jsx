import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import categoryApi from 'api/categoryApi';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

const useStyle = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    menu: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',

        '& > li': {
            marginTop: theme.spacing(1),
            '&:hover': {
                color: theme.palette.primary.dark,
                cursor: 'pointer'
            }
        }
    }
}))

function FilterByCategory({ onChange }) {

    // state này là mảng chứa các category
    const [categoryList, setCategoryList] = useState([]);

    // 
    const classes = useStyle();
    // gọi api bằng useEffect
    useEffect(() => {
        (async () => {
            try {
                const list = await categoryApi.getAll();
                setCategoryList(list.map(x => ({
                    id: x.id,
                    name: x.name
                })))
            } catch (error) {
                console.log("Fail to fetch category.", error);
            }
        })()
    }, []);

    // handleCategoryClick
    const handleCategoryClick = (category) => {

        if (onChange) {
            onChange(category.id);
        }
    };

    return (

        <Box className={classes.root} minHeight="202px">
            <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>

            {/* Render danh sách danh mục sản phẩm */}
            <ul className={classes.menu}>
                {categoryList.map((category) => (
                    <li variant="body2" key={category.id} onClick={() => handleCategoryClick(category)}>
                        {category.name}
                    </li>
                ))}
            </ul>

        </Box>
    );
}

export default FilterByCategory;