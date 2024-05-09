"use client";

import { useEffect } from "react";
import "../styles/page.scss";
import { getProducts } from "@/services/apiCalls";
import { Carousel } from "@/components/Carousel/Carousel";

export default function Home() {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="homepage">
      <Carousel />
    </main>
  );
}
