"use client";

import React, { useEffect } from "react";
import { useProducts } from "@/context/productContext";
import "./product-details.scss";
import Image from "next/image";
import CustomButton from "@/components/CustomButton/CustomButton";

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
      <div className="img-container">
        <Image
          src={selectedProduct.images[0]}
          alt={selectedProduct.name}
          layout="intrinsic"
          width={800} // Adjust width as needed
          height={600} // Adjust height as needed
          className="product-image"
        />
      </div>
      <div className="details-container">
        <h1>{selectedProduct.name}</h1>
        <p>{selectedProduct.description}</p>
        <p>Price: €{selectedProduct.price.toFixed(2)}</p>
        <div className="actions-container">
          <CustomButton text={"Add to Cart"} onClick={undefined} />
          <CustomButton text={"Buy Now"} secondary={true} onClick={undefined} />
        </div>
      </div>
    </div>
  );
}
