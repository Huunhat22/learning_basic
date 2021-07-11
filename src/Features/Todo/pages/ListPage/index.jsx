// sử dụng snippet => rsfp để tạo cho nhanh
import querString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoForm from '../../components/TodoForm';

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

    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();

    const [todoList, setTodoList] = useState(inittodoList);

    /*  Bài 49 : Sync filters to URL params
        Để lấy được filter param thì phải có thông tin của location, window.location.sreach trong console log
        trong location có sreach => mình sẽ parse object param nó ra
    */
    const [filteredStatus, SetfilteredStatus] = useState(() => {
        const params = querString.parse(location.search);
        // console.log(params);
        return params.status || 'all';
    });


    /*  Bài 50: Sync state to URL
        tạo ra 1 useEffect(), và truyền cho nó 1 tham số(Dependence)
        mỗi khi location thay đổi thì mình phải cập nhật lại State bằng cái [location.sreach]
    */
    useEffect(() => {
        const params = querString.parse(location.search);
        SetfilteredStatus(params.status || 'all');
    }, [location.search]);

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

    /*  Bài 50 : Sync state to URL
        Update url param
        Listen to location sreach
        --> khi location thay đổi thì sẽ update State 
        sau đó mình sẽ tạo 1 useEffect() --> nó sẽ giúp mình listen lên location sreach
    */
    const handleShowAllStatus = () => {
        // SetfilteredStatus('all')
        /* 
            mỗi khi click thì sẽ tạo ra 1 queryParams mới
            sau đó dùng history sẽ push 1 object 2 tham số, gồm pathName hiện tại, và
        */
        const queryParams = { status: 'all' };
        history.push({
            pathname: match.path,
            search: querString.stringify(queryParams),
        });

    }

    const handleShowAllNew = () => {
        // SetfilteredStatus('new')
        const queryParams = { status: 'new' };
        history.push({
            pathname: match.path,
            search: querString.stringify(queryParams),
        });
    }

    const handleShowAllComplete = () => {
        // SetfilteredStatus('completed')
        const queryParams = { status: 'completed' };
        history.push({
            pathname: match.path,
            search: querString.stringify(queryParams),
        });
    }

    // tạo 1 hằng số sẽ là state sau khi đã được filter
    const renderedTodoList = todoList.filter(todo => filteredStatus === 'all' || filteredStatus === todo.status);

    // Bai : 63 Cai dat todoform
    const handleTodoFormSubmit = (values) =>{
        //console.log('Form submit : ', values);
        // tạo ra 1 todo giả định có vaule nhập vào từ input
        const newTodo = {
            id: todoList.length +1,
            title: values.title,
            status : 'new',            
        }

        const newTodoList = [...todoList,newTodo];
        setTodoList(newTodoList);

    };

    return (

        <div>
            <h3>Todo Form</h3>
            <TodoForm onSubmit={handleTodoFormSubmit}/>
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