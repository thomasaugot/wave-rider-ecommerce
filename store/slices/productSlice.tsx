import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "@/services/apiCalls";
import { RootState } from "../store";
import { ProductState } from "@/types";

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const data = await getProducts();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.toString()
          : "Failed to fetch products.";
      });
  },
});

export const { setSelectedProduct } = productSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;
export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedProduct;

export default productSlice.reducer;
