import React, { useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import ChessSquare from "./ChessSquare";
import GameStatus from "./GameStatus";
import { getSquareNotation } from "../utils/chessHelpers";
import { Piece, Square } from "chess.js";
import CapturedPiece from "./CapturedPiece";
import PromotionPopup from "./PromotionPopup";

interface CapturedPieces {
    whitePieces: Piece[];
    blackPieces: Piece[];
}

interface PromotionState {
    display: boolean;
    piece: Piece;
    moveTo: Square;
    color: "white" | "black";
}

const ChessBoard: React.FC = () => {
    const [capturedPieces, setCapturedPieces] =
        React.useState<CapturedPieces>({
            whitePieces: [],
            blackPieces: [],
        });
    const [promotionState, setPromotionState] =
        React.useState<PromotionState>({
            display: false,
            piece: { type: "q", color: "w" },
            moveTo: "a1",
            color: "white",
        });

    const cancelPromotion = () => {
        setPromotionState((prev) => ({ ...prev, display: false }));
    };

    const setPromotionStateAndDisplay = (piece: Piece) => {
        const { moveTo } = promotionState;
        cancelPromotion();
        handleMove(selectedSquare as Square, moveTo, piece);
    };

    const capturePiece = useCallback((piece: Piece) => {
        if (piece.color === "w") {
            setCapturedPieces((prev) => ({
                ...prev,
                whitePieces: [...prev.whitePieces, piece],
            }));
        } else {
            setCapturedPieces((prev) => ({
                ...prev,
                blackPieces: [...prev.blackPieces, piece],
            }));
        }
    }, []);
    const validateMoves = useCallback((squares: Square[]) => {
        return squares.map((square) => {
            if (square.includes("=")) {
                square = square.split("=")[0] as Square;
            }
            if (square.endsWith("+")) {
                square = square.slice(0, -1) as Square;
            }
            return square.slice(-2);
        }) as Square[];
    }, []);
    const {
        chess,
        currentPlayer,
        isCheck,
        isCheckmate,
        isStalemate,
        makeMove,
    } = useGameStore();
    const [selectedSquare, setSelectedSquare] =
        React.useState<Square | null>(null);
    const [validMoves, setValidMoves] = React.useState<Square[]>([]);

    const handleMove = useCallback(
        (from: Square, to: Square, promotion?: Piece) => {
            const moved = promotion
                ? makeMove(from as Square, to, promotion?.type)
                : makeMove(from as Square, to);
            if (moved.moved) {
                setSelectedSquare(null);
                setValidMoves([]);
                if (moved.capturedPiece) {
                    capturePiece(moved.capturedPiece);
                }
            } else if (chess.get(to)?.color === currentPlayer[0]) {
                setSelectedSquare(to);
                setValidMoves(
                    validateMoves(chess.moves({ square: to }) as Square[])
                );
            }
        },
        [chess, currentPlayer, makeMove, capturePiece, validateMoves]
    );

    const handleSquareClick = useCallback(
        (square: Square) => {
            if (selectedSquare) {
                if (selectedSquare === square) {
                    setSelectedSquare(null);
                    setValidMoves([]);
                    return;
                }
                // check if pawn moving to row 8 or 1
                if (
                    chess.get(selectedSquare)?.type === "p" &&
                    (square[1] === "1" || square[1] === "8")
                ) {
                    setPromotionState({
                        display: true,
                        piece: chess.get(selectedSquare) as Piece,
                        color:
                            currentPlayer[0] === "w" ? "white" : "black",
                        moveTo: square,
                    });
                    return;
                }
                handleMove(selectedSquare, square);
            } else if (chess.get(square)?.color === currentPlayer[0]) {
                setSelectedSquare(square);
                setValidMoves(
                    validateMoves(chess.moves({ square }) as Square[])
                );
            }
        },
        [
            selectedSquare,
            handleMove,
            chess,
            currentPlayer,
            setPromotionState,
        ]
    );

    const checkValidMove = useCallback(
        (square: Square) => {
            const piece = chess.get(selectedSquare as Square);
            if (piece.type === "k") {
                const castingRights = chess.getCastlingRights(piece.color);
                if (
                    square === "g1" &&
                    piece.color === "w" &&
                    castingRights.k
                ) {
                    // verify that the spaces between the king and rook are empty
                    const spaces = ["f1", "g1"];
                    const isEmpty = spaces.every(
                        (space) => !chess.get(space as Square)
                    );
                    return isEmpty;
                } else if (
                    square === "c1" &&
                    piece.color === "w" &&
                    castingRights.q
                ) {
                    const spaces = ["b1", "c1", "d1"];
                    const isEmpty = spaces.every(
                        (space) => !chess.get(space as Square)
                    );
                    return isEmpty;
                } else if (
                    square === "g8" &&
                    piece.color === "b" &&
                    castingRights.k
                ) {
                    const spaces = ["f8", "g8"];
                    const isEmpty = spaces.every(
                        (space) => !chess.get(space as Square)
                    );
                    return isEmpty;
                } else if (
                    square === "c8" &&
                    piece.color === "b" &&
                    castingRights.q
                ) {
                    const spaces = ["b8", "c8", "d8"];
                    const isEmpty = spaces.every(
                        (space) => !chess.get(space as Square)
                    );
                    return isEmpty;
                }
            }
            // if pawn and in validMoves and if in last or first row then promotion
            if (
                piece.type === "p" &&
                validMoves.includes(square) &&
                (square[1] === "1" || square[1] === "8")
            ) {
                setPromotionStateAndDisplay({
                    type: "q",
                    color: piece.color,
                });
            }
            return validMoves.includes(square);
        },
        [chess, validMoves, setPromotionStateAndDisplay]
    );

    const borderColor =
        isCheckmate || isStalemate
            ? "border-emerald-900"
            : isCheck
            ? "border-red-500"
            : currentPlayer === "white"
            ? "border-white"
            : "border-black";
    const boardDivClasses = `grid grid-cols-8 gap-0 border-2 ${borderColor} rounded-lg overflow-hidden shadow-2xl`;

    const boardVariants = {
        initial: { scale: 0.9, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.05,
            },
        },
    };

    const renderSquares = useMemo(() => {
        // Render the chess board squares
        // This should be memoized to avoid unnecessary re-renders
        return (
            <motion.div
                className={boardDivClasses}
                variants={boardVariants}
                initial="initial"
                animate="animate"
            >
                <AnimatePresence>
                    {Array.from({ length: 8 }).map((_, i) =>
                        Array.from({ length: 8 }).map((_, j) => {
                            const square: Square = getSquareNotation(
                                i,
                                j
                            ) as Square;
                            const piece = chess.get(square);
                            const isSelected = selectedSquare === square;
                            const isValidMove = checkValidMove(square);

                            return (
                                <ChessSquare
                                    key={square}
                                    i={i}
                                    j={j}
                                    square={square}
                                    piece={piece}
                                    isSelected={isSelected}
                                    isValidMove={isValidMove}
                                    onSquareClick={handleSquareClick}
                                />
                            );
                        })
                    )}
                </AnimatePresence>
            </motion.div>
        );
    }, [selectedSquare, validMoves, handleSquareClick]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-600 p-8">
            <GameStatus
                isCheckmate={isCheckmate}
                isStalemate={isStalemate}
                isCheck={isCheck}
                currentPlayer={currentPlayer}
            />
            {renderSquares}
            <div className="flex space-around gap-4 p-4 min-h-28 w-96">
                <div className="grow flex flex-wrap w-1/2 justify-end">
                    <CapturedPiece pieces={capturedPieces.blackPieces} />
                </div>
                <div className="grow flex flex-wrap w-1/2 justify-start">
                    <CapturedPiece pieces={capturedPieces.whitePieces} />
                </div>
            </div>
            <PromotionPopup
                current={promotionState.piece}
                color={promotionState.color}
                display={promotionState.display}
                onSelect={setPromotionStateAndDisplay}
                onCancel={cancelPromotion}
            />
        </div>
    );
};

export default ChessBoard;
