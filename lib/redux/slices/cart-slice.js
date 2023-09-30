import { createSlice } from "@reduxjs/toolkit";

/* initialize cart state */
const initialState = {
  cartItems: [],
};

/* define the cart slice */
const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {},

    removeFromCart: (state, action) => {},

    saveShippingAddress: (state, action) => {},

    savePaymentMethod: (state, action) => {},

    hideLoading: (state) => {},
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  hideLoading,
} = cartSlice.actions;

export default cartSlice.reducer;
