import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import { Navbar } from "@/components/Navbar/Navbar";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wave Riders | Surf Shop",
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
