export interface PastOrder {
  productId: string;
  quantity: number;
  price: number;
  date: string;
  name: string;
}

interface UserType {
  id: string;
  created_at: string;
  firstname: string;
  lastname: string;
  full_name: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  liked_products: string[];
  cart_items: string[];
  country: string;
  city: string;
  zipcode: string;
  profilePic?: string | null;
  pastOrders?: PastOrder[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserState {
  user: UserType | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
}

export type { UserType };
