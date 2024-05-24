"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

import "./product-details.scss";

export default function ProductDetailsPage() {
  const { productId } = useParams(); // Get product ID from URL
  const products = useSelector((state: any) => state?.products?.products); // Access products from store

  const product = products?.find((p: any) => p.id === productId); // Find product by ID

  return (
    <div>
      {product ? (
        <>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: €{product.price.toFixed(2)}</p>
          <button>Add to Cart</button>
        </>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
}
