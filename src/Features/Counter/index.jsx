import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { increase,decrease } from './counterSlice';


CounterFeature.propTypes = {
    
};

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

    return (
        <div>
            {/* chỗ này giống như mapstatetoprops */}
            Counter Features {counter}  
            <div>
                <button onClick={handleOnIncrease}>Increase</button>
                <button onClick={handleOnDecrease}>Decrease</button>
            </div>
        </div>
    );
}

export default CounterFeature;