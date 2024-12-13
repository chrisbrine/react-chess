import React from 'react';
import { Pawn } from './pieces/Pawn';
import { Rook } from './pieces/Rook';
import { Knight } from './pieces/Knight';
import { Bishop } from './pieces/Bishop';
import { Queen } from './pieces/Queen';
import { King } from './pieces/King';

interface PieceSvgProps {
  type: string;
  color: 'white' | 'black';
}

export const PieceSvg: React.FC<PieceSvgProps> = ({ type, color }) => {
  const props = { color };
  
  switch (type) {
    case 'p': return <Pawn {...props} />;
    case 'r': return <Rook {...props} />;
    case 'n': return <Knight {...props} />;
    case 'b': return <Bishop {...props} />;
    case 'q': return <Queen {...props} />;
    case 'k': return <King {...props} />;
    default: return null;
  }
};