import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import SubNav from './components/layout/SubNav';
import { SideDrawer } from './components/layout/SideDrawer';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrdersPage } from './pages/OrdersPage';
import { AuthPage } from './pages/AuthPage';
import { useStore } from './store/useStore';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');
  const isCheckoutPage = location.pathname.startsWith('/checkout');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!isAuthPage && !isCheckoutPage && (
        <>
          <Header />
          <SubNav />
        </>
      )}

      <SideDrawer />

      <main style={{ flex: 1 }}>{children}</main>

      {!isAuthPage && !isCheckoutPage && <Footer />}
    </div>
  );
};

export function App() {
  const { checkAuth, fetchCart } = useStore();

  useEffect(() => {
    checkAuth();
    fetchCart();
  }, [checkAuth, fetchCart]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:id" element={<OrderSuccessPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
