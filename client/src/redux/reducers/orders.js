import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  userOrders: null,
  shopOrders: null,
  isOrderLoading: true,
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
  },
});

export const handleGetUserOrder = (id) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${import.meta.env.VITE_SERVER}/orders/getUserOrder/${id}`,
      { withCredentials: true }
    );
    dispatch(setUserOrders(response.data.orders));
  } catch (error) {
    console.log(error.response.data.message);
  }
};
export const handleGetShopOrder = (id) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${import.meta.env.VITE_SERVER}/orders/getShopOrders/${id}`,
      { withCredentials: true }
    );
    dispatch(setShopOrders(response.data.orders));
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
