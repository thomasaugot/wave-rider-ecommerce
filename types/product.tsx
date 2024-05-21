interface Product {
  id: string;
  stock: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  created_at: string;
}

export type { Product };
