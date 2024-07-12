interface Product {
  id: string;
  stock: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  categories: string[];
  created_at: string;
  brand: string;
}

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export type { Product }; // so I can export it as a module
