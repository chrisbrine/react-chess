import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieceSvg } from './chess-pieces/PieceSvg';
import { pieceVariants, checkAnimation } from '../animations/pieceAnimations';

interface ChessPieceProps {
  type: string;
  color: 'white' | 'black';
  square: string;
  isCaptured?: boolean;
  isCheck?: boolean;
}

export const ChessPiece: React.FC<ChessPieceProps> = ({ type, color, square, isCaptured, isCheck }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        layoutId={`piece-${square}`}
        initial="initial"
        animate={isCheck ? checkAnimation : "animate"}
        exit="exit"
        variants={pieceVariants}
        whileHover="hover"
        style={{ 
          position: 'absolute',
          filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))',
          zIndex: isCheck ? 20 : 10
        }}
      >
        <motion.div
          animate={isCaptured ? {
            scale: [1, 1.2, 0],
            rotate: [0, 180, 360],
            opacity: [1, 0.8, 0]
          } : {}}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <PieceSvg type={type} color={color} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};