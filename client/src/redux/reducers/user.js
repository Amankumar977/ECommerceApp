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
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    });
});
