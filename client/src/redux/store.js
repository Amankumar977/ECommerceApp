import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import sellerReducer from "./reducers/seller";
import productsReducer from "./reducers/products";
import eventReducer from "./reducers/events";
const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productsReducer,
    events: eventReducer,
  },
});
export default Store;
