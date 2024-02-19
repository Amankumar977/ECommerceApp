import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import sellerReducer from "./reducers/seller";
import productsReducer from "./reducers/products";
import eventReducer from "./reducers/events";
import allProductsReducer from "./reducers/allProducts";
import cartReducer from "../redux/reducers/cart";
import wishListReducer from "./reducers/wishList";
import ordersReducer from "./reducers/orders";
const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productsReducer,
    events: eventReducer,
    allProducts: allProductsReducer,
    cart: cartReducer,
    wishList: wishListReducer,
    orders: ordersReducer,
  },
});
export default Store;
