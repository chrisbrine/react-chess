import React from "react";

interface GameStatusProps {
    isCheckmate: boolean;
    isStalemate: boolean;
    isCheck: boolean;
    currentPlayer: string;
}

const upperCaseFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const GameStatus: React.FC<GameStatusProps> = ({
    isCheckmate,
    isStalemate,
    isCheck,
    currentPlayer,
}) => {
    const textColor = isStalemate
        ? "text-emerald-500"
        : isCheckmate
        ? currentPlayer === "white"
            ? "text-black"
            : "text-white"
        : currentPlayer === "white"
        ? "text-white"
        : "text-black";
    const headerClasses = `text-4xl font-bold ${textColor} mb-2`;
    const divClasses = `${textColor} text-center`;
    return (
        <div className="mb-4">
            <h1 className={headerClasses}>Chess</h1>
            <div className={divClasses}>
                {isCheckmate ? (
                    <p className="text-xl font-bold">
                        Checkmate!{" "}
                        {currentPlayer === "white" ? "Black" : "White"}{" "}
                        wins!
                    </p>
                ) : isStalemate ? (
                    <p className="text-xl font-bold">Stalemate!</p>
                ) : isCheck ? (
                    <p className="text-xl">
                        Check! {upperCaseFirstLetter(currentPlayer)}'s turn
                    </p>
                ) : (
                    <p className="text-xl">
                        {upperCaseFirstLetter(currentPlayer)}'s turn
                    </p>
                )}
            </div>
        </div>
    );
};

export default GameStatus;
