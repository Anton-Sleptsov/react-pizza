import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addNewItem: (state, action) => {
      const currentItem = state.items.find((item) => item.id === action.payload.id
        && item.type === action.payload.type
        && item.size === action.payload.size);

      if (currentItem) {
        currentItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }

      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
    },
    removeItem: (state, action) => {
      const currentItem = state.items.find((item) => item.id === action.payload.id
        && item.type === action.payload.type
        && item.size === action.payload.size);
      state.items = state.items.filter((item) => item !== currentItem);

      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
    },
    decrementItem: (state, action) => {
      const currentItem = state.items.find((item) => item.id === action.payload.id
        && item.type === action.payload.type
        && item.size === action.payload.size);
      currentItem.count--;

      if (currentItem.count === 0) {
        state.items = state.items.filter((item) => item !== currentItem);
      }

      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
    },
    clearCart: (state) => {
      state.items = initialState.items;
      state.totalCount = initialState.totalCount;
      state.totalPrice = initialState.totalPrice;
    },
  }
});

export const { addNewItem, removeItem, decrementItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;