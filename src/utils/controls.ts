import { IntialStateType } from "../context/state"
import { solveQueens } from "./queens"
import { solveSudoko } from "./sudoko"

export function play(startingIndex: number = 0, setGrid: React.Dispatch<React.SetStateAction<number[][]>>, globalState: IntialStateType) {
    // Start the animation
    globalState.animate = true

    // Reset the pause state
    globalState.pause = false

    // Clear the steps array
    globalState.steps = []
    
    // Only reset the grid if we are not in the middle of an animation
    // prevents grid reset when changing speed and pausing
    if (startingIndex === 0) {
        // Reset the grid
        setGrid(globalState.initalGrid)
    }

    // Solve the grid and store the steps (Trigger the useEffect)
    switch (globalState.problem) {
        case 'sudoko':
            solveSudoko(globalState.initalGridCopy, 0, 0, globalState.steps, globalState.gridSize)
            break
        case 'n-queens':
            solveQueens(globalState.initalGridCopy, 0, 0, globalState.steps, globalState.gridSize)
            break
        default:
            break
    }

    // Reset the current animation index
    globalState.currAnimationIndx = startingIndex
}

export function pause(setGrid: React.Dispatch<React.SetStateAction<number[][]>>, globalState: IntialStateType) {
    if (globalState.currAnimationIndx === 0) return
    if (globalState.currAnimationIndx === globalState.steps.length) globalState.currAnimationIndx = 0

    // Toggle the pause state
    globalState.pause = !globalState.pause

    // Update the current cell
    globalState.currCell = globalState.steps[globalState.currAnimationIndx].cell

    // Update the grid (to rerender the tree)
    setGrid(globalState.steps[globalState.currAnimationIndx].grid)
}

export function reset(setGrid: React.Dispatch<React.SetStateAction<number[][]>>, globalState: IntialStateType) {
    if (globalState.currAnimationIndx === 0) return
    if (!globalState.pause) pause(setGrid, globalState)
    if (globalState.animate) globalState.animate = false

    setGrid(globalState.steps[0].grid)
    globalState.currAnimationIndx = 0
    globalState.currCell = { r: 0, c: 0 }
    globalState.animationDone = false
}

export function nextStep(setGrid: React.Dispatch<React.SetStateAction<number[][]>>, globalState: IntialStateType) {
    if (globalState.currAnimationIndx === globalState.steps.length) return
    if (globalState.currAnimationIndx === 0) return
    if (!globalState.pause) return
    globalState.currAnimationIndx++
    globalState.currCell = globalState.steps[globalState.currAnimationIndx].cell
    setGrid(globalState.steps[globalState.currAnimationIndx].grid)
}