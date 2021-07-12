import counterReducer from '../Features/Counter/counterSlice';
const {configureStore} = require('@reduxjs/toolkit');

const rootReducer = {
    // noi nay se chua tat ca reducer dang co
    counter : counterReducer,
}

const store = configureStore({
    reducer : rootReducer,
});

export default store;