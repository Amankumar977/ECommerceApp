import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.isAuthenticated = false; // Set isAuthenticated to false when the API call fails
      state.loading = false;
      state.user = null; // Reset the user information
      state.error = action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    });
});
