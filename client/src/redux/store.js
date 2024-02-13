import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import sellerReducer from "./reducers/seller";
import productsReducer from "./reducers/products";
import eventReducer from "./reducers/events";
import allProductsReducer from "./reducers/allProducts";
const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productsReducer,
    events: eventReducer,
    allProducts: allProductsReducer,
  },
});
export default Store;
