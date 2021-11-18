import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCardForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCardForm({onSubmit = null}) {
    // Bài 148: add validation by Yub for input
    const schema = yup.object().shape({
        // validate textfield identifier
        quantity: yup.number().required('Please enter quantity.').min(1,'Minmun is one').typeError('Please enter a number'),
      });

    //định nghĩa form
    const form = useForm({
        defaultValues:{
            quantity:1,
        },
        resolver: yupResolver(schema),
    });

    // Tạo hàm handle submit
    const handleSubmit = async (values)=>{
        if (onSubmit) {
            //B99: thêm await -> đợi hàm này chạy xong 
           await onSubmit(values)
        }

        // reset form sau khi submit
        // form.reset();
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <QuantityField name="quantity" label="Quantity" form={form} />
            <Button type="submit" variant="contained" color="primary" style={{width:'250px'}} width="small" > Chọn Mua</Button>
        </form>
    );
}

export default AddToCardForm;