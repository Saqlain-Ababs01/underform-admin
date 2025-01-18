import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchFilterProducts } from "./ProductListAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchAllFilterProductsAsync = createAsyncThunk(
  "products/fetchFilterProducts",
  async ({ filter, sort, pagination }) => {
    console.log("sort fetch:", sort);
    const response = await fetchFilterProducts(filter, sort, pagination);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchAllFilterProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllFilterProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export const { increment } = productsSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export default productsSlice.reducer;
