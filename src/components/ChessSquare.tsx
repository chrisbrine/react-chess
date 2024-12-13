import React from "react";
import { motion } from "framer-motion";
import { ChessPiece } from "./ChessPiece";
import { isSquareDark } from "../utils/chessHelpers";
import { useGameStore } from "../store/gameStore";
import { squareVariants } from "../animations/squareAnimations";
import { Square } from "chess.js";

interface ChessSquareProps {
    i: number;
    j: number;
    square: Square;
    piece: {
        type: string;
        color: "w" | "b";
    } | null;
    isSelected: boolean;
    isValidMove: boolean;
    onSquareClick: (square: Square) => void;
}

const ChessSquare: React.FC<ChessSquareProps> = ({
    i,
    j,
    square,
    piece,
    isSelected,
    isValidMove,
    onSquareClick,
}) => {
    const isDark = isSquareDark(i, j);
    const { isCheck, isCheckmate, isStalemate, currentPlayer, moves } =
        useGameStore();

    const isLastMove =
        moves.length > 0 &&
        ((moves[moves.length - 1].from.x === j &&
            moves[moves.length - 1].from.y === 7 - i) ||
            (moves[moves.length - 1].to.x === j &&
                moves[moves.length - 1].to.y === 7 - i));
    const spaceOccupied = !!piece;

    return (
        <motion.div
            className="w-16 h-16 flex items-center justify-center relative"
            variants={squareVariants(isDark)}
            initial="initial"
            animate={[
                isSelected && !isCheckmate && !isStalemate
                    ? "selected"
                    : isValidMove
                    ? "validMove"
                    : isLastMove
                    ? "lastMove"
                    : "initial",
            ]}
            whileHover="hover"
            onClick={() => onSquareClick(square)}
        >
            {isValidMove &&
                (spaceOccupied ? (
                    <motion.div
                        className="absolute w-10 h-10 rounded-full bg-red-400 opacity-50"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                    />
                ) : (
                    <motion.div
                        className="absolute w-4 h-4 rounded-full bg-yellow-400 opacity-50"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                    />
                ))}
            {piece && (
                <ChessPiece
                    type={piece.type}
                    color={piece.color === "w" ? "white" : "black"}
                    square={square}
                    isCheck={
                        isCheck &&
                        !isCheckmate &&
                        !isStalemate &&
                        piece.type === "k" &&
                        piece.color === currentPlayer[0]
                    }
                />
            )}
        </motion.div>
    );
};

export default ChessSquare;
