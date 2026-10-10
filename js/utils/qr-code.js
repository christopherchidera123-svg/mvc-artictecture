export function createQrMatrix(payload) {
    const size = 21;
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));

    const addFinder = (x, y) => {
        for (let row = 0; row < 7; row += 1) {
            for (let column = 0; column < 7; column += 1) {
                const isBoundary = row === 0 || row === 6 || column === 0 || column === 6;
                const isCenter = row >= 2 && row <= 4 && column >= 2 && column <= 4;
                matrix[y + row][x + column] = isBoundary || isCenter ? 1 : 0;
            }
        }
    };

    addFinder(0, 0);
    addFinder(size - 7, 0);
    addFinder(0, size - 7);

    for (let index = 0; index < size; index += 1) {
        matrix[6][index] = 1;
        matrix[index][6] = 1;
    }

    const seed = Array.from(payload).reduce((total, char) => total + char.charCodeAt(0), 0);

    for (let row = 0; row < size; row += 1) {
        for (let column = 0; column < size; column += 1) {
            if (matrix[row][column] !== 0) continue;
            const shouldFill = ((row * 17 + column * 31 + seed + row * column) % 7) >= 3;
            matrix[row][column] = shouldFill ? 1 : 0;
        }
    }

    return matrix;
}
