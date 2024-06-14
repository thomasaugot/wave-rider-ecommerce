"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Product } from "@/types/product";

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

  const handleProductSelection = (productId: string) => {
    const product: any = products.find((product) => product.id === productId);
    setSelectedProduct(product);
  };

  // Replace with your actual API logic to fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products"); // Replace with your API endpoint
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

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

// Important: Add "use client" directive to prevent server-side rendering issues
export { ProductProvider, useProducts }; // Mark for client-side only
