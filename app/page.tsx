"use client";

import { useEffect } from "react";
import "../styles/page.scss";
import { getProducts } from "@/services/apiCalls";

export default function Home() {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main>
      <h1>hello</h1>
    </main>
  );
}
