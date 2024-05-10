"use client";

import { useEffect } from "react";
import "../styles/page.scss";
import { getProducts } from "@/services/apiCalls";
import Carousel from "@/components/Carousel/Carousel";
import ShippingInformation from "@/components/ShippingInformation/ShippingInformation";

export default function Home() {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="homepage">
      <div className="carousel-container">
        <Carousel />
      </div>
      <ShippingInformation />
      <section className="latest-articles"></section>
    </main>
  );
}
