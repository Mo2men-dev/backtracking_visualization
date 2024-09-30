export function border(i: number, j: number, gridSize: number = 3) {
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


export function roundedCorners(i: number, j: number, gridSize: number = 4) {

    if (i === 0 && j === 0) return 'rounded-tl-lg'
    if (i === 0 && j === gridSize - 1) return 'rounded-tr-lg'
    if (i === gridSize - 1 && j === 0) return 'rounded-bl-lg'
    if (i === gridSize - 1 && j === gridSize - 1) return 'rounded-br-lg'
}

export function checkeredBackground(i: number, j: number) {
    if ((i % 2 === 0) && (j % 2 !== 0) || (i % 2 !== 0) && (j % 2 === 0)) {
        return 'bg-orange-200'
    } else {
        return 'bg-black'
    }
}

export function stepType(type: string) {
    switch (type) {
        case 'check':
            return 'text-[#4cc9f0]'
        case 'backtrack':
            return 'text-[#ff74d4] italic'
        case 'skip':
            return 'text-[#00ff00]'
        default:
            return 'text-white'
    }
}