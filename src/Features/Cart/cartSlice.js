const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,

    // cartItems là mảng các giá trị: productID,product, quantity
    cartItems: [],
  },
  reducers: {
    showMiniCart(state) {
      return (state.showMiniCart = true);
    },

    hideMiniCart(state) {
      return (state.showMiniCart = false);
    },

    addToCard(state, action) {
      // newItem = { id,product, quantity };
      const newItem = action.payload;

      const index = state.cartItems.findIndex((x) => x.id === newItem.id);
      // if already exist item in cart then update quantity
      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity;
      }
      //  add new product to cart
      else {
        state.cartItems.push(newItem);
      }
    },

    removeCardItem(state, action) {
      const idNeedRemove = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.id !== idNeedRemove);
    },

    setQuantityItem(state, action) {
      const { id, quantity } = action.payload;

      // check if product is available in cart
      const index = state.cartItems.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
    },
  },
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCard, removeCardItem, setQuantityItem } = actions; //định nghĩa bằng name export
export default reducer; // default export
