import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';


PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name : PropTypes.string.isRequired,

    label : PropTypes.string,
    disabled : PropTypes.bool,
};

function PasswordField(props) {

    const {form,name,label,disabled} = props;
    const {control} = form;

    // bài 89: setup textfield password
    const [showPassword, setshowPassword] = useState(false);

    const toggleShowPassword = () => {
        // nếu đang là false thì là true -> và ngược lại
        setshowPassword(!showPassword);
    };

    return (
        // Input Field -> sẽ tự dộng bind
            <Controller
                name={name}
                control={control}
                render={({field : {onChange,onBlur,value,name},fieldState: {invalid,error}}) =>(
                    <>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel >{label}</InputLabel>
                        <OutlinedInput
                            id={name}
                            error={invalid}
                            label= {label}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={toggleShowPassword}
                                edge="end"
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            labelWidth={70}
                            value = {value}
                            onChange = {onChange}
                            onBlur = {onBlur}
                    />
                    </FormControl>
                    {/* Lưu ý khi validate cho password file phải thêm FormHelperText */}
                    <FormHelperText error={invalid}>{error?.message}</FormHelperText>
                    </>
                )}   
            ></Controller>    

        
    );
}

export default PasswordField;