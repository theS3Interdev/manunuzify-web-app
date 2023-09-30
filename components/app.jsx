"use client";

import { Header } from "@/components/index";

const App = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>{children}</main>
    </>
  );
};

export default App;
