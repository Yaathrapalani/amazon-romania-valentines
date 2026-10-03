export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  list_price: number;
  rating: number;
  reviews_count: number;
  is_prime: boolean;
  is_best_seller: boolean;
  is_amazons_choice: boolean;
  in_stock: boolean;
  stock_count: number;
  main_image: string;
  images: string[];
  features: string[];
  badge?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CartItem {
  cartItemId: string;
  quantity: number;
  product: Product;
}

export interface ShippingAddress {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber?: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  items: OrderItem[];
  createdAt: string;
  estimatedDelivery?: string;
}

export const TYPES_VERSION = '1.0.0';
