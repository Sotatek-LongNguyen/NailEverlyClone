function getTabColorByIndex(i) {
    const rVal =
        i === 0
            ? 142
            : i === 1
                ? 89
                : i === 2
                    ? 241
                    : i === 3
                        ? 233
                        : 255;
    const gVal =
        i === 0
            ? 181
            : i === 1
                ? 167
                : i === 2
                    ? 161
                    : i === 3
                        ? 160
                        : 255;
    const bVal =
        i === 0
            ? 82
            : i === 1
                ? 241
                : i === 2
                    ? 66
                    : i === 3
                        ? 151
                        : 255;
    return {rVal, gVal, bVal};
}

export default {
    getTabColorByIndex
};