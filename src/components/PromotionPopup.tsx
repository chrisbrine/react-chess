import React, { useEffect } from "react";
import { Piece } from "chess.js";
import { PieceSvg } from "./chess-pieces/PieceSvg";

interface PromotionProps {
    current: Piece;
    color: "white" | "black";
    display: boolean;
    onSelect: (piece: Piece) => void;
    onCancel: () => void;
}

const pieceTypes = ["q", "r", "b", "n"];

const PromotionPopup: React.FC<PromotionProps> = ({
    current,
    color,
    display,
    onSelect,
    onCancel,
}) => {
    const [selected, setSelected] = React.useState<Piece | null>(current);

    // useEffect for current
    useEffect(() => {
        setSelected(current);
    }, [current]);

    const allDivsCss =
        "w-10 h-10 flex items-center justify-center rounded-lg";
    const selectedCss = allDivsCss + " border border-blue-500";
    const unselectedCss = allDivsCss + " border border-transparent";
    const containerCss = !display
        ? "hidden"
        : "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 h-full w-full bg-opacity-50";
    const subContainerCss =
        "absolute p-4 rounded-lg shadow-lg flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900";

    const selectDiv = (type: string) => {
        console.log(type);
        if (type === selected?.type) {
            setSelected(null);
        } else {
            setSelected({
                type,
                color: color === "white" ? "w" : "b",
            } as Piece);
        }
    };

    const submit = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (selected) {
            onSelect(selected);
        }
    };

    return (
        <div
            className={containerCss}
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                e.preventDefault();
                onCancel();
            }}
        >
            <div
                className={subContainerCss}
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
                {pieceTypes.map((type) => (
                    <div
                        key={type}
                        className={
                            selected?.type === type
                                ? selectedCss
                                : unselectedCss
                        }
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            e.preventDefault();
                            selectDiv(type);
                        }}
                    >
                        <PieceSvg type={type} color={color} />
                    </div>
                ))}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4"
                    onClick={submit}
                >
                    Choose
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg ml-4"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onCancel();
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PromotionPopup;
