import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  isProductLoading: true,
  allProducts: null,
  errorMessage: null,
};
let allProducts = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    setIsProductLoading: (state, action) => {
      state.isProductLoading = action.payload;
    },
    setAllProduct: (state, action) => {
      state.allProducts = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export let getAllProducts = () => async (dispatch) => {
  dispatch(setIsProductLoading(true));
  try {
    let response = await axios.get(
      `${import.meta.env.VITE_SERVER}/user/getAllProducts`
    );
    dispatch(setAllProduct(response.data.allProducts));
  } catch (error) {
    dispatch(setErrorMessage(error.response.data.message));
  } finally {
    dispatch(setIsProductLoading(false));
  }
};

export const { setAllProduct, setIsProductLoading, setErrorMessage } =
  allProducts.actions;
export default allProducts.reducer;
