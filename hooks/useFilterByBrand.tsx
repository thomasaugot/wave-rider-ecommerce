import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import { getProducts } from "@/services/apiCalls";

const useFilterByBrand = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 20;
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand")?.toLowerCase();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products: Product[] = await getProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter(
      (product) =>
        (brand ? product.brand.toLowerCase() === brand.toLowerCase() : true) &&
        (searchQuery
          ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
          : true)
    );

    setFilteredProducts(filtered);
  }, [allProducts, brand, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(
    startIndex + ITEMS_PER_PAGE,
    filteredProducts.length
  );
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    searchQuery,
    setSearchQuery,
    currentProducts,
    totalPages,
    currentPage,
    handlePageChange,
  };
};

export default useFilterByBrand;
