import { IntialStateType } from "../types/state"
import { solveQueens } from "./queens"
import { solveSudoko } from "./sudoko"

export function play(dispatch: React.Dispatch<any>, globalState: IntialStateType) {
    // Start the animation
    dispatch({ type: 'SET_ANIMATE', payload: true })

    // Reset the pause state
    dispatch({ type: 'SET_PAUSE', payload: false })

    // If the problem is not solved yet
    if (globalState.steps.length === 0) {
        // Solve the grid and store the steps (Trigger the useEffect)
        switch (globalState.problem) {
            case 'sudoko':
                solveSudoko(globalState.initalGridCopy, 0, 0, dispatch, globalState.gridSize)
                break
            case 'n-queens':
                solveQueens(globalState.initalGridCopy, 0, 0, dispatch, globalState.gridSize)
                break
            default:
                break
        }
    }

    // Restart the animation (when in the middle of the animation)
    dispatch({ type: 'SET_CURR_ANIMATION_INDX', payload: 0 })
}

export function pause(globalState: IntialStateType, dispatch: React.Dispatch<any>) {
    if (globalState.currAnimationIndx === 0) return
    if (globalState.currAnimationIndx === globalState.steps.length) globalState.currAnimationIndx = 0

    // Toggle the pause state
    dispatch({ type: 'SET_PAUSE', payload: !globalState.pause })

    // Update the current cell
    dispatch({ type: 'SET_CURR_CELL', payload: globalState.steps[globalState.currAnimationIndx].cell })

    // Update the grid (to rerender the tree)
    dispatch({ type: 'SET_CURRENT_GRID', payload: globalState.steps[globalState.currAnimationIndx].grid })
}

export function reset(globalState: IntialStateType, dispatch: React.Dispatch<any>) {
    if (globalState.currAnimationIndx === 0) return
    if (!globalState.pause) pause(globalState, dispatch)
    if (globalState.animate) globalState.animate = false

    dispatch({ type: 'SET_CURRENT_GRID', payload: globalState.steps[0].grid })
    dispatch({ type: 'SET_CURR_ANIMATION_INDX', payload: 0 })
    dispatch({ type: 'SET_CURR_CELL', payload: { r: 0, c: 0 } })
    dispatch({ type: 'SET_ANIMATION_DONE', payload: false })
}

export function nextStep(globalState: IntialStateType, dispatch: React.Dispatch<any>) {
    if (globalState.currAnimationIndx === globalState.steps.length - 1) {
        dispatch({ type: 'SET_ANIMATION_DONE', payload: true })
        dispatch({ type: 'SET_ANIMATE', payload: false })
        return
    }
    if (globalState.currAnimationIndx === 0) return
    if (!globalState.pause) return

    globalState.currAnimationIndx++
    dispatch({ type: 'SET_CURR_CELL', payload: globalState.steps[globalState.currAnimationIndx].cell })
    dispatch({ type: 'SET_CURRENT_GRID', payload: globalState.steps[globalState.currAnimationIndx].grid })
}