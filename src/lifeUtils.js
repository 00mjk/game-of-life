export function getNewCellState(grid, x, y) {
    let isPopulated = grid[x][y];
    let populatedNeighbours = getPopulatedNeighbours(grid, x, y);
    if (!isPopulated) {
        return populatedNeighbours.length === 3;
    }
    return [2, 3].includes(populatedNeighbours.length);
}

export function getPopulatedNeighbours(grid, x, y) {
    return [
        grid[x - 1] && grid[x - 1][y - 1],
        grid[x - 1] && grid[x - 1][y],
        grid[x - 1] && grid[x - 1][y + 1],
        grid[x][y - 1],
        grid[x][y + 1],
        grid[x + 1] && grid[x + 1][y - 1],
        grid[x + 1] && grid[x + 1][y],
        grid[x + 1] && grid[x + 1][y + 1]
    ].filter(Boolean);
}

export function getNextGrid(oldGrid) {
    let numRows = oldGrid.length;
    let numColumns = oldGrid[0].length;
    let grid = getEmptyGrid(numRows, numColumns);
    return grid.map((row, x) => {
        return row.map((cell, y) => {
            return getNewCellState(oldGrid, x, y);
        })
    });
}

export function getInitialRandomGrid(numRows, numColumns, seedChanceOfLife) {
    return randomize(
        getEmptyGrid(numRows, numColumns),
        seedChanceOfLife
    );
}

export function getEmptyGrid(numRows, numColumns) {
    return Array(numRows).fill(false).map(() => new Array(numColumns).fill(false));
}

export function randomize(grid, seedChanceOfLife) {
    return grid.map((row) => {
        return row.map((cell) => {
            return Math.random() * 100 <= seedChanceOfLife;
        });
    });
}