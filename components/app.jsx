"use client";

import { AppHeader } from "@/components/index";

const App = ({ children }) => {
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
