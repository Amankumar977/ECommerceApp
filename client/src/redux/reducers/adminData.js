import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  adminDataloading: true,
  allOrders: null,
  allShops: null,
  allCustomers: null,
  allEvents: null,
  allProducts: null,
  allCoupons: null,
};
let adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminDataLoading: (state, action) => {
      state.adminDataloading = action.payload;
    },
    setAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
    setAllShops: (state, action) => {
      state.allShops = action.payload;
    },
    setAllCustomers: (state, action) => {
      state.allCustomers = action.payload;
    },
    setAllEvents: (state, action) => {
      state.allEvents = action.payload;
    },
    setAllCoupons: (state, action) => {
      state.allCoupons = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  withCredentials: true,
});
export const getAllData = (id) => async (dispatch) => {
  dispatch(setAdminDataLoading(true));
  try {
    let response = await api.get(`/admin/getAllAdminData/${id}`);
    const { allData } = response.data;
    dispatch(setAllCoupons(allData.allCoupons));
    dispatch(setAllCustomers(allData.allCustomers));
    dispatch(setAllEvents(allData.allEvents));
    dispatch(setAllOrders(allData.allOrders));
    dispatch(setAllShops(allData.allShops));
    dispatch(setAllProducts(allData.allProducts));
  } catch (error) {
    console.error("Error fetching data:", error.response.data.message);
  } finally {
    dispatch(setAdminDataLoading(false));
  }
};
export const {
  setAllCoupons,
  setAllCustomers,
  setAllEvents,
  setAllOrders,
  setAllShops,
  setAdminDataLoading,
  setAllProducts,
} = adminReducer.actions;
export default adminReducer;
