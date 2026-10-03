import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewsCount?: number;
  size?: number;
  showCount?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewsCount,
  size = 15,
  showCount = true,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'inline-flex', color: '#de7921' }}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} fill="#de7921" stroke="#de7921" />
        ))}
        {hasHalfStar && (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Star size={size} stroke="#de7921" fill="none" />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
              <Star size={size} fill="#de7921" stroke="#de7921" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} stroke="#de7921" fill="none" />
        ))}
      </div>
      {showCount && reviewsCount !== undefined && (
        <span style={{ fontSize: '13px', color: '#007185', marginLeft: '2px' }}>
          {reviewsCount.toLocaleString()}
        </span>
      )}
    </div>
  );
};
