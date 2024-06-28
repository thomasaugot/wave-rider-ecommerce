"use client";

import React from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import useFilterByCategory from "@/hooks/useFilterByCategory";
import "./products.scss";
import SearchBar from "@/components/SearchBar/SearchBar";

const Products: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    currentProducts,
    totalPages,
    currentPage,
    handlePageChange,
  } = useFilterByCategory();

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
