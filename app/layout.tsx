import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";

import StoreProvider from "./StoreProvider";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AppLoader } from "@/components/AppLoader/AppLoader";
import "@/styles/globals.scss";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wave Rider | Surf Shop",
  description: "Your online surf shop",
  keywords: ["Next.js", "React", "JavaScript", "SCSS", "Redux", "e-commerce"],
  generator: "Next.js",
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, viewport-fit=cover, width=device-width"
        />
        <meta name="pwa-demo" content="pwa-demo" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="pwa-demo" />
        <meta name="description" content="pwa-demo" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
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
