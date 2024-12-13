export const squareVariants = (isDark: boolean) => ({
    initial: { backgroundColor: isDark ? "#065f46" : "#bbf7d0" },
    hover: {
        scale: 1.05,
        transition: { duration: 0.2 },
    },
    selected: {
        backgroundColor: "#fbbf24",
        scale: 1.05,
    },
    validMove: {
        backgroundColor: "#fef08a",
        scale: 1.02,
    },
    lastMove: {
        // backgroundColor: isDark ? '#059669' : '#86efac'
        backgroundColor: isDark ? "#065f46" : "#bbf7d0",
    },
});
