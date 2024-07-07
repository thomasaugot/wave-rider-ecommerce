"use client";

import React, { useMemo, useState } from "react";
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
  const brand = searchParams.get("brand")?.toLowerCase();
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

  const productsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts: Product[] = useMemo(() => {
    let filtered: Product[] = [];

    if (category) {
      const selectedCategories = category.split(",");
      filtered = categoryCurrentProducts.filter((product) => {
        return (
          product.categories &&
          product.categories.some((cat) =>
            selectedCategories.includes(cat.toLowerCase())
          )
        );
      });
    } else if (brand) {
      filtered = brandCurrentProducts.filter((product) => {
        return product.brand.toLowerCase() === brand;
      });
    } else {
      filtered = [...categoryCurrentProducts, ...brandCurrentProducts];
    }

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

  const totalFilteredPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage, productsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        {paginatedProducts.map((product) => (
          <div key={product.id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalFilteredPages }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Products;
