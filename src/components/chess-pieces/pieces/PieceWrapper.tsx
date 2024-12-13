import React from 'react';

interface PieceWrapperProps {
  children: React.ReactNode;
}

export const PieceWrapper: React.FC<PieceWrapperProps> = ({ children }) => (
  <svg
    viewBox="0 0 36 36"
    width="48"
    height="48"
    className="drop-shadow-xl filter"
  >
    <filter id="piece-shadow">
      <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.5" />
    </filter>
    {children}
  </svg>
);