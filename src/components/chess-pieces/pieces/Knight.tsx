import React from "react";
import { PieceWrapper } from "./PieceWrapper";

export const Knight: React.FC<{ color: "white" | "black" }> = ({
    color,
}) => (
    <PieceWrapper>
        <defs>
            <linearGradient
                id={`knight-grad-${color}`}
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
        <path
            d="
                M18,3
                C16.5,3 15,4 14.8,5.5
                C14.5,7 15.5,8 16.5,9
                C14.8,10 13.5,12 13.5,14
                C13.5,16.5 15.5,18 17.5,18.5
                C19,19 20.5,18.8 21.5,18
                C22.5,17 23,15.5 22.5,14
                C22,12.5 20.5,11.5 19.5,11
                C20.5,10 21.5,8.5 21,7
                C20.5,6 19,5.5 18,5.5
                C18.5,5 19,4 18.5,3.5
                C18,3 17,3 16.5,3.5
                C16,4 16.5,4.5 17,4.5
                C16.5,5 15.8,5.5 15.8,6.2
                C15.8,6.8 16.5,7.2 17,7.5
                C16.5,8 15.5,9 15.8,10
                C16,11 17,11.5 18.2,11
                C19,10.8 20,10 19.5,9.5
                C18.5,9 17,9.5 17,10
                C17,10.5 18.2,10.8 18.5,11
                C18.8,11.5 18.5,12.5 18,13
                C17.5,13.5 17,14 17.2,14.5
                C17.5,15 18.2,15 19,14.5
                C20,14 21,13 20.8,12
                C20.5,11 19.5,10.5 18.5,10.5
                Z
                M12,22
                L24,22
                L24,20
                L12,20
                Z
            "
            fill={`url(#knight-grad-${color})`}
            stroke={color === "white" ? "#999999" : "#000000"}
            strokeWidth="1"
        />
    </PieceWrapper>
);
