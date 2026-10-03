import React from 'react';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ marginTop: '40px', backgroundColor: '#232f3e', color: '#ffffff' }}>
      {/* Back to top button */}
      <div
        onClick={scrollToTop}
        style={{
          backgroundColor: '#37475a',
          textAlign: 'center',
          padding: '15px 0',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background-color 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#485769')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#37475a')}
      >
        Back to top
      </div>

      {/* Main 4-column link section */}
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '40px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
        }}
      >
        {/* Column 1 */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '14px' }}>Get to Know Us</div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Careers', 'Blog', 'About Amazon', 'Investor Relations', 'Amazon Devices', 'Amazon Science'].map((t, i) => (
              <li key={i}>
                <span style={{ color: '#dddddd', fontSize: '13px', cursor: 'pointer' }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '14px' }}>Make Money with Us</div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Sell products on Amazon',
              'Sell on Amazon Business',
              'Sell apps on Amazon',
              'Become an Affiliate',
              'Advertise Your Products',
              'Self-Publish with Us',
              'Host an Amazon Hub',
            ].map((t, i) => (
              <li key={i}>
                <span style={{ color: '#dddddd', fontSize: '13px', cursor: 'pointer' }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '14px' }}>Amazon Payment Products</div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Amazon Business Card',
              'Shop with Points',
              'Reload Your Balance',
              'Amazon Currency Converter',
            ].map((t, i) => (
              <li key={i}>
                <span style={{ color: '#dddddd', fontSize: '13px', cursor: 'pointer' }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '14px' }}>Let Us Help You</div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Amazon and COVID-19',
              'Your Account',
              'Your Orders',
              'Shipping Rates & Policies',
              'Returns & Replacements',
              'Manage Your Content and Devices',
              'Help',
            ].map((t, i) => (
              <li key={i}>
                <span style={{ color: '#dddddd', fontSize: '13px', cursor: 'pointer' }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Middle logo & locale bar */}
      <div
        style={{
          borderTop: '1px solid #3a4553',
          padding: '28px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <svg viewBox="0 0 100 35" width="80" height="28" fill="none">
              <text x="0" y="24" fill="#ffffff" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="22">
                amazon
              </text>
              <path d="M 5 28 C 30 38 65 37 88 28" stroke="#ff9900" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <polygon points="86,24 93,28 85,32" fill="#ff9900" />
            </svg>
          </Link>

          {/* Locale buttons */}
          <div
            style={{
              border: '1px solid #848688',
              borderRadius: '3px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: '#cccccc',
              cursor: 'pointer',
            }}
          >
            <Globe size={14} />
            <span>English</span>
          </div>

          <div
            style={{
              border: '1px solid #848688',
              borderRadius: '3px',
              padding: '6px 12px',
              fontSize: '13px',
              color: '#cccccc',
              cursor: 'pointer',
            }}
          >
            <span>$ USD - U.S. Dollar</span>
          </div>

          <div
            style={{
              border: '1px solid #848688',
              borderRadius: '3px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: '#cccccc',
              cursor: 'pointer',
            }}
          >
            <span>🇺🇸</span>
            <span>United States</span>
          </div>
        </div>
      </div>

      {/* Bottom dark bar */}
      <div style={{ backgroundColor: '#131a22', padding: '30px 16px', textAlign: 'center', fontSize: '12px', color: '#999999' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '8px' }}>
          <span style={{ cursor: 'pointer' }}>Conditions of Use</span>
          <span style={{ cursor: 'pointer' }}>Privacy Notice</span>
          <span style={{ cursor: 'pointer' }}>Consumer Health Data Privacy Disclosure</span>
          <span style={{ cursor: 'pointer' }}>Your Ads Privacy Choices</span>
        </div>
        <div>© 1996-2026, Amazon.com, Inc. or its affiliates</div>
      </div>
    </footer>
  );
};
