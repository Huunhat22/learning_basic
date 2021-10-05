import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';


FilterByService.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};

const useStyle = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },

    list: {
        padding: 0,
        margin: 0,

        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        listStyleType: 'none',
    }
}))

function FilterByService({ filters, onChange }) {

    const classes = useStyle();

    // handleChange khi TextField thay đổi values
    const handleChange = (e) => {
        if (!onChange) return;

        const { name, checked } = e.target;
        onChange({ [name]: checked });

    }


    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">DỊCH VỤ</Typography>

            <ul className={classes.list}>
                {[
                    { value: 'isPromotion', label: 'có khuyến mãi' },
                    { value: 'isFreeShip', label: 'vận chuyển miễn phí' }
                ].map(service => (
                    <li key={service.value}>
                        <FormControlLabel control={<Checkbox checked={Boolean(filters[service.value])} onChange={handleChange} name={service.value} color='primary' />} label={service.label} />
                    </li>
                ))}
            </ul>

        </Box>
    );
}

export default FilterByService;