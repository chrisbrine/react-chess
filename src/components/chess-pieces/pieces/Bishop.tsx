import React from 'react';
import { PieceWrapper } from './PieceWrapper';

export const Bishop: React.FC<{ color: 'white' | 'black' }> = ({ color }) => (
  <PieceWrapper>
    <defs>
      <linearGradient id={`bishop-grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: color === 'white' ? '#FFFFFF' : '#666666' }} />
        <stop offset="100%" style={{ stopColor: color === 'white' ? '#DDDDDD' : '#222222' }} />
      </linearGradient>
    </defs>
    <path
      d="M18,5 C16,5 14,6 14,8 C14,9 14.5,10 15,10.5 C13,12 11,14 11,17 C11,19 13,21 18,21 C23,21 25,19 25,17 C25,14 23,12 21,10.5 C21.5,10 22,9 22,8 C22,6 20,5 18,5 Z M12,23 L24,23 L24,21 L12,21 Z"
      fill={`url(#bishop-grad-${color})`}
      stroke={color === 'white' ? '#999999' : '#000000'}
      strokeWidth="1"
    />
  </PieceWrapper>
);