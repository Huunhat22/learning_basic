import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { increase,decrease } from './counterSlice';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

CounterFeature.propTypes = {
    
};

// Bài 82: sử dụng material UI
const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 38,
      padding: '0 30px',
      marginRight:'15px'
    },
  });

function CounterFeature(props) {
    // lấy state từ trong redux ra -> render lên đây
    const counter = useSelector(state => state.counter)

    // để dispatch một action thì sử dụng 1 hook useDispatch()
    const dispatch = useDispatch(); 

    const handleOnIncrease = () =>{
        const action = increase();  // action creator
        dispatch(action);
    };

    const handleOnDecrease = () =>{
        const action = decrease();  // action creator
        dispatch(action);
    };

    // tạo 1 hook để sử dụng
    const classes = useStyles();

    return (
        <div>
            {/* chỗ này giống như mapstatetoprops */}
            Counter Features {counter}  
            <div>
                <Button className={classes.root} onClick={handleOnIncrease}>Increase</Button>
                <Button className={classes.root} onClick={handleOnDecrease}>Decrease</Button>
            </div>
        </div>
    );
}

export default CounterFeature;