import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import StorageKeys from "constants/storage-keys";

// First, create the thunk -> sử dụng Redux toolkit ThunkApi 
// Bài 97 : export register ra để sử dụng
export const register = createAsyncThunk('users/register',async (payload) => {
        const data = await userApi.register(payload); 
      // call api to register

      // save data to localStorage
      // Bài 107: thay đổi access_token và user bằng hằng số đã được định nghĩa
        localStorage.setItem(StorageKeys.TOKEN, data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

      return data.user;
    }
  )

  // Bài 105: setup cho chức năng login 
export const login = createAsyncThunk('users/login',async (payload) => {
        const data = await userApi.login(payload); 
      // call api to register

      // save data to localStorage
      // Bài 107: thay đổi access_token và user bằng hằng số đã được định nghĩa
        localStorage.setItem(StorageKeys.TOKEN, data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

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
        },

        // Bài 104: setup cho login
        [login.fullfilled] : (state, action)=>{
            state.current = action.payload;
        },
    }

});

const {reducer} = userSlice;
 
export default reducer; // default export