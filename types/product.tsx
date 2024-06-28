interface Product {
  id: string;
  stock: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  categories: string[];
  created_at: string;
}

export type { Product }; // so I can export it as a module
