import React from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

  const navigate = useNavigate();
  const { openSideMenu } = useStore();

  const navItems = [
    { label: 'Amazon Haul', path: '/sf/summer-sale.html', isExternal: true },
    { label: 'Prime Video', path: '/sf/prime.html', isExternal: true },
    { label: 'Wish Lists', path: '/orders', isExternal: false },
    { label: "Today's Deals", path: '/sf/deals.html', isExternal: true },
    { label: 'Vouchers', path: '/sf/gift-cards.html', isExternal: true },
    { label: 'Prime ▾', path: '/sf/prime.html', isExternal: true },
    { label: 'Music', path: '/sf/all-categories.html', isExternal: true },
    { label: 'PC & Video Games', path: '/search?category=Computers%20%26%20Accessories', isExternal: false },
    { label: 'New Releases', path: '/sf/mobiles.html', isExternal: true },
    { label: 'Best Sellers', path: '/search', isExternal: false },
    { label: 'Customer Service', path: '/search', isExternal: false },
    { label: 'Electronics & Photo', path: '/search?category=Electronics', isExternal: false },
    { label: 'Toys & Games', path: '/search?category=Books', isExternal: false },
    { label: 'Pet Supplies', path: '/sf/grocery.html', isExternal: true },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isExternal) {
      window.open(item.path, '_blank');
    } else {
      navigate(item.path);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#232f3e',
        color: '#ffffff',
        height: '39px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        fontSize: '14px',
        fontWeight: 400,
        gap: '4px',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}
    >
      {/* "All" Hamburger Button */}
      <button
        onClick={openSideMenu}
        className="nav-hover-box"
        style={{
          background: 'none',
          border: 'none',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '5px 8px',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        <Menu size={18} />
        <span>All</span>
      </button>

      {/* Nav Links */}
      {navItems.map((item, idx) => (
        <span
          key={idx}
          className="nav-hover-box"
          onClick={() => handleNavClick(item)}
          style={{
            padding: '5px 8px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          {item.label}
        </span>
      ))}

      {/* Right side promo: Prime Deal Days is 6-7 October */}
      <div style={{ marginLeft: 'auto', padding: '0 8px', display: 'flex', alignItems: 'center' }}>
        <a
          href="/sf/deals.html"
          target="_blank"
          rel="noreferrer"
          className="nav-hover-box"
          style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#ffffff',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          Prime Deal Days is 6-7 October
        </a>
      </div>
    </div>
  );
};
