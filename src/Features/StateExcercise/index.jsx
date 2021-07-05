import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react'

StateExcercise.propTypes = {

};

function StateExcercise(props) {
    // phím tắt để tạo state nhanh : usesta
    // Phải import userState để sử dụng

    const [color, setColor] = useState('red');
    const [count, setCount] = useState(0);
    return (
        <div>
            <div>
                <span style={{ backgroundColor: "red" }}>{color}</span>
                <button onClick={() => setColor('green')}>change </button>
                <button onClick={() => setColor('yellow')}>change </button>
            </div>
            <div>

                <button onClick={() => setCount(x => x + 1)}>Click to Increase</button>
                {count}
                <button onClick={() => setCount(x => x - 1)}>Click to Decrease</button>
            </div>
        </div>
    );
}

export default StateExcercise;