"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/apiCalls";
import { Product } from "@/types/product";
import { Carousel } from "@/components/Carousel/Carousel";
import { ShippingInformation } from "@/components/ShippingInformation/ShippingInformation";
import { LatestArticles } from "@/components/LatestArticles/LatestArticles";
import Loading from "@/components/Loading/Loading";
import "@/styles/page.scss";
import { Brands } from "@/components/Brands/Brands";
import { Presentation } from "@/components/Presentation/Presentation";

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts: Product[] = await getProducts();
      setProducts(allProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <main className="homepage">
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="intro-container">
            <Carousel />
            <Presentation />
          </section>
          <section className="shipping-information">
            <ShippingInformation />
          </section>
          <section className="latest-articles">
            {products && <LatestArticles products={products} />}
          </section>
          <section className="brands">
            <Brands />
          </section>
        </>
      )}
    </main>
  );
}
