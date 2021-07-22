import counterReducer from '../Features/Counter/counterSlice';
import userReducer from '../Features/Auth/userSlice';
const {configureStore} = require('@reduxjs/toolkit');

const rootReducer = {
    // noi nay se chua tat ca reducer dang co
    counter : counterReducer,
    user: userReducer,
}

const store = configureStore({
    reducer : rootReducer,
});

export default store;