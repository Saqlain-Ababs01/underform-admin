import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/ProductList/ProductListSlice";

export const store = configureStore({
  reducer: {
    product: productsReducer,
  },
});
