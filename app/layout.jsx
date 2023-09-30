import { Analytics } from "@vercel/analytics/react";

import { App } from "@/components/index";

import ThemeProvider from "@/lib/providers/theme-provider";

import "@/app/styles/globals.css";
import "@smastrom/react-rating/style.css";

export const metadata = {
  icons: {
    icon: "/logo.png",
    shortcut: "/logo/png",
  },
  title: "Manunuzify",
  description: "Next.JS shopping cart.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="scroll-smooth font-opensans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <App>
            {children}
            <Analytics />
          </App>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
