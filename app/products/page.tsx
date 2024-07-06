"use client";

import React, { useMemo } from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import useFilterByCategory from "@/hooks/useFilterByCategory";
import useFilterByBrand from "@/hooks/useFilterByBrand";
import { useSearchParams } from "next/navigation";
import "./products.scss";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Category, Product } from "@/types";

const Products: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const searchQuery = searchParams.get("search") || "";

  const {
    searchQuery: categorySearchQuery,
    setSearchQuery: setCategorySearchQuery,
    currentProducts: categoryCurrentProducts,
    totalPages: categoryTotalPages,
    currentPage: categoryCurrentPage,
    handlePageChange: handleCategoryPageChange,
  } = useFilterByCategory();

  const {
    searchQuery: brandSearchQuery,
    setSearchQuery: setBrandSearchQuery,
    currentProducts: brandCurrentProducts,
    totalPages: brandTotalPages,
    currentPage: brandCurrentPage,
    handlePageChange: handleBrandPageChange,
  } = useFilterByBrand();

  const allProducts: Product[] = useMemo(() => {
    return categoryCurrentProducts.length
      ? categoryCurrentProducts
      : brandCurrentProducts;
  }, [categoryCurrentProducts, brandCurrentProducts]);

  const filteredProducts: Product[] = useMemo(() => {
    let filtered = allProducts;
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [allProducts, searchQuery]);

  const totalPages = Math.max(categoryTotalPages, brandTotalPages);
  const currentPage = categoryCurrentPage || brandCurrentPage;
  const handlePageChange = (page: number) => {
    handleCategoryPageChange(page);
    handleBrandPageChange(page);
  };

  const getTitle = () => {
    let title = "All Products";
    if (category && brand) {
      title = `All ${category} Products from ${brand}`;
    } else if (category) {
      title = `All ${category} Products`;
    } else if (brand) {
      title = `All Products from ${brand}`;
    }
    return title;
  };

  return (
    <div className="products-container">
      <h1>{getTitle()}</h1>
      <SearchBar
        onChange={(query) => {
          setCategorySearchQuery(query);
          setBrandSearchQuery(query);
        }}
        placeholder="Search a product, a brand, a sport..."
      />
      <div className="products-grid">
        {filteredProducts.map((product) => (
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
