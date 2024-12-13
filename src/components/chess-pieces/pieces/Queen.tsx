import React from 'react';
import { PieceWrapper } from './PieceWrapper';

export const Queen: React.FC<{ color: 'white' | 'black' }> = ({ color }) => (
  <PieceWrapper>
    <defs>
      <linearGradient id={`queen-grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: color === 'white' ? '#FFFFFF' : '#666666' }} />
        <stop offset="100%" style={{ stopColor: color === 'white' ? '#DDDDDD' : '#222222' }} />
      </linearGradient>
    </defs>
    <path
      d="M18,7 C16.5,7 15,8.5 15,10 C15,10.5 15.5,11 16,11 L20,11 C20.5,11 21,10.5 21,10 C21,8.5 19.5,7 18,7 Z M11,14 C11,11.5 13,10 18,10 C23,10 25,11.5 25,14 C25,16 23,17 21,18 C19,19 19,20 19,22 L17,22 C17,19 17,18 15,17 C13,16 11,15 11,14 Z M12,23 L24,23 L24,21 L12,21 Z"
      fill={`url(#queen-grad-${color})`}
      stroke={color === 'white' ? '#999999' : '#000000'}
      strokeWidth="1"
    />
  </PieceWrapper>
);