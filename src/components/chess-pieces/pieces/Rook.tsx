import React from 'react';
import { PieceWrapper } from './PieceWrapper';

export const Rook: React.FC<{ color: 'white' | 'black' }> = ({ color }) => (
  <PieceWrapper>
    <defs>
      <linearGradient id={`rook-grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: color === 'white' ? '#FFFFFF' : '#666666' }} />
        <stop offset="100%" style={{ stopColor: color === 'white' ? '#DDDDDD' : '#222222' }} />
      </linearGradient>
    </defs>
    <path
      d="M14,6 L14,8 L16,8 L16,6 L20,6 L20,8 L22,8 L22,6 L14,6 Z M13,9 L23,9 L23,11 C23,12 22,13 21,13 L15,13 C14,13 13,12 13,11 L13,9 Z M14,14 L22,14 L22,20 L14,20 L14,14 Z M12,21 L24,21 L24,23 L12,23 L12,21 Z"
      fill={`url(#rook-grad-${color})`}
      stroke={color === 'white' ? '#999999' : '#000000'}
      strokeWidth="1"
    />
  </PieceWrapper>
);