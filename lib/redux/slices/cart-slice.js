import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

/* initialize cart state */
const initialState = Cookies.get("cart")
  ? { ...JSON.parse(Cookies.get("cart")), loading: true }
  : {
      cartItems: [],
      loading: true,
      shippingAddress: {},
      paymentMethod: "",
    };

/* define the cart slice */
const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        state.cartItems = state.cartItems.map((i) =>
          i.id === existingItem.id ? item : i,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      /* calculate price of the items in the shopping cart */
      state.itemsPrice = state.cartItems.reduce(
        (a, c) => a + c.price * c.quantity,
        0,
      );

      /* calculate shipping cost */
      state.shippingCost = state.itemsPrice > 1000 ? 0 : 100;

      /* calculate value added tax */
      state.tax = 0.16 * state.itemsPrice;

      /* calculate total cost */
      state.totalCost = state.itemsPrice + state.shippingCost + state.tax;

      /* save cart to cookie */
      Cookies.set("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);

      /* calculate price of the items in the shopping cart */
      state.itemsPrice = state.cartItems.reduce(
        (a, c) => a + c.price * c.quantity,
        0,
      );

      /* calculate shipping cost */
      state.shippingCost = state.itemsPrice > 600 ? 0 : 100;

      /* calculate value added tax */
      state.tax = 0.16 * state.itemsPrice;

      /* calculate total cost */
      state.totalCost = state.itemsPrice + state.shippingCost + state.tax;

      /* save cart to cookie */
      Cookies.set("cart", JSON.stringify(state));
    },

    saveShippingAddress: (state, action) => {
      /* capture shipping address entry */
      state.shippingAddress = action.payload;

      /* save cart to cookie */
      Cookies.set("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      /* capture payment method entry */
      state.paymentMethod = action.payload;

      /* save cart to cookie */
      Cookies.set("cart", JSON.stringify(state));
    },

    hideLoading: (state) => {
      state.loading = false;
    },
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
