import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './css/style.css';
TodoList.propTypes = {
    todoList: PropTypes.array,
    onItemClick: PropTypes.func
};

TodoList.defaultProps = {
    todoList: [],
    onItemClick: null
};

function TodoList({ todoList, onItemClick }) { // nếu có 1 props thì viết ở trên này luôn, còn nhiều props thì viết bên dưới

    const handleClick = (item, index) => {
        if (!onItemClick) return;
        onItemClick(item, index)

    }

    return (
        <ul className="todo-list">
            {todoList.map((item, index) => (
                <li key={item.id}
                    className={classnames(
                        {
                            'todo-item': true,     // nếu có 1 class mà có dấu gạch thì nên cho dấu nháy vào.
                            completed: item.status === 'completed'
                        })
                    }
                    onClick={() => handleClick(item, index)}
                >
                    {item.title}
                </li>
            ))}
        </ul>
    );
}

export default TodoList;