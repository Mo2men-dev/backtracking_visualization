function isValidQueens(board: number[][], row: number, col: number): boolean {
  for (let i = 0; i < col; i++) {
    if (board[row][i] === 1) {
      return false;
    }
  }

  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 1) {
      return false;
    }
  }

  for (let i = row, j = col; j >= 0 && i < board.length; i++, j--) {
    if (board[i][j] === 1) {
      return false;
    }
  }

  return true;
}

export function solveQueens(grid: number[][], r: number = 0, c: number = 0, steps: { cell: { r: number, c: number }, grid: number[][] }[], gridSize: number = 4): boolean {
    steps.push({
        cell: { r, c },
        grid: grid.map(row => row.slice())
    });
    
    if (c === gridSize) return true;
    
    for (let i = 0; i < gridSize; i++) {
        if (isValidQueens(grid, i, c)) {
            grid[i][c] = 1;
            if (solveQueens(grid, i, c + 1, steps, gridSize)) return true;
            grid[i][c] = 0;
        }
    }
    
    return false;
}