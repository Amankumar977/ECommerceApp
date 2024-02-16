import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: JSON.parse(localStorage.getItem("wishList")) || [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const wishListId = action.payload._id;
      const existingItemIndex = state.wishList.findIndex(
        (item) => item._id === wishListId
      );
      if (existingItemIndex !== -1) {
        state.wishList[existingItemIndex] = action.payload;
      } else {
        state.wishList.push(action.payload);
      }
      localStorage.setItem("wishList", JSON.stringify(state.wishList));
    },
    removeFromWishList: (state, action) => {
      const itemId = action.payload;
      state.wishList = state.wishList.filter((item) => item._id !== itemId);
      localStorage.setItem("wishList", JSON.stringify(state.wishList));
    },
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
