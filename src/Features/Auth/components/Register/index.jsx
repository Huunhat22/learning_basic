import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'Features/Auth/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
    
};

function Register(props) {
    const dispatch = useDispatch()

    const handleSubmit= async (values) =>{
        console.log('Form Submit', values);
        
        try {
            // auto set username = email
            values.username = values.email;

            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            
            console.log('New user : ', user);
        } catch (error) {
            console.log('failded to register', error);
        }
        
    }
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Register;