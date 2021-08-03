import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'Features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';

Login.propTypes = {
    //bài 101 : thêm 1 prop là function để tắt dialog
    closeDialog: PropTypes.func,
};

function Login(props) {
    const dispatch = useDispatch()

    // B101 : thêm thông báo notiStack
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit= async (values) =>{
        console.log('Form Submit', values);
        
        try {
            // tạo 1 action là login được lấy từ userSlice
            const action = login(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);

            //bài:101 close dialog
            const {closeDialog} = props;
            if (closeDialog) {
                closeDialog();
            }

            // // do something when user submit
            // console.log('user login: ', user);

            // //B101: thêm notiStack
            // enqueueSnackbar('Login sussecfully', {variant:'success'});

        } catch (error) {
            console.log('Failded to login', error);
            enqueueSnackbar(error.message, {variant:'error'});
        }
        
    }
    return (
        <div>
            <LoginForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Login;