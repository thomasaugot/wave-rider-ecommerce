"use client";

import { useEffect, useState } from "react";
import "../styles/page.scss";
import { getProducts } from "@/services/apiCalls";
import { Carousel } from "@/components/Carousel/Carousel";
import { ShippingInformation } from "@/components/ShippingInformation/ShippingInformation";
import { Product } from "@/types/product";
import { LatestArticles } from "@/components/LatestArticles/LatestArticles";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts: Product[] = await getProducts();
      setProducts(allProducts);
    };

    fetchProducts();
  }, []);

  return (
    <main className="homepage">
      <div className="carousel-container">
        <Carousel />
      </div>
      <section className="shipping-information">
        <ShippingInformation />
      </section>
      <section className="latest-articles">
        <LatestArticles products={products} />
      </section>
    </main>
  );
}
