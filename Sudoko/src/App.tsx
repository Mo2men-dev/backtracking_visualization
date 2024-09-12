import { useEffect, useState } from 'react'
import { border, solve } from './utils'
import { useGlobalState } from './context/state'

function App() {
    const globalState = useGlobalState()
    globalState.initalGrid = [
        [0,7,0,0,0,4,0,0,0],
        [0,3,0,0,0,0,2,0,1],
        [1,0,6,0,0,0,0,4,0],
        [0,5,1,0,0,3,0,0,0],
        [0,6,0,1,5,0,8,0,0],
        [4,0,0,8,0,0,0,0,0],
        [0,0,5,2,0,6,0,0,0],
        [6,0,0,0,0,0,9,2,0],
        [0,0,0,3,7,0,0,0,0]
    ]
    
    globalState.initalGridCopy = globalState.initalGrid.map(row => row.slice())

    const [grid, setGrid] = useState<number[][]>(globalState.initalGrid)

    useEffect(() => {

        if (!globalState.animate) {
            setGrid(globalState.initalGridCopy)
            return
        }

        const interval = setInterval(() => {
            if (globalState.currAnimationIndx < globalState.steps.length) {
                globalState.currCell = globalState.steps[globalState.currAnimationIndx].cell
                setGrid(globalState.steps[globalState.currAnimationIndx].grid)
                globalState.currAnimationIndx++
            }
        }, 500)

        return () => clearInterval(interval)
    }, [globalState.steps])

    return (
        <div className='h-full flex items-center justify-center flex-col'>
            <div className='w-fit h-fit'>
                {
                    grid.map((row, i) => {
                        return (
                            <div key={i} className='flex'>
                                {
                                    row.map((cell, j) => {
                                        return (
                                            <div key={j} className={`px-4 py-2 select-none font-bold text-xl ${border(i, j)} ${(globalState.currCell.r === i && globalState.currCell.c === j + 1) && globalState.animate ? 'bg-blue-400 bg-opacity-25' : ''}`}>
                                                {cell === 0 ? <>&nbsp;</> : <span className={`${globalState.initalGrid[i][j] !== 0 ? 'text-green-400' : 'text-yellow-400' }`}>{cell}</span>}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
            }
            </div>
            <button onClick={() => {
                globalState.animate = true
                globalState.steps = []
                setGrid(globalState.initalGrid)
                solve(globalState.initalGridCopy, 0, 0, globalState.steps)
                globalState.currAnimationIndx = 0
            }} className='mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-md'>Solve</button>
        </div>
    )
}

export default App
