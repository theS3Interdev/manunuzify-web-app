"use client";

import { Provider } from "react-redux";

import { store } from "@/lib/redux/store";

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
