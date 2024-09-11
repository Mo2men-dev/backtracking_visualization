export const gridSize = 3

export function border(i: number, j: number) {
    let border = 'border-r-2 border-b-2 border-white'

    if (i === gridSize ** 2 - 1) {
        border = 'border-r-2 border-white'
    }

    if (j === gridSize ** 2 - 1) {
        border = 'border-b-2 border-white'
    }

    if (i === gridSize ** 2 - 1 && j === gridSize ** 2 - 1) {
        border = ''
    }

    if (j === gridSize - 1 || j === 2 * gridSize - 1) {
        border = `border-r-4 border-r-blue-500 ${i === gridSize ** 2 - 1 ? "" : "border-b-2"} border-white`
    }

    if (i === gridSize - 1 || i === 2 * gridSize - 1) {
        border = `border-b-4 border-b-blue-500 ${j === gridSize ** 2 - 1 ? "" : "border-r-2"} border-white`
    }

    if (
        (i === gridSize - 1 && j === gridSize - 1) ||
        (i === 2 * gridSize - 1 && j === 2 * gridSize - 1) ||
        (i === gridSize - 1 && j === 2 * gridSize - 1) ||
        (i === 2 * gridSize - 1 && j === gridSize - 1)
    ) {
        border = `border-r-4 border-b-4 border-b-blue-500 border-r-blue-500`
    }

    return border
}

function isValid(grid: number[][], r: number, c: number, num: number) {
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

export function solve(grid: number[][], r: number = 0, c: number = 0, steps: { cell: { r: number, c: number }, grid: number[][] }[]) {
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