import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  adminDataLoading: true,
  allOrders: null,
  allShops: null,
  allCustomers: null,
  allEvents: null,
  allProducts: null,
  allCoupons: null,
  todayOrders: null,
  weekOrders: null,
  monthOrders: null,
  todayCreatedProducts: null,
  weekCreatedProducts: null,
  monthCreatedProducts: null,
  todayCustomers: null,
  weekCustomers: null,
  monthCustomers: null,
};

const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminDataLoading: (state, action) => {
      state.adminDataLoading = action.payload;
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
    setTodayOrder: (state, action) => {
      state.todayOrders = action.payload;
    },
    setMonthOrders: (state, action) => {
      state.monthOrders = action.payload;
    },
    setWeekOrders: (state, action) => {
      state.weekOrders = action.payload;
    },
    setTodayCreatedProducts: (state, action) => {
      state.todayCreatedProducts = action.payload;
    },
    setMonthCreatedProducts: (state, action) => {
      state.monthCreatedProducts = action.payload;
    },
    setWeekCreatedProducts: (state, action) => {
      state.weekCreatedProducts = action.payload;
    },
    setTodayCustomers: (state, action) => {
      state.todayCustomers = action.payload;
    },
    setWeekCustomers: (state, action) => {
      state.weekCustomers = action.payload;
    },
    setMonthCustomers: (state, action) => {
      state.monthCustomers = action.payload;
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

    const todayDate = new Date();
    const todayOrders = allData.allOrders.filter((order) =>
      isToday(new Date(order.createdAt), todayDate)
    );
    dispatch(setTodayOrder(todayOrders));

    const monthOrders = allData.allOrders.filter((order) =>
      isSameMonth(new Date(order.createdAt), todayDate)
    );
    dispatch(setMonthOrders(monthOrders));

    const weekOrders = allData.allOrders.filter((order) =>
      isSameWeek(new Date(order.createdAt), todayDate)
    );
    dispatch(setWeekOrders(weekOrders));

    const todayCreatedProducts = allData.allProducts.filter((product) =>
      isToday(new Date(product.createdAt), todayDate)
    );
    dispatch(setTodayCreatedProducts(todayCreatedProducts));

    const monthCreatedProducts = allData.allProducts.filter((product) =>
      isSameMonth(new Date(product.createdAt), todayDate)
    );
    dispatch(setMonthCreatedProducts(monthCreatedProducts));

    const weekCreatedProducts = allData.allProducts.filter((product) =>
      isSameWeek(new Date(product.createdAt), todayDate)
    );
    dispatch(setWeekCreatedProducts(weekCreatedProducts));

    const todayCustomers = allData.allCustomers.filter((customer) =>
      isToday(new Date(customer.createdAt), todayDate)
    );
    dispatch(setTodayCustomers(todayCustomers));

    const monthCustomers = allData.allCustomers.filter((customer) =>
      isSameMonth(new Date(customer.createdAt), todayDate)
    );
    dispatch(setMonthCustomers(monthCustomers));

    const weekCustomers = allData.allCustomers.filter((customer) =>
      isSameWeek(new Date(customer.createdAt), todayDate)
    );
    dispatch(setWeekCustomers(weekCustomers));
  } catch (error) {
    console.log("Error fetching data:", error.message);
  } finally {
    dispatch(setAdminDataLoading(false));
  }
};

const isToday = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const isSameMonth = (date1, date2) => {
  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const isSameWeek = (date1, date2) => {
  const firstDayOfWeek = new Date(date2);
  firstDayOfWeek.setDate(
    date2.getDate() - date2.getDay() + (date2.getDay() === 0 ? -6 : 1)
  );
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  return date1 >= firstDayOfWeek && date1 <= lastDayOfWeek;
};

export const {
  setAllCoupons,
  setAllCustomers,
  setAllEvents,
  setAllOrders,
  setAllShops,
  setAdminDataLoading,
  setAllProducts,
  setTodayOrder,
  setMonthOrders,
  setWeekOrders,
  setTodayCreatedProducts,
  setMonthCreatedProducts,
  setWeekCreatedProducts,
  setMonthCustomers,
  setTodayCustomers,
  setWeekCustomers,
} = adminReducer.actions;

export default adminReducer.reducer;
