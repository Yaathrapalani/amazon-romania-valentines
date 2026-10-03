import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';
import { StarRating } from '../common/StarRating';
import { useStore } from '../../store/useStore';

interface ProductRowProps {
  title: string;
  products: Product[];
}

export const ProductRow: React.FC<ProductRowProps> = ({ title, products }) => {
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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
        <h2 style={{ fontSize: '21px', fontWeight: 700, color: '#0f1111' }}>{title}</h2>
      </div>

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

      <div ref={scrollRef} className="horizontal-scroll" style={{ padding: '4px 8px' }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              flex: '0 0 220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              border: '1px solid #f0f0f0',
              borderRadius: '4px',
              padding: '12px',
            }}
          >
            <div onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer' }}>
              <div
                style={{
                  height: '180px',
                  backgroundColor: '#fafafa',
                  borderRadius: '4px',
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
                    maxHeight: '160px',
                    maxWidth: '160px',
                    objectFit: 'contain',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: '#007185',
                  fontWeight: 500,
                  lineHeight: '1.3',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: '6px',
                }}
              >
                {p.title}
              </div>

              <div style={{ marginBottom: '6px' }}>
                <StarRating rating={p.rating} reviewsCount={p.reviews_count} size={14} />
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '12px', verticalAlign: 'super' }}>$</span>
                <span style={{ fontSize: '20px', fontWeight: 700 }}>{Math.floor(p.price)}</span>
                <span style={{ fontSize: '12px', verticalAlign: 'super' }}>
                  {(p.price % 1).toFixed(2).substring(2)}
                </span>
              </div>

              {p.is_prime && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                  <div className="prime-badge">
                    <Check size={14} strokeWidth={4} className="prime-check" />
                    <span>prime</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#565959', marginLeft: '4px' }}>One-Day</span>
                </div>
              )}
            </div>

            <div style={{ marginTop: '12px' }}>
              <button
                onClick={() => addToCart(p, 1)}
                className="btn-amazon-yellow"
                style={{ width: '100%', fontSize: '12px', padding: '6px 12px' }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
