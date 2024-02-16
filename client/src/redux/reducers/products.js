import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  isProductLoading: true,
  products: null,
  message: null,
  deleteErrorMessage: null,
};
let productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setIsProductLoading: (state, action) => {
      state.isProductLoading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setDeleteErrorMessage: (state, action) => {
      state.deleteErrorMessage = action.payload;
    },
  },
});
export let getAllProductsShop = (id) => async (dispatch) => {
  dispatch(setIsProductLoading(true));
  try {
    await axios
      .get(`${import.meta.env.VITE_SERVER}/products/getAllShopProducts/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setProducts(res.data.products));
      })
      .catch((error) => {
        dispatch(setDeleteErrorMessage(error.response.data.message));
      })
      .finally(() => {
        dispatch(setIsProductLoading(false));
      });
  } catch (error) {
    console.log(error.message);
  }
};
export let handledeleteProduct = (id) => async (dispatch) => {
  dispatch(setIsProductLoading(true));
  try {
    await axios
      .delete(`${import.meta.env.VITE_SERVER}/products/deleteProduct/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setMessage(res.data.message));
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        dispatch(setIsProductLoading(false));
      });
  } catch (error) {
    console.log(error.message);
  }
};
export const {
  setIsProductLoading,
  setProducts,
  setMessage,
  setDeleteErrorMessage,
} = productSlice.actions;
export default productSlice.reducer;
