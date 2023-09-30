import { configureStore } from "@reduxjs/toolkit";

import cartSliceReducer from "@/lib/redux/slices/cart-slice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});
