import React from 'react';
import PropTypes from 'prop-types';
import QuantityField from 'components/form-controls/QuantityField';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

ChangeQuantityItem.propTypes = {
    onSubmit:PropTypes.func,
    quantity: PropTypes.number,
};

function ChangeQuantityItem(props) {

    const {quantity,onSubmit=null} = props;

    // validation cho quantity
    const schema = yup.object().shape({
        quantity: yup.number().required('Please enter quantity').min(1,'quantity at least 1').max(10,'quantity maximun 10').typeError('Please enter a number'),
    });

    const form = useForm({
        defaultValues:{
            quantity: Number.parseInt(quantity),
        },
        resolver: yupResolver(schema),
        
    }) 

    const handleSubmit =  async (values)=>{
        if (onSubmit) {
            //B99: thêm await -> đợi hàm này chạy xong 
           await onSubmit(values)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <QuantityField name="quantity" form={form} ></QuantityField>
        </form>
    );
}

export default ChangeQuantityItem;