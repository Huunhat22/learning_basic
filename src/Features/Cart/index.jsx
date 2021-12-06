import { Box } from '@material-ui/core';
import { Router } from '@material-ui/icons';
import React from 'react';
import { Switch, useRouteMatch } from 'react-router';
import ListCart from './Pages/ListCart';

CartFeatur.propTypes = {

};

function CartFeatur(props) {

    // sử dụng useRouteMath
    const match = useRouteMatch();

    return (
        <Box pt={4}>
            <Switch>
                <Router path={match.url} exact component={ListCart}/>
            </Switch>
        </Box>
    );
}

export default CartFeatur;