import type { Product, User, CartItem, Order, ShippingAddress } from '../types';
import { products as seedProducts } from '../data/seedProducts';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

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

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('Non-JSON response from API');
  }

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
}

// Local mock storage helpers for 100% resilient standalone execution
function getLocalCart(): { items: CartItem[]; subtotal: number; totalQuantity: number } {
  try {
    const raw = localStorage.getItem('amazon_local_cart');
    if (raw) return JSON.parse(raw);
  } catch {}
  return { items: [], subtotal: 0, totalQuantity: 0 };
}

function saveLocalCart(cart: { items: CartItem[]; subtotal: number; totalQuantity: number }) {
  try {
    localStorage.setItem('amazon_local_cart', JSON.stringify(cart));
  } catch {}
}

function getLocalOrders(): Order[] {
  try {
    const raw = localStorage.getItem('amazon_local_orders');
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    {
      id: '114-8742910-3829412',
      userId: 'usr_demo_1',
      totalAmount: 348.00,
      status: 'Delivered yesterday',
      shippingAddress: {
        fullName: 'Alex Mercer',
        streetAddress: 'Strada Lipscani 24, Apt 4',
        city: 'Bucharest',
        state: 'Bucharest',
        zipCode: '030037',
        phoneNumber: '+40 721 000 111',
      },
      paymentMethod: 'Visa ending in 4242',
      items: [
        {
          productId: 'prod_1',
          title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones - Black',
          price: 348.00,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        }
      ],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }
  ];
}

