import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";

import StoreProvider from "./StoreProvider";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AppLoader } from "@/components/AppLoader/AppLoader";
import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wave Rider | Surf Shop",
  description: "Your online surf shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AppLoader>
            <Navbar />
            {children}
            <Footer />
          </AppLoader>
        </StoreProvider>
      </body>
    </html>
  );
}
