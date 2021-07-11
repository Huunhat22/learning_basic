import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name : PropTypes.string.isRequired,

    label : PropTypes.string,
    disabled : PropTypes.bool,
};

function InputField(props) {

    const {form,name,label,disabled} = props;
    const {control} = form;

    return (
        // Input Field -> sẽ tự dộng bind
        <Controller
            name={name}
            control={control}
            render={({field : {onChange,onBlur,value,name},fieldState: {invalid,error}}) =>(
                <TextField 
                    margin="normal"
                    variant = "outlined"
                    fullWidth
                    label={label}
                    disabled = {disabled}
                    value = {value}
                    name={name}
                    onChange = {onChange}
                    onBlur = {onBlur}
                    error={invalid}
                    helperText ={error?.message}
                />
            )}   
        ></Controller>  
        
    );
}

export default InputField;