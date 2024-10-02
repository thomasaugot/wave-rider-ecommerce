import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import StoreProvider from "./StoreProvider";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AppLoader } from "@/components/AppLoader/AppLoader";
import * as dotenv from "dotenv";

import "@/styles/globals.scss";

dotenv.config();

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
