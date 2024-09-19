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

export function solveSudoko(grid: number[][], r: number = 0, c: number = 0, dispatch: React.Dispatch<any>, gridSize: number = 3) {
    dispatch({ type: 'ADD_STEP', payload: { 
        grid: grid.map(row => row.slice()),
        cell: { r, c } }
    })

    if (r === gridSize ** 2) {
        return true
    }

    if (c === gridSize ** 2) {
        return solveSudoko(grid, r + 1, 0, dispatch)
    }

    if (grid[r][c] !== 0) {
        return solveSudoko(grid, r, c + 1, dispatch)
    }

    for (let num = 1; num <= gridSize ** 2; num++) {
        if (isValidSudoko(grid, r, c, num)) {
            grid[r][c] = num

            if (solveSudoko(grid, r, c + 1, dispatch)) {
                return true
            }

            grid[r][c] = 0
        }
    }

    return false
}