import React from 'react';
import PropTypes from 'prop-types';
// import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from 'components/form-controls/InputField';
import { Avatar, Button, makeStyles, Typography, LinearProgress } from '@material-ui/core';
import { LockOutlined, } from '@material-ui/icons';
import PasswordField from 'components/form-controls/PasswordField';

const useStyles = makeStyles ((theme) =>({
    root :{
        position:'relative',
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

    progress:{
        position: 'absolute',
        top: theme.spacing(1),
        left: 0,
        right: 0
    }
}))

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm(props) {

    const classes = useStyles();

    // add validation cho các input field
    const schema = yup.object().shape({

        // validate textfield identifier
        identifier: yup.string().required('Please enter your email address.').email('Please enter an valid email.'),

        // validate password field
        password: yup.string().required('Please enter your password.'),
      });

    //định nghĩa form
    const form = useForm({
        defaultValues:{
            identifier:'',
            password:'',
        },
        resolver: yupResolver(schema),
    });

    // Tạo hàm handle submit
    const handleSubmit = async (values)=>{
        const {onSubmit} = props;
        if (onSubmit) {
            //B99: thêm await -> đợi hàm này chạy xong 
           await onSubmit(values)
        }

        // reset form sau khi submit
        // form.reset();
    }

    // Bài : 99 hiển thị loading khi submit form
    const {isSubmitting} = form.formState;

    return (
        
        <div className={classes.root}>
            {/* B99 đang submitting thì show LinearProgress*/}
            {isSubmitting && <LinearProgress  className={classes.progress} />}

            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>

            <Typography className={classes.title} component="h3" variant="h6">
                Sign In
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="identifier" label="Email" form={form}/>
                <PasswordField name="password" label="Password" form={form}/>

                {/* trong lúc submit form thì sẽ disable nút submit */}
                <Button type="submit" disabled={isSubmitting} className={classes.submit} variant="contained" color="primary" fullWidth> Sign In</Button>
            </form>
        </div>
    );
}

export default LoginForm;