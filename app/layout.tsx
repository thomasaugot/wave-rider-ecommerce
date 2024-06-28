import React from "react";
import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AppLoader } from "@/components/AppLoader/AppLoader";
import "@/styles/globals.scss";
import { ProductProvider } from "@/context/productContext";
import { CartProvider } from "@/context/cartContext";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wave Rider | Surf Shop",
  description: "Your online surf shop",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "SCSS",
    "Redux",
    "e-commerce",
    "Thomas Augot",
  ],
  generator: "Next.js",
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
  authors: [
    {
      name: "Thomas Augot",
      url: "https://thomasaugot.com/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    { rel: "shortcut icon", url: "/favicon.ico" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
  appleWebApp: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta
          name="theme-color"
          content="#fff"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body>
        <StoreProvider>
          <CartProvider>
            <ProductProvider>
              <AppLoader>
                <Navbar />
                {children}
                <Footer />
              </AppLoader>
            </ProductProvider>
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
