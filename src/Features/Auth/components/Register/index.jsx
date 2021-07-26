import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'Features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';

Register.propTypes = {
    //bài 101 : thêm 1 prop là function để tắt dialog
    colseDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch()

    // B101 : thêm thông báo notiStack
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit= async (values) =>{
        console.log('Form Submit', values);
        
        try {
            // auto set username = email
            values.username = values.email;

            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            //bài:101 close dialog
            const {colseDialog} = props;
            if (colseDialog) {
                colseDialog();
            }

            // do something when user submit
            console.log('New user : ', user);

            //B101: thêm notiStack
            enqueueSnackbar('Register sussecfully', {variant:'success'});

        } catch (error) {
            console.log('failded to register', error);
            enqueueSnackbar(error.message, {variant:'error'});
        }
        
    }
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Register;