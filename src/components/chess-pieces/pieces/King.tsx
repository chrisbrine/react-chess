import React from "react";
import { PieceWrapper } from "./PieceWrapper";

export const King: React.FC<{ color: "white" | "black" }> = ({
    color,
}) => (
    <PieceWrapper>
        <defs>
            <linearGradient
                id={`king-grad-${color}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
            >
                <stop
                    offset="0%"
                    style={{
                        stopColor:
                            color === "white" ? "#FFFFFF" : "#666666",
                    }}
                />
                <stop
                    offset="100%"
                    style={{
                        stopColor:
                            color === "white" ? "#DDDDDD" : "#222222",
                    }}
                />
            </linearGradient>
        </defs>
        {/* Crown */}
        <path
            d="M16,4 L20,4 L18,2 Z M14,5 L16,4 L18,6 L20,4 L22,5 L18,8 Z"
            fill={`url(#king-grad-${color})`}
            stroke={color === "white" ? "#999999" : "#000000"}
            strokeWidth="1.5"
        />
        {/* Cross on top of crown */}
        <path
            d="M18,1 L18,3 M17,2 L19,2"
            fill="none"
            stroke={color === "white" ? "#999999" : "#000000"}
            strokeWidth="1"
        />
        {/* Main Body */}
        <path
            d="M11,14 C11,11.5 13,10 18,10 C23,10 25,11.5 25,14 C25,16 23,17 21,18 C19,19 19,20 19,22 L17,22 C17,19 17,18 15,17 C13,16 11,15 11,14 Z M12,23 L24,23 L24,21 L12,21 Z"
            fill="none"
            stroke={color === "white" ? "#999999" : "#000000"}
            strokeWidth="1.5"
        />
        <path
            d="M11,14 C11,11.5 13,10 18,10 C23,10 25,11.5 25,14 C25,16 23,17 21,18 C19,19 19,20 19,22 L17,22 C17,19 17,18 15,17 C13,16 11,15 11,14 Z"
            fill={`url(#king-grad-${color})`}
        />
    </PieceWrapper>
);
