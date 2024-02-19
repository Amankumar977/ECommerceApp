import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  userOrders: null,
  shopOrders: null,
  isOrderLoading: true,
  orderCreated: false,
};
let orderReducer = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setUserOrders: (state, action) => {
      state.userOrders = action.payload;
    },
    setShopOrders: (state, action) => {
      state.shopOrders = action.payload;
    },
    setIsOrderLoading: (state, action) => {
      state.isOrderLoading = action.payload;
    },
    setOrderCreated: (state, action) => {
      state.orderCreated = action.payload;
    },
  },
});

export const handleCreateOrder = (orderDetails) => async (dispatch) => {
  try {
    await axios
      .post(`${import.meta.env.VITE_SERVER}/orders/createOrder`, orderDetails)
      .then((response) => {
        console.log(response.data.message);
        dispatch(setOrderCreated(true));
      });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const {
  setIsOrderLoading,
  setShopOrders,
  setUserOrders,
  setOrderCreated,
} = orderReducer.actions;
export default orderReducer.reducer;
