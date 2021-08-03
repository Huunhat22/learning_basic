import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import StorageKeys from "constants/storage-keys";

// First, create the thunk -> sử dụng Redux toolkit ThunkApi 
// Bài 97 : export register ra để sử dụng
export const register = createAsyncThunk('user/register',async (payload) => {
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
export const login = createAsyncThunk('user/login',async (payload) => {
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
        //Bài 108: tạo redux state từ local Storage
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        settings: {},
    },
    reducers: {
      // Bài 101: tạo 1 action logout
      logout(state){
        //1 mình phải xóa token và user trên localStorage
        localStorage.removeItem(StorageKeys.TOKEN);
        localStorage.removeItem(StorageKeys.USER);
        //2 set cái current state về rỗng
        state.current = {};
      }
    },
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

const {actions,reducer} = userSlice;
export const {logout} = actions;
export default reducer; // default export