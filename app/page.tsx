"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProductsThunk } from "@/store/slices/productSlice";
import { useSelector } from "react-redux";
import { selectProducts } from "@/store/slices/productSlice";
import { Carousel } from "@/components/Carousel/Carousel";
import { ShippingInformation } from "@/components/ShippingInformation/ShippingInformation";
import { LatestArticles } from "@/components/LatestArticles/LatestArticles";
import { Brands } from "@/components/Brands/Brands";
import { ClientsOpinions } from "@/components/ClientsOpinions/ClientsOpinions";
import { Separator } from "@/components/Separator/Separator";
import emailjs from "@emailjs/browser";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { CategoriesBentoGrid } from "@/components/CategoriesBentoGrid/CategoriesBentoGrid";
import { GoogleMapComponent } from "@/components/GoogleMap/GoogleMap";
import { FullPresentation } from "@/components/FullPresentation/FullPresentation";
import { Introdution } from "@/components/Introdution/Introdution";
import { useExodarFont } from "@/hooks/useExodarFont";

import "@/styles/page.scss";

export default function Home() {
  const dispatch: any = useDispatch();
  const products = useSelector(selectProducts);
  const emailJSPublicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

  useExodarFont();

  useEffect(() => {
    dispatch(fetchProductsThunk());

    if (emailJSPublicKey) {
      emailjs.init(emailJSPublicKey);
    }
  }, [dispatch, emailJSPublicKey]);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service Worker registered", reg))
        .catch((err) =>
          console.error("Service Worker registration failed", err)
        );
    }
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
        <LatestArticles />
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
      <Separator />
    </main>
  );
}
