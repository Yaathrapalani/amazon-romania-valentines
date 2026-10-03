import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SingleCardProps {
  title: string;
  image: string;
  dealText?: string;
  priceText?: string;
  linkText?: string;
  productId?: string;
  category?: string;
}

export const SingleCard: React.FC<SingleCardProps> = ({
  title,
  image,
  dealText,
  priceText,
  linkText = 'Shop now',
  productId,
  category,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (productId) {
      navigate(`/product/${productId}`);
    } else if (category) {
      navigate(`/search?category=${encodeURIComponent(category)}`);
    } else {
      navigate('/search');
    }
  };

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
          {title}
        </h2>

        <div
          onClick={handleClick}
          style={{
            height: '275px',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            borderRadius: '2px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.25s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          />
        </div>

        {(dealText || priceText) && (
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {dealText && <span className="deal-badge">{dealText}</span>}
            {priceText && <span style={{ fontWeight: 700, fontSize: '15px' }}>{priceText}</span>}
          </div>
        )}
      </div>

      <div style={{ marginTop: '16px' }}>
        <span
          onClick={handleClick}
          style={{
            fontSize: '13px',
            color: '#007185',
            fontWeight: 500,
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          {linkText}
        </span>
      </div>
    </div>
  );
};
