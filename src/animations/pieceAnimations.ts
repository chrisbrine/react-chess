export const pieceVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
  exit: { 
    scale: 0,
    rotate: 180,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "backIn"
    }
  },
  hover: {
    scale: 1.1,
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

export const checkAnimation = {
  scale: [1, 1.2, 1],
  rotate: [0, -10, 10, -10, 10, 0],
  transition: {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const
  }
};