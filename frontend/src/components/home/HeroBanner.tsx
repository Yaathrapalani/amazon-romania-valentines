import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: 'relative',
        height: '380px',
        minHeight: '340px',
        width: '100%',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#eaeded',
      }}
      onClick={() => navigate('/search')}
    >
      {/* Valentine's Day Hero Background Image */}
      <img
        src="/assets/reference/hero_valentines.png"
        alt="Explore Valentine's Day - Shop Deals"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
        }}
      />

      {/* Left Chevron Navigation Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          navigate('/search');
        }}
        style={{
          position: 'absolute',
          left: '12px',
          top: '150px',
          background: 'none',
          border: '2px solid transparent',
          borderRadius: '4px',
          cursor: 'pointer',
          padding: '10px 4px',
          color: '#0f1111',
          zIndex: 10,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#007185')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
      >
        <ChevronLeft size={44} strokeWidth={2} />
      </button>

      {/* Right Chevron Navigation Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          navigate('/search');
        }}
        style={{
          position: 'absolute',
          right: '12px',
          top: '150px',
          background: 'none',
          border: '2px solid transparent',
          borderRadius: '4px',
          cursor: 'pointer',
          padding: '10px 4px',
          color: '#0f1111',
          zIndex: 10,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#007185')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
      >
        <ChevronRight size={44} strokeWidth={2} />
      </button>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(to bottom, rgba(234, 237, 237, 0) 0%, rgba(234, 237, 237, 0.95) 100%)',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />
    </div>
  );
};
