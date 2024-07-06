"use client";

import React, { useMemo } from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import useFilterByCategory from "@/hooks/useFilterByCategory";
import useFilterByBrand from "@/hooks/useFilterByBrand";
import { useSearchParams } from "next/navigation";
import "./products.scss";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Product } from "@/types";

const Products: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand")?.toLowerCase(); // Convert brand to lowercase
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

  const filteredProducts: Product[] = useMemo(() => {
    let filtered: Product[] = []; // Initialize filtered as an empty array

    // Combine category and brand filtered products
    if (categoryCurrentProducts.length > 0) {
      // Filter by selected categories if category parameter exists
      if (category) {
        const selectedCategories = category.split(","); // Split category string into an array
        filtered = categoryCurrentProducts.filter((product) => {
          // Check if any category in product.categories matches a selected category
          return (
            product.categories &&
            product.categories.some((cat) => selectedCategories.includes(cat))
          );
        });
      } else {
        // No category parameter, use all category products
        filtered = categoryCurrentProducts;
      }
    }

    // Apply brand filter if brand parameter exists
    if (brandCurrentProducts.length > 0 && brand) {
      filtered = filtered.filter((product) => {
        // Filter by brand property
        return product.brand.toLowerCase() === brand;
      });
    }

    // Apply search query filter if provided
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [
    categoryCurrentProducts,
    brandCurrentProducts,
    searchQuery,
    category,
    brand,
  ]);

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
