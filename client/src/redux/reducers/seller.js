import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isSelLoading: false,
  isSellerAuthenticated: false,
  seller: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setSeller: (state, action) => {
      state.seller = action.payload;
    },
    setLoading: (state, action) => {
      state.isSelLoading = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isSellerAuthenticated = action.payload;
    },
  },
});

export const fetchShop = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER}/shop/getShop`,
      {
        withCredentials: true,
      }
    );
    dispatch(setSeller(response.data));
    dispatch(setAuthenticated(true));
  } catch (error) {
    console.error("Error fetching shop:", error.message);
    dispatch(setAuthenticated(false));
  } finally {
    dispatch(setLoading(false));
  }
};

export const { setSeller, setLoading, setAuthenticated } = sellerSlice.actions;

export default sellerSlice.reducer;
