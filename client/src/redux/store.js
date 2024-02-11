import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import sellerReducer from "./reducers/seller";
import productsReducer from "./reducers/products";
const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productsReducer,
  },
});
export default Store;
