"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/apiCalls";
import { Product } from "@/types/product";
import { Carousel } from "@/components/Carousel/Carousel";
import { ShippingInformation } from "@/components/ShippingInformation/ShippingInformation";
import { LatestArticles } from "@/components/LatestArticles/LatestArticles";
import "@/styles/page.scss";
import { Brands } from "@/components/Brands/Brands";
import { ClientsOpinions } from "@/components/ClientsOpinions/ClientsOpinions";
import { Separator } from "@/components/Separator/Separator";
import emailjs from "@emailjs/browser";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { CategoriesBentoGrid } from "@/components/CategoriesBentoGrid/CategoriesBentoGrid";
import { GoogleMapComponent } from "@/components/GoogleMap/GoogleMap";
import { FullPresentation } from "@/components/FullPresentation/FullPresentation";
import { Introdution } from "@/components/Introdution/Introdution";

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const emailJSPublicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts: Product[] = await getProducts();
      setProducts(allProducts);
    };

    fetchProducts();

    emailJSPublicKey && emailjs.init(emailJSPublicKey);
  }, []);

  return (
    <main className="homepage">
      <section className="intro-container">
        <Carousel />
        <Introdution />
      </section>
      <Separator />
      <section className="shipping-information">
        <ShippingInformation />
      </section>
      <section className="latest-articles">
        {products && <LatestArticles products={products} />}
      </section>
      <section className="categories">
        <CategoriesBentoGrid />
      </section>
      <section className="brands">
        <Brands />
      </section>
      <Separator />
      <section className="clients-opinions">
        <ClientsOpinions />
      </section>
      <section className="company-presentation">
        <FullPresentation />
      </section>
      <section className="contact">
        <h2>A team of passionate, Drop us a Message!</h2>
        <ContactForm />
      </section>
      <section className="location">
        <GoogleMapComponent />
      </section>
    </main>
  );
}
