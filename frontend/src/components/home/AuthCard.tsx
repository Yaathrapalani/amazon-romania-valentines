import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export const AuthCard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useStore();

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        zIndex: 10,
        height: '420px',
      }}
    >
      <div>
        <h2 style={{ fontSize: '21px', fontWeight: 700, color: '#0f1111', marginBottom: '14px', lineHeight: 1.25 }}>
          {isAuthenticated ? `Welcome back, ${user?.name.split(' ')[0]}` : 'Sign in for the best experience'}
        </h2>

        {!isAuthenticated ? (
          <div>
            <button
              onClick={() => navigate('/auth')}
              className="btn-amazon-yellow"
              style={{ width: '100%', padding: '10px 0', fontSize: '13px', fontWeight: 600, marginTop: '8px' }}
            >
              Sign in securely
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            <button
              onClick={() => navigate('/orders')}
              className="btn-amazon-white"
              style={{ width: '100%', textAlign: 'center' }}
            >
              View Your Orders
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="btn-amazon-white"
              style={{ width: '100%', textAlign: 'center' }}
            >
              View Your Shopping Cart
            </button>
          </div>
        )}
      </div>

      {/* Promo banner graphic */}
      <div
        onClick={() => navigate('/search?category=Electronics')}
        style={{
          marginTop: 'auto',
          backgroundColor: '#f3f3f3',
          borderRadius: '4px',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"
          alt="Amazon Prime Delivery"
          style={{ width: '100%', height: '170px', objectFit: 'cover' }}
        />
        <div style={{ padding: '8px 12px', fontSize: '12px', color: '#565959', textAlign: 'center' }}>
          Fast, FREE delivery on millions of items with Prime
        </div>
      </div>
    </div>
  );
};
