import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

function TodoForm(props) {

    const schema = yup.object().shape({
        title: yup.string()
        .required('Please inter Title')
        .min(5,'Title is too short'),
      });

    //định nghĩa form
    const form = useForm({
        defaultValues:{
            title:'',
        },
        resolver: yupResolver(schema),
    });

    // Tạo hàm handle submit
    const handleSubmit = (values)=>{
        console.log('Todo Form : ', values);
        const {onSubmit} = props;
        if (onSubmit) {
            onSubmit(values)
        }

        // reset form sau khi submit
        form.reset();
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="title" label="Todo" form={form}/>
        </form>
    );
}

export default TodoForm;