import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};
const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const doesItemExist =
        state.cart && state.cart.find((i) => i._id === item._id);
      if (doesItemExist) {
        state.cart = state.cart.map((i) =>
          i._id === doesItemExist._id ? item : i
        );
      } else {
        state.cart.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item._id !== productId);
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    changeQuantity: (state, action) => {
      const { productId, changeBy } = action.payload;
      const itemToChange = state.cart.find((item) => item._id === productId);
      if (itemToChange) {
        itemToChange.quantity += changeBy;
        if (itemToChange.quantity <= 1) {
          itemToChange.quantity = 1;
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
  },
});
export const { addToCart, removeFromCart, changeQuantity } = cart.actions;
export default cart.reducer;
