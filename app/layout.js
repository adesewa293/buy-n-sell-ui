"use client";

import { CartContextProvider } from "@/components/CartContext";
import { Roboto, Poppins } from "next/font/google";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body{
  background-color: #eee;
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

`;

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GlobalStyles />
      <CartContextProvider>
        <body className={roboto.className}>{children}</body>
      </CartContextProvider>
    </html>
  );
}
