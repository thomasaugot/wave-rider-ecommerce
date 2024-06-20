"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { getProducts } from "@/services/apiCalls";
import { useFilterItems } from "@/hooks/useFilterItems";
import "./products.scss";
import SearchBar from "@/components/SearchBar/SearchBar";

const ITEMS_PER_PAGE = 20;

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { searchQuery, setSearchQuery, filteredItems } =
    useFilterItems<Product>(products || [], []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts: Product[] = await getProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length);
  const currentProducts = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="products-container">
      <h1>All Products</h1>
      <SearchBar
        onChange={(query) => setSearchQuery(query)}
        placeholder="Search a product, a brand, a sport..."
      />
      <div className="products-grid">
        {currentProducts.map((product) => (
          <div key={product.id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
