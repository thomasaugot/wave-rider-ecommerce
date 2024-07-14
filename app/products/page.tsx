"use client";

import React, { useMemo, useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsThunk,
  addProductThunk,
  selectProducts,
  selectLoading,
} from "@/store/slices/productSlice";
import { Product } from "@/types";
import { AddProduct } from "@/components/AddProduct/AddProduct";
import { selectUser } from "@/store/slices/userSlice";
import "./products.scss";
import { Loading } from "@/components/Loading/Loading";

export default function Products() {
  const dispatch: any = useDispatch();
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectLoading);
  const user = useSelector(selectUser);
  const isAdmin = user?.email?.endsWith("@admin.com");
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand")?.toLowerCase();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = (product: Product) => {
    dispatch(addProductThunk(product));
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const filteredProducts: Product[] = useMemo(() => {
    let filtered: Product[] = products;

    if (category) {
      const selectedCategories = category.split(",");
      filtered = filtered.filter((product) =>
        product.categories?.some((cat) =>
          selectedCategories.includes(cat.toLowerCase())
        )
      );
    }

    if (brand) {
      filtered = filtered.filter(
        (product) => product.brand.toLowerCase() === brand
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, searchQuery, category, brand]);

  const productsPerPage = isAdmin ? 11 : 12;
  const [currentPage, setCurrentPage] = useState(1);

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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>{getTitle()}</h1>
          <SearchBar
            onChange={setSearchQuery}
            placeholder="Search a product, a brand, a sport..."
          />
          <div className="products-grid">
            {isAdmin && (
              <div
                className="add-product-card"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="add-product-card__plus">+</div>
              </div>
            )}
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
          <AddProduct
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddProduct={handleAddProduct}
          />
        </>
      )}
    </div>
  );
}
