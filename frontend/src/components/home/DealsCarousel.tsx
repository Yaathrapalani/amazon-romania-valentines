import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';

interface DealsCarouselProps {
  products: Product[];
}

export const DealsCarousel: React.FC<DealsCarouselProps> = ({ products }) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const dealProducts = products.filter((p) => p.price < p.list_price);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        margin: '20px 0',
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '14px' }}>
        <h2 style={{ fontSize: '21px', fontWeight: 700, color: '#0f1111' }}>Today's Deals</h2>
        <span
          onClick={() => navigate('/search')}
          style={{ fontSize: '13px', color: '#007185', cursor: 'pointer' }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          See all deals
        </span>
      </div>

      {/* Left Chevron Button */}
      <button
        onClick={() => scroll('left')}
        style={{
          position: 'absolute',
          left: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '70px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          border: '1px solid #d5d9d9',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
        }}
      >
        <ChevronLeft size={28} color="#333" />
      </button>

      {/* Right Chevron Button */}
      <button
        onClick={() => scroll('right')}
        style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '70px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          border: '1px solid #d5d9d9',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
        }}
      >
        <ChevronRight size={28} color="#333" />
      </button>

      {/* Horizontal List */}
      <div ref={scrollRef} className="horizontal-scroll" style={{ padding: '4px 8px' }}>
        {dealProducts.map((p) => {
          const discountPct = Math.round(((p.list_price - p.price) / p.list_price) * 100);
          return (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              style={{
                flex: '0 0 200px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  height: '190px',
                  backgroundColor: '#f8f8f8',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}
              >
                <img
                  src={p.main_image}
                  alt={p.title}
                  style={{
                    maxHeight: '170px',
                    maxWidth: '170px',
                    objectFit: 'contain',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
              </div>

              {/* Deal badge and label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span className="deal-badge">Up to {discountPct}% off</span>
                <span className="deal-label">Deal of the Day</span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#0f1111' }}>
                  ${p.price.toFixed(2)}
                </span>
                <span style={{ fontSize: '12px', color: '#565959', textDecoration: 'line-through' }}>
                  List: ${p.list_price.toFixed(2)}
                </span>
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: '13px',
                  color: '#0f1111',
                  marginTop: '4px',
                  lineHeight: '1.3',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {p.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
