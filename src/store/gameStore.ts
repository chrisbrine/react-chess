import { create } from "zustand";
import { Chess, Piece, Square } from "chess.js";
import type { Move } from "../types/chess";

export interface makeMoveResult {
    moved: boolean;
    capturedPiece: Piece | null;
}

interface GameState {
    chess: Chess;
    moves: Move[];
    currentPlayer: "white" | "black";
    isCheck: boolean;
    isCheckmate: boolean;
    isStalemate: boolean;
    makeMove: (
        from: string,
        to: string,
        promotion?: string
    ) => makeMoveResult;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    chess: new Chess(),
    moves: [],
    currentPlayer: "white",
    isCheck: false,
    isCheckmate: false,
    isStalemate: false,

    makeMove: (from: string, to: string, promotion: string = "q") => {
        const result: makeMoveResult = {
            moved: false,
            capturedPiece: null,
        };
        const { chess } = get();
        try {
            const move = chess.move({ from, to, promotion });
            if (move) {
                // Handle en passant capture
                if (move.flags.includes("e")) {
                    const captureSquare =
                        move.to[0] +
                        (parseInt(move.to[1]) +
                            (move.color === "w" ? -1 : 1));
                    chess.remove(captureSquare as Square);
                }

                set({
                    currentPlayer:
                        chess.turn() === "w" ? "white" : "black",
                    isCheck: chess.isCheck(),
                    isCheckmate: chess.isCheckmate(),
                    isStalemate: chess.isStalemate(),
                    moves: [
                        ...get().moves,
                        {
                            from: {
                                x: from.charCodeAt(0) - 97,
                                y: parseInt(from[1]) - 1,
                            },
                            to: {
                                x: to.charCodeAt(0) - 97,
                                y: parseInt(to[1]) - 1,
                            },
                            piece: {
                                type: move.piece as any,
                                color:
                                    move.color === "w" ? "white" : "black",
                                position: {
                                    x: to.charCodeAt(0) - 97,
                                    y: parseInt(to[1]) - 1,
                                },
                            },
                        },
                    ],
                });
                result.moved = true;
                // check if a piece was captured
                if (move.captured) {
                    result.capturedPiece = {
                        type: move.captured,
                        color: move.color === "w" ? "b" : "w",
                    } as Piece;
                }
            }
        } catch (error) {
            console.error("Invalid move", error);
        }
        return result;
    },

    resetGame: () => {
        set({
            chess: new Chess(),
            moves: [],
            currentPlayer: "white",
            isCheck: false,
            isCheckmate: false,
        });
    },
}));
