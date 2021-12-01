import { Box, FormHelperText, IconButton, Input, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';


QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const useStyle = makeStyles((theme) => ({
    root: {
    },
    quantity: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
    },

    textfield: {
        "& input": {
            textAlign: 'center',
        }
    },
}))

function QuantityField(props) {
    const classes = useStyle();

    const { form, name, label } = props;
    const { control, setValue } = form;

    // bài 149: handleRemoveQuantity
    const handleRemoveQuantity = (name, value) => {
        setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)
    }

    const handleAddQuantity = (name, value) => {
        setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)
    }

    return (
        // Input Field -> sẽ tự dộng bind
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, name }, fieldState: { invalid, error } }) => (
                <>
                    <FormControl error={invalid} fullWidth variant="outlined" margin="normal">
                        <Typography className={classes.quantity}>{label}</Typography>

                        <Box>
                            <IconButton onClick={() => handleRemoveQuantity(name, value)}>
                                <RemoveCircleOutline />
                            </IconButton>
                            <OutlinedInput className={classes.textfield}
                                id={name}
                                error={invalid}
                                type='quantity'
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                            <IconButton onClick={() => handleAddQuantity(name, value)}>
                                <AddCircleOutline></AddCircleOutline>
                            </IconButton>
                        </Box>

                    </FormControl>
                    {/* Lưu ý khi validate field phải thêm FormHelperText */}
                    <FormHelperText error={invalid}>{error?.message}</FormHelperText>
                </>
            )}
        ></Controller>

    );
}

export default QuantityField;