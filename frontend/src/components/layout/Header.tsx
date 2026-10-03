import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Search, ShoppingCart, ChevronDown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { api } from '../../services/api';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    logout,
    totalQuantity,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useStore();

  const [inputVal, setInputVal] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [showRoPopover, setShowRoPopover] = useState(true);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputVal(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (inputVal.trim().length > 1) {
      api.search(inputVal).then((res) => {
        if (res.suggestions) {
          setSuggestions(res.suggestions);
        }
      }).catch(() => {});
    } else {
      setSuggestions([]);
    }
  }, [inputVal]);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent, term?: string) => {
    if (e) e.preventDefault();
    const queryToUse = term !== undefined ? term : inputVal;
    setSearchQuery(queryToUse);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(queryToUse)}&category=${encodeURIComponent(selectedCategory)}`);
  };

  return (
    <header style={{ backgroundColor: '#131921', color: '#ffffff', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top Navbar */}
      <div style={{ display: 'flex', alignItems: 'center', height: '60px', padding: '0 14px', gap: '6px' }}>
        
        {/* Amazon Logo */}
        <Link to="/" className="nav-hover-box" style={{ textDecoration: 'none', padding: '4px 6px', marginRight: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', height: '36px' }}>
            <svg viewBox="0 0 100 35" width="97" height="35" fill="none">
              <text x="0" y="24" fill="#ffffff" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="24" letterSpacing="-0.5px">
                amazon
              </text>
              <path
                d="M 5 28 C 30 38 65 37 88 28"
                stroke="#ff9900"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
              <polygon points="86,24 93,28 85,32" fill="#ff9900" />
            </svg>
          </div>
        </Link>

        {/* Deliver to Romania with interactive popover */}
        <div style={{ position: 'relative' }}>
          <div
            className="nav-hover-box"
            onClick={() => setShowRoPopover(!showRoPopover)}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px' }}
          >
            <MapPin size={18} color="#ffffff" style={{ marginTop: '6px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontSize: '12px', color: '#cccccc' }}>Deliver to</span>
              <span style={{ fontSize: '14px', fontWeight: 700 }}>Romania</span>
            </div>
          </div>

          {/* Romania Delivery Notification Popover (exact target match) */}
          {showRoPopover && (
            <div
              ref={popoverRef}
              style={{
                position: 'absolute',
                top: '46px',
                left: '-15px',
                width: '395px',
                backgroundColor: '#ffffff',
                color: '#0f1111',
                borderRadius: '3px',
                padding: '16px 18px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                zIndex: 350,
                border: '1px solid #d5d9d9',
              }}
            >
              {/* Pointer Arrow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-7px',
                  left: '35px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#ffffff',
                  transform: 'rotate(45deg)',
                  borderLeft: '1px solid #d5d9d9',
                  borderTop: '1px solid #d5d9d9',
                }}
              />
              <p style={{ fontSize: '13px', lineHeight: 1.4, color: '#0f1111', marginBottom: '14px' }}>
                We're showing you items that ship to <strong>RO</strong>. To see items that ship to a different country, change your delivery address.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowRoPopover(false)}
                  className="btn-amazon-white"
                  style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '3px' }}
                >
                  Don't Change
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRoPopover(false);
                    navigate('/checkout');
                  }}
                  className="btn-amazon-yellow"
                  style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '3px', fontWeight: 600 }}
                >
                  Change Address
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div ref={searchContainerRef} style={{ flex: 1, position: 'relative', margin: '0 10px' }}>
          <form
            onSubmit={(e) => handleSearchSubmit(e)}
            style={{
              display: 'flex',
              height: '40px',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: showSuggestions ? '0 0 0 3px #f90' : 'none',
              transition: 'box-shadow 0.2s',
            }}
          >
            {/* Category Select Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                backgroundColor: '#e6e6e6',
                border: 'none',
                borderRight: '1px solid #cdcdcd',
                padding: '0 8px',
                fontSize: '12px',
                color: '#333333',
                cursor: 'pointer',
                outline: 'none',
                maxWidth: '130px',
              }}
            >
              <option value="All">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Computers & Accessories">Computers</option>
              <option value="Smart Home">Smart Home</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Fashion">Fashion</option>
              <option value="Books">Books</option>
            </select>

            {/* Input field */}
            <input
              type="text"
              placeholder="Search Amazon"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              style={{
                flex: 1,
                border: 'none',
                padding: '0 12px',
                fontSize: '15px',
                outline: 'none',
                color: '#0f1111',
              }}
            />

            {/* Magnifying Glass Search Button */}
            <button
              type="submit"
              style={{
                width: '45px',
                backgroundColor: '#febd69',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3a847')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#febd69')}
            >
              <Search size={20} color="#131921" />
            </button>
          </form>

          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '42px',
                left: 0,
                right: 0,
                backgroundColor: '#ffffff',
                color: '#0f1111',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                zIndex: 200,
                overflow: 'hidden',
                border: '1px solid #d5d9d9',
              }}
            >
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setInputVal(item);
                    handleSearchSubmit(undefined, item);
                  }}
                  style={{
                    padding: '9px 14px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    borderBottom: idx < suggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f3f3')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                >
                  <Search size={15} color="#888888" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Language selector (US flag) */}
        <div className="nav-hover-box" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px' }}>
          <span style={{ fontSize: '15px' }}>🇺🇸</span>
          <span style={{ fontSize: '13px', fontWeight: 700 }}>EN</span>
          <ChevronDown size={12} color="#cccccc" />
        </div>

        {/* Account & Lists */}
        <div
          ref={accountRef}
          className="nav-hover-box"
          style={{ position: 'relative', display: 'flex', flexDirection: 'column', lineHeight: 1.1, padding: '4px 8px' }}
          onClick={() => setIsAccountOpen(!isAccountOpen)}
        >
          <span style={{ fontSize: '12px', color: '#cccccc' }}>
            Hello, {user ? user.name.split(' ')[0] : 'sign in'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700 }}>Account & Lists</span>
            <ChevronDown size={12} color="#cccccc" />
          </div>

          {/* Account Dropdown Menu */}
          {isAccountOpen && (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                right: 0,
                width: '240px',
                backgroundColor: '#ffffff',
                color: '#0f1111',
                borderRadius: '4px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                padding: '16px',
                zIndex: 300,
                border: '1px solid #d5d9d9',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {!isAuthenticated ? (
                <div style={{ textAlign: 'center', paddingBottom: '12px', borderBottom: '1px solid #e7e7e7' }}>
                  <button
                    onClick={() => {
                      setIsAccountOpen(false);
                      navigate('/auth');
                    }}
                    className="btn-amazon-yellow"
                    style={{ width: '100%', marginBottom: '8px' }}
                  >
                    Sign in
                  </button>
                  <span style={{ fontSize: '11px', color: '#565959' }}>
                    New customer?{' '}
                    <Link
                      to="/auth?mode=register"
                      onClick={() => setIsAccountOpen(false)}
                      style={{ color: '#007185', fontWeight: 600 }}
                    >
                      Start here.
                    </Link>
                  </span>
                </div>
              ) : (
                <div style={{ paddingBottom: '10px', borderBottom: '1px solid #e7e7e7' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>{user?.name}</div>
                  <div style={{ fontSize: '12px', color: '#565959' }}>{user?.email}</div>
                </div>
              )}

              <div style={{ paddingTop: '10px' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>Your Account</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <Link
                    to="/orders"
                    onClick={() => setIsAccountOpen(false)}
                    style={{ color: '#444444', fontSize: '13px' }}
                  >
                    Your Orders
                  </Link>
                  <Link
                    to="/search"
                    onClick={() => setIsAccountOpen(false)}
                    style={{ color: '#444444', fontSize: '13px' }}
                  >
                    Your Recommendations
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setIsAccountOpen(false)}
                    style={{ color: '#444444', fontSize: '13px' }}
                  >
                    Your Shopping Cart
                  </Link>
                  {isAuthenticated && (
                    <button
                      onClick={() => {
                        logout();
                        setIsAccountOpen(false);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#007185',
                        textAlign: 'left',
                        padding: '6px 0',
                        fontSize: '13px',
                        cursor: 'pointer',
                        borderTop: '1px solid #eee',
                        marginTop: '6px',
                      }}
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Returns & Orders */}
        <Link to="/orders" className="nav-hover-box" style={{ textDecoration: 'none', color: '#ffffff', padding: '4px 8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: '12px', color: '#cccccc' }}>Returns</span>
            <span style={{ fontSize: '14px', fontWeight: 700 }}>& Orders</span>
          </div>
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="nav-hover-box"
          style={{ textDecoration: 'none', color: '#ffffff', padding: '4px 8px', display: 'flex', alignItems: 'center' }}
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <ShoppingCart size={28} />
            <span
              style={{
                position: 'absolute',
                top: '-3px',
                left: '12px',
                backgroundColor: '#f08804',
                color: '#131921',
                borderRadius: '10px',
                padding: '0 6px',
                fontSize: '12px',
                fontWeight: 800,
                minWidth: '18px',
                textAlign: 'center',
                lineHeight: '16px',
              }}
            >
              {totalQuantity}
            </span>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 700, marginLeft: '4px', alignSelf: 'flex-end', paddingBottom: '2px' }}>
            Cart
          </span>
        </Link>

      </div>
    </header>
  );
};
