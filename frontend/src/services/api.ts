import type { Product, User, CartItem, Order, ShippingAddress } from '../types';

const API_BASE = '/api';

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
}

export const api = {
  // Products
  async getProducts(params: Record<string, string | number | boolean | undefined> = {}): Promise<{ products: Product[]; count: number }> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== '') {
        searchParams.append(key, String(val));
      }
    });
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return apiRequest(`/products${query}`);
  },

  async getProduct(id: string): Promise<{ product: Product }> {
    return apiRequest(`/products/${id}`);
  },

  async search(q: string): Promise<{ suggestions: string[]; results: any[] }> {
    return apiRequest(`/search?q=${encodeURIComponent(q)}`);
  },

  // Cart
  async getCart(): Promise<{ items: CartItem[]; subtotal: number; totalQuantity: number }> {
    return apiRequest('/cart');
  },

  async addToCart(productId: string, quantity = 1): Promise<{ success: boolean; message: string }> {
    return apiRequest('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  async updateCartItem(cartItemId: string, quantity: number): Promise<{ success: boolean; message: string }> {
    return apiRequest(`/cart/${cartItemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  async removeCartItem(cartItemId: string): Promise<{ success: boolean; message: string }> {
    return apiRequest(`/cart/${cartItemId}`, {
      method: 'DELETE',
    });
  },

  async clearCart(): Promise<{ success: boolean }> {
    return apiRequest('/cart', {
      method: 'DELETE',
    });
  },

  // Orders
  async getOrders(): Promise<{ orders: Order[] }> {
    return apiRequest('/orders');
  },

  async getOrder(id: string): Promise<{ order: Order }> {
    return apiRequest(`/orders/${id}`);
  },

  async createOrder(payload: {
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    items: Array<{ productId: string; title: string; price: number; quantity: number; image: string }>;
    totalAmount: number;
  }): Promise<{ success: boolean; orderId: string; order: Order }> {
    return apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Payments
  async processPayment(payload: {
    amount: number;
    cardNumber: string;
    cardHolder: string;
    expMonth: string;
    expYear: string;
    cvv: string;
  }): Promise<any> {
    return apiRequest('/payments', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Auth
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  async logout(): Promise<{ success: boolean }> {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  async getMe(): Promise<{ user: User }> {
    return apiRequest('/auth/me');
  },
};
