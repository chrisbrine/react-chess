import React from 'react';
import { PieceWrapper } from './PieceWrapper';

export const Pawn: React.FC<{ color: 'white' | 'black' }> = ({ color }) => (
  <PieceWrapper>
    <defs>
      <linearGradient id={`pawn-grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: color === 'white' ? '#FFFFFF' : '#666666' }} />
        <stop offset="100%" style={{ stopColor: color === 'white' ? '#DDDDDD' : '#222222' }} />
      </linearGradient>
    </defs>
    <path
      d="M22,9 C22,11.5 20.5,13 18,13 C15.5,13 14,11.5 14,9 C14,6.5 15.5,5 18,5 C20.5,5 22,6.5 22,9 Z M18,14 C14,14 11,17 11,21 L11,23 L25,23 L25,21 C25,17 22,14 18,14 Z"
      fill={`url(#pawn-grad-${color})`}
      stroke={color === 'white' ? '#999999' : '#000000'}
      strokeWidth="1"
    />
  </PieceWrapper>
);