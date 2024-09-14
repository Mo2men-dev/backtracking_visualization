function isValid(grid: number[][], r: number, c: number, num: number, gridSize: number = 3) {
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

export function solve(grid: number[][], r: number = 0, c: number = 0, steps: { cell: { r: number, c: number }, grid: number[][] }[], gridSize: number = 3) {
    steps.push({
        cell: { r, c },
        grid: grid.map(row => row.slice())
    })


    if (r === gridSize ** 2) {
        return true
    }

    if (c === gridSize ** 2) {
        return solve(grid, r + 1, 0, steps)
    }

    if (grid[r][c] !== 0) {
        return solve(grid, r, c + 1, steps)
    }

    for (let num = 1; num <= gridSize ** 2; num++) {
        if (isValid(grid, r, c, num)) {
            grid[r][c] = num

            if (solve(grid, r, c + 1, steps)) {
                return true
            }

            grid[r][c] = 0
        }
    }

    return false
}