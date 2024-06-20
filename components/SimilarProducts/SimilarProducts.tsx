"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/productContext";
import "./SimilarProducts.scss";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard/ProductCard";

interface SimilarProductsProps {
  currentProduct: Product;
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({
  currentProduct,
}) => {
  const { products } = useProducts();
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSimilarProducts = () => {
      // Find products with similar names
      const similarByName = products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(currentProduct.name.toLowerCase()) &&
          product.id !== currentProduct.id
      );

      // If no products found by name, find by category
      if (similarByName.length === 0) {
        const similarByCategory = products.filter(
          (product) =>
            product.category === currentProduct.category &&
            product.id !== currentProduct.id
        );
        setSimilarProducts(similarByCategory.slice(0, 4));
      } else {
        setSimilarProducts(similarByName.slice(0, 4));
      }
    };

    fetchSimilarProducts();
  }, [currentProduct, products]);

  return (
    <div className="similar-products">
      <h2>Similar Products</h2>
      <div className="similar-products__container">
        {similarProducts.length > 0 ? (
          similarProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              images={product.images}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))
        ) : (
          <p>No similar products found.</p>
        )}
      </div>
    </div>
  );
};
