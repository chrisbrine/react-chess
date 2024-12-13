export const getSquareNotation = (i: number, j: number): string => {
  return `${String.fromCharCode(97 + j)}${8 - i}`;
};

export const isSquareDark = (i: number, j: number): boolean => {
  return (i + j) % 2 === 1;
};

export const getSquareCoordinates = (square: string): { x: number, y: number } => {
  return {
    x: square.charCodeAt(0) - 97,
    y: parseInt(square[1]) - 1
  };
};