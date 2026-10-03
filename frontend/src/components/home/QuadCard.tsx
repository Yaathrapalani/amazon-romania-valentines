import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface QuadItem {
  title: string;
  image: string;
  category?: string;
  query?: string;
}

interface QuadCardProps {
  title: string;
  items: QuadItem[];
  linkText?: string;
  category?: string;
}

export const QuadCard: React.FC<QuadCardProps> = ({
  title,
  items,
  linkText = 'See more',
  category,
}) => {
  const navigate = useNavigate();

  const handleClick = (item?: QuadItem) => {
    if (item?.query) {
      navigate(`/search?q=${encodeURIComponent(item.query)}`);
    } else if (item?.category || category) {
      navigate(`/search?category=${encodeURIComponent(item?.category || category || 'All')}`);
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
        borderRadius: '0px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        zIndex: 10,
        height: '420px',
      }}
    >
      <div>
        <h2 style={{ fontSize: '21px', fontWeight: 700, color: '#0f1111', marginBottom: '14px', lineHeight: 1.25 }}>
          {title}
        </h2>

        {/* 2x2 Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {items.slice(0, 4).map((it, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(it)}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            >
              <div
                style={{
                  height: '105px',
                  backgroundColor: '#ffffff',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={it.image}
                  alt={it.title}
                  style={{
                    maxHeight: '100px',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
              </div>
              <span style={{ fontSize: '12px', color: '#0f1111', marginTop: '4px', lineHeight: 1.2 }}>
                {it.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <span
          onClick={() => handleClick()}
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
