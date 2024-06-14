"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/services/apiCalls";

interface ProductContextType {
  products: Product[];
  selectedProduct: Product | null;
  setProducts: (products: Product[]) => void;
  handleProductSelection: (productId: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelection = (productId: string) => {
    const product = products.find((product) => product.id === productId);
    setSelectedProduct(product || null);
  };

  return (
    <ProductContext.Provider
      value={{ products, selectedProduct, setProducts, handleProductSelection }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export { ProductProvider, useProducts };
