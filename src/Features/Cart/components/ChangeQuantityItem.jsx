import React from 'react';
import PropTypes from 'prop-types';
import QuantityField from 'components/form-controls/QuantityField';
import { useForm } from 'react-hook-form';

ChangeQuantityItem.propTypes = {
    onSubmit:PropTypes.func,
    quantity: PropTypes.number,
};

function ChangeQuantityItem(props) {

    const {quantity,onSubmit=null} = props;

    const form = useForm({
        defaultValues:{
            quantity: Number.parseInt(quantity),
        }
        
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