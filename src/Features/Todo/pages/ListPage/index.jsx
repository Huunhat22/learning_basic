// sử dụng snippet => rsfp để tạo cho nhanh
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
import TodoList from '../../components/TodoList';
import querString from 'query-string';

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

    const location = useLocation();
    const [todoList, setTodoList] = useState(inittodoList);

    // Bài 49 : Sync filters to URL params
    const [filteredStatus, SetfilteredStatus] = useState(() => {
        // để lấy được filter param thì phải có thông tin của location, trong location có sreach => mình sẽ parse object param nó ra
        const params = querString.parse(location.search);
        // console.log(params);
        return params.status || 'all';
    });

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