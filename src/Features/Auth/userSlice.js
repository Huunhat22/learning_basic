import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";

// First, create the thunk -> sử dụng Redux toolkit ThunkApi 
const register = createAsyncThunk('users/register',async (payload) => {
        const data = await userApi.register(payload); 
      // call api to register

      // save data to localStorage
        localStorage.setItem('access_token', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));

      return data.user;
    }
  )

const userSlice = createSlice({
    name : 'user',
    initialState : {
        current: {},
        settings: {},
    },
    reducers: {},
    extraReducers: {
        // action type mình tự định nghĩa
        // ý nghĩa của dòng bên dưới : user/register/fullfilled
        [register.fullfilled] : (state, action)=>{
            state.current = action.payload;
        }
    }

});

const {reducer} = userSlice;
 
export default reducer; // default export