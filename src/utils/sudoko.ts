function isValidSudoko(grid: number[][], r: number, c: number, num: number, gridSize: number = 3) {
    const row = grid[r]
    const col = grid.map(row => row[c])

    const subRowStart = Math.floor((r / gridSize)) * gridSize
    const subColStart = Math.floor((c / gridSize)) * gridSize

    const isInRow = row.includes(num)
    const isInCol = col.includes(num)

    const isInSubGrid = grid.slice(subRowStart, subRowStart + gridSize)
        .map(row => row.slice(subColStart, subColStart + gridSize))
        .flat()
        .includes(num)
    
    return !isInRow && !isInCol && !isInSubGrid
}

export function solveSudoko(grid: number[][], r: number = 0, c: number = 0, dispatch: React.Dispatch<any>, gridSize: number = 3, recordSteps: boolean = true) {
    if (r === gridSize ** 2) {
        return true
    }

    if (c === gridSize ** 2) {
        return solveSudoko(grid, r + 1, 0, dispatch, gridSize, recordSteps)
    }

    if (grid[r][c] !== 0) {
        if (recordSteps) {
            dispatch({ type: 'ADD_STEP', payload: { 
                grid: grid.map(row => row.slice()),
                cell: { r, c: c + 1 },
                description: {
                    type: 'skip',
                    text: `Cell (${r}, ${c + 1}) already filled.`
                }
            }
            })
        }
        return solveSudoko(grid, r, c + 1, dispatch, gridSize, recordSteps)
    }

    for (let num = 1; num <= gridSize ** 2; num++) {

        // Randomize the number to be placed in the cell (this is for generating the grid only)
        if (!recordSteps) num = Math.floor(Math.random() * gridSize ** 2) + 1

        if (isValidSudoko(grid, r, c, num)) {
            grid[r][c] = num

            if (solveSudoko(grid, r, c + 1, dispatch, gridSize, recordSteps)) {
                return true
            } else {
                if (recordSteps) {
                    dispatch({ type: 'ADD_STEP', payload: { 
                        grid: grid.map(row => row.slice()),
                        cell: { r, c: c + 1 },
                        description: {
                            type: 'backtrack',
                            text: `Backtracking...`
                        }
                    }
                    })
                }
            }

        } else {
            if (recordSteps) {
                grid[r][c] = num
                dispatch({ type: 'ADD_STEP', payload: { 
                    grid: grid.map(row => row.slice()),
                    cell: { r, c: c + 1 },
                    description: {
                        type: 'check',
                        text: `Invalid number. Trying... ${num}`
                    }
                }
                })
            }
        }

        grid[r][c] = 0
    }

    return false
}

export function generateSudokoGrid(dispatch: React.Dispatch<any>, difficulty: number = 0.5, gridSize: number = 3) {
    let grid: number[][] = [];

    for (let i = 0; i < gridSize ** 2; i++) {
        grid.push(new Array(gridSize ** 2).fill(0))
    }

    solveSudoko(grid, 0, 0, dispatch, gridSize, false);

    let cells = gridSize ** 4
    let remainingCells = Math.floor(cells * difficulty / 100)

    while (remainingCells > 0) {
        let r = Math.floor(Math.random() * gridSize ** 2)
        let c = Math.floor(Math.random() * gridSize ** 2)

        if (grid[r][c] !== 0) {
            grid[r][c] = 0
            remainingCells--
        }
    }

    return grid;
}