import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isSelLoading: true,
  isSellerAuthenticated: false,
  seller: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setIsSelLoading: (state, action) => {
      state.isSelLoading = action.payload;
    },
    setIsSellerAuthenticated: (state, action) => {
      state.isSellerAuthenticated = action.payload;
    },
    setSeller: (state, action) => {
      state.seller = action.payload;
    },
  },
});

export const fetchShop = () => async (dispatch) => {
  dispatch(setIsSelLoading(true));
  try {
    let response = await axios.get(
      `${import.meta.env.VITE_SERVER}/shop/getShop`,
      {
        withCredentials: true,
      }
    );
    dispatch(setIsSelLoading(false));
    dispatch(setSeller(response.data));
    dispatch(setIsSellerAuthenticated(true));
  } catch (error) {
    dispatch(setIsSelLoading(false));
    console.log(error.message);
    dispatch(setIsSellerAuthenticated(false));
  }
};
// Export the action creators and reducer separately
export const { setIsSelLoading, setIsSellerAuthenticated, setSeller } =
  sellerSlice.actions;
export default sellerSlice.reducer;
