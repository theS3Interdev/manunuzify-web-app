"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { hideLoading } from "@/lib/redux/slices/cart-slice";

import { AppHeader } from "@/components/index";

const App = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  return (
    <>
      <header>
        <AppHeader />
      </header>

      <main>{children}</main>
    </>
  );
};

export default App;
