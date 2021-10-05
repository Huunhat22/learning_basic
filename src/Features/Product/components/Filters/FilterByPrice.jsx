import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';

FilterByPrice.propTypes = {
    onChange: PropTypes.func,

};

const useStyle = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },

    range: {
        display: 'flex',
        flexGrow: 'row nowrap',
        alignItems: 'center',

        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),

        '& > span': {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        }
    }
}))

function FilterByPrice({ onChange }) {

    const classes = useStyle();

    // State này là object, sẽ quản lý 2 giá trị của filterPrice
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    });

    // handleChange khi TextField thay đổi values
    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues(preValues => ({
            ...preValues,
            [name]: value,
        }));
    }

    // handleSubmit khi button click
    const handleSubmit = () => {
        if (onChange) onChange(values);
    };

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">GIÁ THEO KHOẢNG</Typography>

            <Box className={classes.range}>
                <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} />
                <span>-</span>
                <TextField name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} />
            </Box>

            <Button variant="outlined" color="primary" size="small" onClick={handleSubmit}>Áp Dụng</Button>
        </Box>
    );
}

export default FilterByPrice;