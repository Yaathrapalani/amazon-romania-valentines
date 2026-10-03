import React from 'react';
import { X, User as UserIcon, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export const SideDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { isSideMenuOpen, closeSideMenu, user, isAuthenticated, logout, setSelectedCategory } = useStore();

  if (!isSideMenuOpen) return null;

  const handleCategoryNav = (cat: string) => {
    setSelectedCategory(cat);
    closeSideMenu();
    navigate(`/search?category=${encodeURIComponent(cat)}`);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex' }}>
      {/* Dark overlay backdrop */}
      <div
        onClick={closeSideMenu}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          animation: 'fadeIn 0.2s',
        }}
      />

      {/* Drawer Container */}
      <div
        style={{
          position: 'relative',
          width: '365px',
          maxWidth: '85vw',
          height: '100%',
          backgroundColor: '#ffffff',
          zIndex: 1010,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '4px 0 16px rgba(0,0,0,0.4)',
          overflowY: 'auto',
        }}
      >
        {/* Header with user greeting */}
        <div
          onClick={() => {
            closeSideMenu();
            if (!isAuthenticated) navigate('/auth');
          }}
          style={{
            backgroundColor: '#232f3e',
            color: '#ffffff',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#37475a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UserIcon size={20} color="#ffffff" />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700 }}>
            Hello, {user ? user.name : 'sign in'}
          </span>
        </div>

        {/* Navigation Sections */}
        <div style={{ padding: '16px 0', color: '#0f1111' }}>
          
          {/* Digital Content & Devices */}
          <div style={{ padding: '0 24px 8px 24px', fontSize: '16px', fontWeight: 700 }}>
            Digital Content & Devices
          </div>
          <div
            onClick={() => handleCategoryNav('Electronics')}
            style={{
              padding: '12px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eaeded')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <span>Amazon Prime Video</span>
            <ChevronRight size={16} color="#888" />
          </div>
          <div
            onClick={() => handleCategoryNav('Electronics')}
            style={{
              padding: '12px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eaeded')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <span>Amazon Music & Podcasts</span>
            <ChevronRight size={16} color="#888" />
          </div>
          <div
            onClick={() => handleCategoryNav('Books')}
            style={{
              padding: '12px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eaeded')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <span>Kindle E-readers & Books</span>
            <ChevronRight size={16} color="#888" />
          </div>

          <div style={{ height: '1px', backgroundColor: '#d5d9d9', margin: '12px 0' }} />

          {/* Shop By Department */}
          <div style={{ padding: '0 24px 8px 24px', fontSize: '16px', fontWeight: 700 }}>
            Shop by Department
          </div>
          {[
            { label: 'Electronics', cat: 'Electronics' },
            { label: 'Computers & Accessories', cat: 'Computers & Accessories' },
            { label: 'Smart Home Devices', cat: 'Smart Home' },
            { label: 'Home & Kitchen Essentials', cat: 'Home & Kitchen' },
            { label: 'Clothing, Shoes & Jewelry', cat: 'Fashion' },
            { label: 'Books & Audible', cat: 'Books' },
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => handleCategoryNav(item.cat)}
              style={{
                padding: '12px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eaeded')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span>{item.label}</span>
              <ChevronRight size={16} color="#888" />
            </div>
          ))}

          <div style={{ height: '1px', backgroundColor: '#d5d9d9', margin: '12px 0' }} />

          {/* Help & Settings */}
          <div style={{ padding: '0 24px 8px 24px', fontSize: '16px', fontWeight: 700 }}>
            Help & Settings
          </div>
          <div
            onClick={() => {
              closeSideMenu();
              navigate('/orders');
            }}
            style={{ padding: '12px 24px', cursor: 'pointer' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eaeded')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Your Orders
          </div>
          <div
            onClick={() => {
              closeSideMenu();
              navigate('/cart');
            }}
            style={{ padding: '12px 24px', cursor: 'pointer' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eaeded')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Your Shopping Cart
          </div>
          {isAuthenticated ? (
            <div
              onClick={() => {
                logout();
                closeSideMenu();
              }}
              style={{ padding: '12px 24px', cursor: 'pointer', color: '#c7511f', fontWeight: 600 }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eaeded')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Sign Out
            </div>
          ) : (
            <div
              onClick={() => {
                closeSideMenu();
                navigate('/auth');
              }}
              style={{ padding: '12px 24px', cursor: 'pointer', color: '#007185', fontWeight: 600 }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eaeded')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Sign In
            </div>
          )}

        </div>
      </div>

      {/* Floating Close Button */}
      <button
        onClick={closeSideMenu}
        style={{
          position: 'relative',
          top: '12px',
          left: '12px',
          background: 'none',
          border: 'none',
          color: '#ffffff',
          cursor: 'pointer',
          padding: '6px',
        }}
      >
        <X size={30} />
      </button>
    </div>
  );
};
