import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "@/types";
import { RootState } from "../store";

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const { id, price, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalAmount += price * quantity;
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    incrementItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
        state.totalAmount += existingItem.price;
      }
    },
    decrementItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        state.totalAmount -= existingItem.price;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalAmount -= existingItem ? existingItem.price : 0;
      }
    },
    setCart: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
    updateCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
  setCart,
  updateCart,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
