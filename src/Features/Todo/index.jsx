// sử dụng snippet => rsfp để tạo cho nhanh
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
// import PropTypes from 'prop-types';
import ListPage from './pages/ListPage';


TodoFeature.propTypes = {

};


function TodoFeature(props) {
    // thay đổi code lại , sử dụng Nested Routing

    // sử dụng userRouteMatch là cách match path của cha cho các con.
    // thằng cha đang sài path nào thì con xài path đó. không bị cố định
    const match = useRouteMatch();
    return (

        <div>
            <Switch>
                <Route path={match.path} component={ListPage} />
                <Route path={`${match.path}/:todoID`} component={DetailPage} />
            </Switch>

        </div>
    );
}

export default TodoFeature;