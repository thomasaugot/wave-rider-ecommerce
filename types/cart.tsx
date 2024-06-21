export interface CartItemType {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
}

export type Cart = CartItemType[];

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}