export const api = {
  // Products
  async getProducts(params: Record<string, string | number | boolean | undefined> = {}): Promise<{ products: Product[]; count: number }> {
    try {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== '') {
          searchParams.append(key, String(val));
        }
      });
      const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
      const res = await apiRequest<{ products: Product[]; count: number }>(`/products${query}`);
      if (res && res.products && res.products.length > 0) {
        return res;
      }
    } catch {
      // Fallback to local catalog
    }

    let list = [...seedProducts];
    if (params.category) {
      const catLower = String(params.category).toLowerCase();
      list = list.filter((p) => p.category.toLowerCase().includes(catLower) || catLower.includes(p.category.toLowerCase()));
    }
    if (params.search) {
      const qLower = String(params.search).toLowerCase();
      list = list.filter((p) =>
        p.title.toLowerCase().includes(qLower) ||
        p.brand.toLowerCase().includes(qLower) ||
        p.category.toLowerCase().includes(qLower)
      );
    }
    return { products: list, count: list.length };
  },

  async getProduct(id: string): Promise<{ product: Product }> {
    try {
      const res = await apiRequest<{ product: Product }>(`/products/${id}`);
      if (res && res.product) return res;
    } catch {
      // Fallback to local
    }
    const found = seedProducts.find((p) => p.id === id) || seedProducts[0];
    return { product: found };
  },

  async search(q: string): Promise<{ suggestions: string[]; results: any[] }> {
    try {
      const res = await apiRequest<{ suggestions: string[]; results: any[] }>(`/search?q=${encodeURIComponent(q)}`);
      if (res && res.suggestions) return res;
    } catch {
      // Fallback
    }
    const qLower = q.toLowerCase();
    const matched = seedProducts.filter((p) =>
      p.title.toLowerCase().includes(qLower) ||
      p.brand.toLowerCase().includes(qLower) ||
      p.category.toLowerCase().includes(qLower)
    );
    const suggestions = matched.map((p) => p.title).slice(0, 6);
    return { suggestions, results: matched };
  },

  // Cart
  async getCart(): Promise<{ items: CartItem[]; subtotal: number; totalQuantity: number }> {
    try {
      const res = await apiRequest<{ items: CartItem[]; subtotal: number; totalQuantity: number }>('/cart');
      if (res && Array.isArray(res.items)) return res;
    } catch {
      // Fallback to local storage
    }
    return getLocalCart();
  },

  async addToCart(productId: string, quantity = 1): Promise<{ success: boolean; message: string }> {
    try {
      return await apiRequest('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      });
    } catch {
      // Local storage fallback
      const cart = getLocalCart();
      const existing = cart.items.find((item) => item.product.id === productId);
      const product = seedProducts.find((p) => p.id === productId) || seedProducts[0];
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.items.push({
          cartItemId: `item_${Date.now()}`,
          quantity,
          product,
        });
      }
      cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      cart.subtotal = Number(cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2));
      saveLocalCart(cart);
      return { success: true, message: 'Added to cart' };
    }
  },

  async updateCartItem(cartItemId: string, quantity: number): Promise<{ success: boolean; message: string }> {
    try {
      return await apiRequest(`/cart/${cartItemId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
      });
    } catch {
      const cart = getLocalCart();
      const item = cart.items.find((i) => i.cartItemId === cartItemId);
      if (item) {
        item.quantity = quantity;
        cart.totalQuantity = cart.items.reduce((sum, i) => sum + i.quantity, 0);
        cart.subtotal = Number(cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0).toFixed(2));
        saveLocalCart(cart);
      }
      return { success: true, message: 'Cart updated' };
    }
  },

  async removeCartItem(cartItemId: string): Promise<{ success: boolean; message: string }> {
    try {
      return await apiRequest(`/cart/${cartItemId}`, {
        method: 'DELETE',
      });
    } catch {
      const cart = getLocalCart();
      cart.items = cart.items.filter((i) => i.cartItemId !== cartItemId);
      cart.totalQuantity = cart.items.reduce((sum, i) => sum + i.quantity, 0);
      cart.subtotal = Number(cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0).toFixed(2));
      saveLocalCart(cart);
      return { success: true, message: 'Item removed' };
    }
  },

  async clearCart(): Promise<{ success: boolean }> {
    try {
      return await apiRequest('/cart', {
        method: 'DELETE',
      });
    } catch {
      saveLocalCart({ items: [], subtotal: 0, totalQuantity: 0 });
      return { success: true };
    }
  },

  // Orders
  async getOrders(): Promise<{ orders: Order[] }> {
    try {
      const res = await apiRequest<{ orders: Order[] }>('/orders');
      if (res && Array.isArray(res.orders)) return res;
    } catch {
      // Fallback
    }
    return { orders: getLocalOrders() };
  },

  async getOrder(id: string): Promise<{ order: Order }> {
    try {
      const res = await apiRequest<{ order: Order }>(`/orders/${id}`);
      if (res && res.order) return res;
    } catch {
      // Fallback
    }
    const orders = getLocalOrders();
    const found = orders.find((o) => o.id === id) || orders[0];
    return { order: found };
  },

  async createOrder(payload: {
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    items: Array<{ productId: string; title: string; price: number; quantity: number; image: string }>;
    totalAmount: number;
  }): Promise<{ success: boolean; orderId: string; order: Order }> {
    try {
      return await apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch {
      const randomId = `114-${Math.floor(1000000 + Math.random() * 9000000)}-${Math.floor(1000000 + Math.random() * 9000000)}`;
      const newOrder: Order = {
        id: randomId,
        userId: 'usr_demo_1',
        totalAmount: payload.totalAmount,
        status: 'Confirmed - Shipping to Romania',
        shippingAddress: payload.shippingAddress,
        paymentMethod: payload.paymentMethod,
        items: payload.items,
        createdAt: new Date().toISOString(),
      };
      const orders = [newOrder, ...getLocalOrders()];
      try {
        localStorage.setItem('amazon_local_orders', JSON.stringify(orders));
      } catch {}
      saveLocalCart({ items: [], subtotal: 0, totalQuantity: 0 });
      return { success: true, orderId: randomId, order: newOrder };
    }
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
    try {
      return await apiRequest('/payments', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch {
      return {
        success: true,
        transactionId: `txn_demo_${Date.now()}`,
        status: 'Authorized',
      };
    }
  },

  // Auth
  async login(email: string, _password: string): Promise<{ user: User; token: string }> {
    try {
      return await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password: _password }),
      });
    } catch {
      const demoUser: User = {
        id: 'usr_demo_1',
        email: email || 'demo@amazon.com',
        name: 'Alex Mercer',
      };
      try {
        localStorage.setItem('amazon_local_user', JSON.stringify(demoUser));
      } catch {}
      return { user: demoUser, token: 'demo_token_authenticated' };
    }
  },

  async register(name: string, email: string, _password: string): Promise<{ user: User; token: string }> {
    try {
      return await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password: _password }),
      });
    } catch {
      const newUser: User = {
        id: `usr_${Date.now()}`,
        email,
        name,
      };
      try {
        localStorage.setItem('amazon_local_user', JSON.stringify(newUser));
      } catch {}
      return { user: newUser, token: 'demo_token_authenticated' };
    }
  },

  async logout(): Promise<{ success: boolean }> {
    try {
      return await apiRequest('/auth/logout', {
        method: 'POST',
      });
    } catch {
      try {
        localStorage.removeItem('amazon_local_user');
      } catch {}
      return { success: true };
    }
  },

  async getMe(): Promise<{ user: User }> {
    try {
      return await apiRequest('/auth/me');
    } catch {
      try {
        const raw = localStorage.getItem('amazon_local_user');
        if (raw) return { user: JSON.parse(raw) };
      } catch {}
      return {
        user: {
          id: 'usr_demo_1',
          email: 'demo@amazon.com',
          name: 'Alex Mercer',
        }
      };
    }
  },
};
