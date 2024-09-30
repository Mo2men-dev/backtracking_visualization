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

export function solveQueens(grid: number[][], r: number = 0, c: number = 0, dispatch: React.Dispatch<any>, gridSize: number = 4): boolean {
    dispatch({
        type: 'ADD_STEP',
        payload: { 
            grid: grid.map(row => row.slice()), 
            cell: { r, c },
            description: {
                type: 'check',
                text: `Checking cell (${r}, ${c - 1})`
            }
        }
    });

    if (c === gridSize) return true;
    
    for (let i = 0; i < gridSize; i++) {
        if (isValidQueens(grid, i, c)) {
            grid[i][c] = 1;
            if (solveQueens(grid, i, c + 1, dispatch, gridSize)) {
                return true;
            } else {
                dispatch({
                    type: 'ADD_STEP',
                    payload: { 
                        grid: grid.map(row => row.slice()), 
                        cell: { r, c },
                        description: {
                            type: 'backtrack',
                            text: `Backtracking...`
                        }
                    }
                });
            }

            grid[i][c] = 0;
        }
    }
    
    return false;
}

export function generateQueensGrid(gridSize: number = 4) {
    let grid: number[][] = [];
    
    for (let i = 0; i < gridSize; i++) {
        grid.push(new Array(gridSize).fill(0));
    }
    
    return grid;
}