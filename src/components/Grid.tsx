import { useEffect } from 'react'
import { useGlobalDispatch, useGlobalState } from '../context/state'
import Cell from './Cell'
import Tile from './Tile'
import { generateSudokoGrid } from '../utils/sudoko'
import { generateQueensGrid } from '../utils/queens'

function Grid() {
    const globalState = useGlobalState()
    const dispatch = useGlobalDispatch()

    useEffect(() => {
        const initialGrid = globalState.problem === 'sudoko' ? generateSudokoGrid(dispatch, globalState.sudokuDifficulty) : generateQueensGrid();

        dispatch({ type: 'SET_INITIAL_GRID', payload: initialGrid });
        dispatch({ type: 'SET_INITIAL_GRID_COPY', payload: initialGrid.map(row => row.slice()) });
        dispatch({ type: 'SET_CURRENT_GRID', payload: initialGrid.map(row => row.slice()) });
        dispatch({ type: 'SET_GRID_SIZE', payload: globalState.problem === 'sudoko' ? Math.sqrt(initialGrid[0].length) : initialGrid.length });
    }, []);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (!globalState.pause) {
                if (globalState.currAnimationIndx < globalState.steps.length - 1) {
                    dispatch({ type: 'SET_CURR_CELL', payload: globalState.steps[globalState.currAnimationIndx].cell });
                    dispatch({ type: 'SET_CURRENT_GRID', payload: globalState.steps[globalState.currAnimationIndx].grid });
                    dispatch({ type: 'SET_CURR_ANIMATION_INDX', payload: globalState.currAnimationIndx + 1 });
                } else {
                    dispatch({ type: 'SET_ANIMATION_DONE', payload: true });
                    dispatch({ type: 'SET_ANIMATE', payload: false });
                    dispatch({ type: 'SET_CURRENT_GRID', payload: globalState.steps[globalState.currAnimationIndx].grid });
                    clearTimeout(timeOut);
                }
            }
        }, globalState.animationSpeed)

        return () => clearTimeout(timeOut)
    }, [globalState.animationSpeed, globalState.pause, globalState.steps, globalState.currAnimationIndx]);
    
    return (
        <div className='w-fit h-fit'>
            {
                globalState.currentGrid.map((row, i) => {
                    return (
                        <div key={i} className='flex'>
                            {
                                row.map((cell, j) => {
                                        return globalState.problem === "" || globalState.problem === 'sudoko' ? <Cell key={j} cellVal={cell} i={i} j={j} /> : <Tile key={j} cellVal={cell} i={i} j={j} />
                                    })
                                }
                            </div>
                    )
                })
            }
    </div>
  )
}

export default Grid