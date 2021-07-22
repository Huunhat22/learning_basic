import React from 'react';
import PropTypes from 'prop-types';
// import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from 'components/form-controls/InputField';
import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined, } from '@material-ui/icons';
import PasswordField from 'components/form-controls/PasswordField';

const useStyles = makeStyles ((theme) =>({
    root :{
        padding: theme.spacing(3),
    },

    avatar:{
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },

    title:{
        textAlign: 'center',
        margin : theme.spacing(2,0,3,0),
    },

    submit:{
        margin: theme.spacing(2,0),
    },


}))

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {

    const classes = useStyles();

    // add validation cho các input field
    const schema = yup.object().shape({
       fullName : yup
        .string()
        .required('Please enter your full name.')
        .test('should has at least two words.','Please enter at least two words.',(value) =>{
            // hàm test này tự định nghĩa để thêm chức năng mong muốn
            // console.log('value', value);
            return value.split(' ').length >= 2
        } ),

        // validate textfield Email
        email: yup.string().required('Please enter your email address.').email('Please enter an valid email.'),

        // validate password field
        password: yup.string().required('Please enter your password.').min(6,'Please enter at least six words.'),

        // validate retypePassword field
        // oneOf -> sẽ là một trong những giá trị định nghĩa trong mảng,
        // ref -> giá trị phải giống như field cần chỉ định. -> nếu không match thì sẽ báo lỗi
        retypePassword: yup.string().required('Please retype password again.').oneOf([yup.ref('password')],'Password does not match.')
      });

    //định nghĩa form
    const form = useForm({
        defaultValues:{
            fullName:'',
            email:'',
            password:'',
            retypePassword:'',
        },
        resolver: yupResolver(schema),
    });

    // Tạo hàm handle submit
    const handleSubmit = async (values)=>{
        const {onSubmit} = props;
        if (onSubmit) {
            onSubmit(values)
        }

        // reset form sau khi submit
        form.reset();
    }


    return (
        
        <div className={classes.root}>
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h6">
                Create An Account
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form}/>
                <InputField name="email" label="Email" form={form}/>
                <PasswordField name="password" label="Password" form={form}/>
                <PasswordField name="retypePassword" label="Retype Password" form={form}/>
                <Button type="submit" className={classes.submit} variant="contained" color="primary" fullWidth> Create an Account</Button>
            </form>
        </div>
    );
}

export default RegisterForm;