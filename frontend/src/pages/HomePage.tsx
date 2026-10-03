import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroBanner } from '../components/home/HeroBanner';
import { QuadCard } from '../components/home/QuadCard';
import { SingleCard } from '../components/home/SingleCard';
import { DealsCarousel } from '../components/home/DealsCarousel';
import { ProductRow } from '../components/home/ProductRow';
import type { Product } from '../types';
import { api } from '../services/api';
import { useStore } from '../store/useStore';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getProducts().then((res) => {
      setProducts(res.products || []);
      setIsLoading(false);
    }).catch((err) => {
      console.error('Failed to load products:', err);
      setIsLoading(false);
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Valentine's Day Hero Banner */}
      <HeroBanner />

      {/* Main 4-Column Floating Cards Container */}
      <div
        style={{
          maxWidth: '1500px',
          margin: '-90px auto 0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '20px',
          }}
        >
          {/* Column 1: Shop by Category */}
          <QuadCard
            title="Shop by Category"
            items={[
              {
                title: 'Computers & Accessories',
                image: '/assets/reference/cat_computers.png',
                category: 'Computers & Accessories',
              },
              {
                title: 'Video Games',
                image: '/assets/reference/cat_videogames.png',
                category: 'Electronics',
              },
              {
                title: 'Baby',
                image: '/assets/reference/cat_baby.png',
                category: 'Home & Kitchen',
              },
              {
                title: 'Toys & Games',
                image: '/assets/reference/cat_toys.png',
                category: 'Books',
              },
            ]}
            linkText="Shop now"
          />

          {/* Column 2: Refresh your space */}
          <QuadCard
            title="Refresh your space"
            items={[
              {
                title: 'Dining',
                image: '/assets/reference/refresh_dining.png',
                category: 'Home & Kitchen',
              },
              {
                title: 'Home',
                image: '/assets/reference/refresh_home.png',
                category: 'Home & Kitchen',
              },
              {
                title: 'Kitchen',
                image: '/assets/reference/refresh_kitchen.png',
                category: 'Home & Kitchen',
              },
              {
                title: 'Health and Beauty',
                image: '/assets/reference/refresh_beauty.png',
                category: 'Fashion',
              },
            ]}
            linkText="See more"
          />

          {/* Column 3: Electronics */}
          <SingleCard
            title="Electronics"
            image="/assets/reference/electronics_flatlay.png"
            linkText="See more"
            category="Electronics"
          />

          {/* Column 4: Dual Stacked Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '420px' }}>
            
            {/* Top Sign-in Box */}
            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '20px',
                borderRadius: '0px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                flex: '0 0 auto',
              }}
            >
              <h2 style={{ fontSize: '21px', fontWeight: 700, color: '#0f1111', marginBottom: '14px', lineHeight: 1.25 }}>
                {isAuthenticated ? `Welcome back, ${user?.name.split(' ')[0]}` : 'Sign in for the best experience'}
              </h2>

              {!isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => navigate('/auth')}
                  className="btn-amazon-yellow"
                  style={{ width: '100%', padding: '9px 0', fontSize: '13px', fontWeight: 500 }}
                >
                  Sign in securely
                </button>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => navigate('/orders')}
                    className="btn-amazon-white"
                    style={{ width: '100%', fontSize: '13px' }}
                  >
                    Your Orders
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Worldwide Shipping Box (Cyan #00a8e1) */}
            <div
              onClick={() => navigate('/search')}
              style={{
                flex: 1,
                backgroundColor: '#00a8e1',
                borderRadius: '0px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/assets/reference/shipping_worldwide.png"
                alt="We ship over 45 million products around the world"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

          </div>
        </div>

        {/* Below-the-fold Feed */}
        {!isLoading && (
          <>
            <DealsCarousel products={products} />
            <ProductRow
              title="Best Sellers in Electronics & Computers"
              products={products.filter((p) => p.category === 'Electronics' || p.category === 'Computers & Accessories')}
            />
            <ProductRow
              title="Popular in Home & Kitchen Essentials"
              products={products.filter((p) => p.category === 'Home & Kitchen' || p.category === 'Books')}
            />
          </>
        )}
      </div>
    </div>
  );
};
