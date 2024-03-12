import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const StarShape = ({ rating }) => {
  const totalStars = 5;

  // 별점을 계산합니다 (예: 4.5 -> [1, 1, 1, 1, 0.5])
  const fullStars = Math.floor(rating); // 전체 별의 개수
  const halfStar = rating % 1 > 0 ? 1 : 0; // 반 별의 유무 (0.5가 있으면 1, 아니면 0)
  const emptyStars = totalStars - fullStars - halfStar; // 빈 별의 개수

  return (
      <div style={{  marginTop: '10px' }}>
        {Array.from({ length: fullStars }).map((_, index) => (
            <FaStar key={index} size="25" color="mediumpurple" />
        ))}
        {halfStar === 1 && (
            <FaStarHalfAlt key={fullStars} size="25" color="mediumpurple" />
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
            <FaRegStar key={fullStars + halfStar + index} size="25" color="mediumpurple" />
        ))}
      </div>
  );
};

export default StarShape;