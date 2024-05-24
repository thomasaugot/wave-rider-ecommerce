export interface CartItemType {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
}

export type Cart = CartItemType[];
