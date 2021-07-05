// sử dụng snippet => rsfp để tạo cho nhanh
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import TodoList from '../../components/TodoList';


ListPage.propTypes = {

};

function ListPage(props) {

    const inittodoList = [
        {
            id: 1,
            title: 'eat',
            status: 'new'
        },
        {
            id: 2,
            title: 'code',
            status: 'completed'
        },
        {
            id: 3,
            title: 'sleep',
            status: 'new'
        },
    ];

    const [todoList, setTodoList] = useState(inittodoList);
    const [filteredStatus, SetfilteredStatus] = useState('all');

    const handleTodoClick = (todo, index) => {
        // console.log(todo, index);

        //Toggle status => nên clone ra 1 mảng hay object mới
        const newTodoList = [...todoList];

        //setState cho item đó
        newTodoList[index] = {
            ...newTodoList[index],
            status: newTodoList[index].status === 'new' ? 'completed' : 'new'
        };

        setTodoList(newTodoList);
    }

    // filter
    const handleShowAllStatus = () => {
        SetfilteredStatus('all')
    }

    const handleShowAllNew = () => {
        SetfilteredStatus('new')
    }

    const handleShowAllComplete = () => {
        SetfilteredStatus('completed')
    }

    // tạo 1 hằng số sẽ là state sau khi đã được filter
    const renderedTodoList = todoList.filter(todo => filteredStatus === 'all' || filteredStatus === todo.status);

    return (

        <div>
            <TodoList todoList={renderedTodoList} onItemClick={handleTodoClick} />
            <div>
                <button onClick={handleShowAllStatus}>Show All Status</button>
                <button onClick={handleShowAllNew}>Show All New</button>
                <button onClick={handleShowAllComplete}>Show All Completed</button>
            </div>
        </div>
    );
}

export default ListPage;