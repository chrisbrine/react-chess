import { Piece } from "chess.js";
import { PieceSvg } from "./chess-pieces/PieceSvg";

interface CapturedPieceProps {
    pieces: Piece[];
}

const CapturedPiece: React.FC<CapturedPieceProps> = ({ pieces }) => {
    return (
        <>
            {pieces.map((piece, index) => (
                <div key={index} className="w-3 h-8 mx-1">
                    <PieceSvg
                        type={piece.type}
                        color={piece.color === "w" ? "white" : "black"}
                    />
                </div>
            ))}
        </>
    );
};

export default CapturedPiece;
