"use client";

import React, { useEffect } from "react";
import { useProducts } from "@/context/productContext";
import "./product-details.scss";

export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { selectedProduct, handleProductSelection, products } = useProducts();

  useEffect(() => {
    if (params.id) {
      console.log("Product ID:", params.id);
      console.log("Products in context:", products);
      handleProductSelection(params.id);
    }
  }, [params.id, handleProductSelection, products]);

  if (!selectedProduct) {
    return <div className="product-details">Loading...</div>;
  }

  return (
    <div className="product-details">
      <h1>{selectedProduct.name}</h1>
      <p>{selectedProduct.description}</p>
      <p>Price: €{selectedProduct.price.toFixed(2)}</p>
      <button>Add to Cart</button>
    </div>
  );
}
