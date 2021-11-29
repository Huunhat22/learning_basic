const {createSlice} = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name : 'cart',
    initialState : {
        showMiniCart: false,

        // cartItems là mảng các giá trị: productID,product, quantity
        cartItems:[],
    },
    reducers:{
        showMiniCart(state){
            return state.showMiniCart= true;
        },

        hideMiniCart(state){
            return state.showMiniCart = false;
        },
    },
});

const {actions,reducer} = cartSlice;
export const {showMiniCart,hideMiniCart} = actions; //định nghĩa bằng name export
export default reducer; // default export