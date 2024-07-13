import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import { getProductsAPI } from "@/services/apiCalls";

const useFilterByCategory = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 20;
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products: Product[] = await getProductsAPI();
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
        (category
          ? product.categories.some(
              (cat) => cat.toLowerCase() === category.toLowerCase()
            )
          : true) &&
        (searchQuery
          ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
          : true)
    );

    setFilteredProducts(filtered);
  }, [allProducts, category, searchQuery]);

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

export default useFilterByCategory;
