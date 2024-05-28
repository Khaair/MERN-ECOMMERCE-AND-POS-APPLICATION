import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.items.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + 1; // Ensure quantity exists and add 1
      } else {
        const newItem = { ...action.payload, quantity: 1 }; // Initialize quantity to 1
        state?.items?.push(newItem);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearCart: state => {
      state.items = [];
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = (item.quantity || 0) + 1; // Ensure quantity exists and add 1
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1; // Ensure quantity is greater than 1 before decrementing
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
