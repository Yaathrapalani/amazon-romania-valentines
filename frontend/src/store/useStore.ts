import { create } from 'zustand';
import type { User, CartItem, Product, ShippingAddress } from '../types';
import { api } from '../services/api';

interface StoreState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;

  // Cart
  cartItems: CartItem[];
  subtotal: number;
  totalQuantity: number;
  isCartLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;

  // UI & Search
  isSideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Checkout address
  shippingAddress: ShippingAddress;
  setShippingAddress: (addr: ShippingAddress) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Auth initial state
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,

  checkAuth: async () => {
    try {
      set({ isAuthLoading: true });
      const res = await api.getMe();
      if (res && res.user) {
        set({ user: res.user, isAuthenticated: true });
      }
    } catch {
      // not logged in
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isAuthLoading: false });
    }
  },

  login: async (email, password) => {
    const res = await api.login(email, password);
    set({ user: res.user, isAuthenticated: true });
    // Refresh cart for user
    get().fetchCart();
  },

  register: async (name, email, password) => {
    const res = await api.register(name, email, password);
    set({ user: res.user, isAuthenticated: true });
    get().fetchCart();
  },

  logout: async () => {
    try {
      await api.logout();
    } catch {
      // ignore
    }
    set({ user: null, isAuthenticated: false });
    get().fetchCart();
  },

  // Cart initial state
  cartItems: [],
  subtotal: 0,
  totalQuantity: 0,
  isCartLoading: false,

  fetchCart: async () => {
    try {
      set({ isCartLoading: true });
      const data = await api.getCart();
      set({
        cartItems: data.items,
        subtotal: data.subtotal,
        totalQuantity: data.totalQuantity,
      });
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      set({ isCartLoading: false });
    }
  },

  addToCart: async (product, quantity = 1) => {
    try {
      await api.addToCart(product.id, quantity);
      await get().fetchCart();
    } catch (err) {
      console.error('Failed to add to cart:', err);
      // Optimistic update
      const existing = get().cartItems.find((item) => item.product.id === product.id);
      let newItems: CartItem[];
      if (existing) {
        newItems = get().cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [
          ...get().cartItems,
          { cartItemId: 'temp_' + Date.now(), quantity, product },
        ];
      }
      const newSubtotal = newItems.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
      const newTotalQty = newItems.reduce((acc, it) => acc + it.quantity, 0);
      set({
        cartItems: newItems,
        subtotal: Math.round(newSubtotal * 100) / 100,
        totalQuantity: newTotalQty,
      });
    }
  },

  updateQuantity: async (cartItemId, quantity) => {
    try {
      await api.updateCartItem(cartItemId, quantity);
      await get().fetchCart();
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  },

  removeFromCart: async (cartItemId) => {
    try {
      await api.removeCartItem(cartItemId);
      await get().fetchCart();
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  },

  clearCart: async () => {
    try {
      await api.clearCart();
      set({ cartItems: [], subtotal: 0, totalQuantity: 0 });
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  },

  // UI
  isSideMenuOpen: false,
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  selectedCategory: 'All',
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  // Default address
  shippingAddress: {
    fullName: 'Alex Mercer',
    streetAddress: '435 5th Ave, Apt 7B',
    city: 'New York',
    state: 'NY',
    zipCode: '10016',
    phoneNumber: '(212) 555-0199',
  },
  setShippingAddress: (addr) => set({ shippingAddress: addr }),
}));
