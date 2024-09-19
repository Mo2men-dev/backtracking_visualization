import { IntialStateType } from "../types/state"
import { solveQueens } from "./queens"
import { solveSudoko } from "./sudoko"

export function play(startingIndex: number = 0, dispatch: React.Dispatch<any>, globalState: IntialStateType) {
    // Start the animation
    dispatch({ type: 'SET_ANIMATE', payload: true })

    // Reset the pause state
    dispatch({ type: 'SET_PAUSE', payload: false })

    // Clear the steps array
    dispatch({ type: 'SET_STEPS', payload: [] })

    // Solve the grid and store the steps (Trigger the useEffect)
    switch (globalState.problem) {
        case 'sudoko':
            solveSudoko(globalState.initalGridCopy, 0, 0, dispatch, globalState.gridSize)
            break
        case 'n-queens':
            solveQueens(globalState.initalGridCopy, 0, 0, globalState.steps, globalState.gridSize)
            break
        default:
            break
    }

    // Reset the current animation index
    dispatch({ type: 'SET_CURR_ANIMATION_INDX', payload: startingIndex })
}

export function pause(globalState: IntialStateType) {
    if (globalState.currAnimationIndx === 0) return
    if (globalState.currAnimationIndx === globalState.steps.length) globalState.currAnimationIndx = 0

    // Toggle the pause state
    globalState.pause = !globalState.pause

    // Update the current cell
    globalState.currCell = globalState.steps[globalState.currAnimationIndx].cell

    // Update the grid (to rerender the tree)
    globalState.currentGrid = globalState.steps[globalState.currAnimationIndx].grid
}

export function reset(globalState: IntialStateType) {
    if (globalState.currAnimationIndx === 0) return
    if (!globalState.pause) pause(globalState)
    if (globalState.animate) globalState.animate = false

    globalState.currentGrid = globalState.steps[0].grid
    globalState.currAnimationIndx = 0
    globalState.currCell = { r: 0, c: 0 }
    globalState.animationDone = false
}

export function nextStep(globalState: IntialStateType) {
    if (globalState.currAnimationIndx === globalState.steps.length) return
    if (globalState.currAnimationIndx === 0) return
    if (!globalState.pause) return
    globalState.currAnimationIndx++
    globalState.currCell = globalState.steps[globalState.currAnimationIndx].cell

    globalState.currentGrid = globalState.steps[globalState.currAnimationIndx].grid
}