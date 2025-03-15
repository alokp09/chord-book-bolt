import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate, size = 20 }) => {
  const stars = [];
  const interactive = !!onRate;

  for (let i = 1; i <= 5; i++) {
    const filled = i <= rating;
    const halfFilled = i - 0.5 === rating;
    
    stars.push(
      <button
        key={i}
        onClick={() => onRate?.(i)}
        className={`${interactive ? 'cursor-pointer' : 'cursor-default'} 
          transition-colors duration-200 
          ${filled ? 'text-yellow-400' : 'text-gray-300'} 
          hover:text-yellow-400`}
        disabled={!interactive}
      >
        {halfFilled ? (
          <StarHalf size={size} />
        ) : (
          <Star size={size} fill={filled ? 'currentColor' : 'none'} />
        )}
      </button>
    );
  }

  return (
    <div className="flex space-x-1">
      {stars}
    </div>
  );
};

export default StarRating;