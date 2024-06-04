"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/apiCalls";
import { Product } from "@/types/product";
import { Carousel } from "@/components/Carousel/Carousel";
import { ShippingInformation } from "@/components/ShippingInformation/ShippingInformation";
import { LatestArticles } from "@/components/LatestArticles/LatestArticles";
import "@/styles/page.scss";
import { Brands } from "@/components/Brands/Brands";
import { Presentation } from "@/components/Presentation/Presentation";
import { ClientsOpinions } from "@/components/ClientsOpinions/ClientsOpinions";
import { Separator } from "@/components/Separator/Separator";
import emailjs from "@emailjs/browser";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import Image from "next/image";
import surfBoardsRack from "@/public/assets/img/surfboards-rack.webp";
import { CategoriesBentoGrid } from "@/components/CategoriesBentoGrid/CategoriesBentoGrid";
import { GoogleMapComponent } from "@/components/GoogleMap/GoogleMap";

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
        <Presentation />
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
      <section className="contact">
        <div className="contact_form-container">
          <ContactForm />
        </div>
        <div className="contact_illustration-container">
          <Image src={surfBoardsRack} alt="Photo of a kite-surfer" />
        </div>
      </section>
      <section className="location">
        <GoogleMapComponent />
      </section>
    </main>
  );
}
