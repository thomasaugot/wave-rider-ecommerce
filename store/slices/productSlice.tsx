import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductsAPI,
  addProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "@/services/apiCalls";
import { RootState } from "../store";
import { Product, ProductState } from "@/types";

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const data = await getProductsAPI();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProductThunk = createAsyncThunk(
  "products/addProduct",
  async (productData: Product, thunkAPI) => {
    try {
      const data = await addProductAPI(productData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editProductThunk = createAsyncThunk(
  "products/editProduct",
  async (productData: { [key: string]: any }, thunkAPI) => {
    try {
      const data = await updateProductAPI(productData.id, productData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string, thunkAPI) => {
    try {
      await deleteProductAPI(productId);
      return productId;
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
      })
      .addCase(addProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductThunk.fulfilled, (state, action: any) => {
        state.loading = false;

        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.products.push(action.payload[0]);
        } else if (action.payload && typeof action.payload === "object") {
          state.products.push(action.payload);
        } else {
          console.error("Unexpected payload format:", action.payload);
        }
      })

      .addCase(addProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.toString()
          : "Failed to add product.";
      })
      .addCase(editProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(editProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.toString()
          : "Failed to edit product.";
      })
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.toString()
          : "Failed to delete product.";
      });
  },
});

export const { setSelectedProduct } = productSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;
export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedProduct;
export const selectLoading = (state: RootState) => state.products.loading;

export default productSlice.reducer;
