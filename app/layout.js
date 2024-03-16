"use client"

import { Roboto } from "next/font/google";
import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`
body{
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

`;



const roboto = Roboto({ subsets: ["latin"], weight: "400"});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GlobalStyles />
      <body className={roboto.className}>{children}</body>
    </html>
  );
}