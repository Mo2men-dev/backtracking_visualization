import { useEffect, useState } from 'react'
import { solve } from './utils'
import { useGlobalState } from './context/state'
import Grid from './components/Grid'

function App() {
    // Get the global state
    const globalState = useGlobalState()

    // TODO: Function to generate a random grids
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
    
    // Copy the initial grid to preserve the original state
    globalState.initalGridCopy = globalState.initalGrid.map(row => row.slice())

    // The current grid being displayed
    const [grid, setGrid] = useState<number[][]>(globalState.initalGrid)

    useEffect(() => {
        // Show answer without animation
        if (!globalState.animate) {
            setGrid(globalState.initalGridCopy)
            return
        }

        // Play animation
        const interval = setInterval(() => {
            if (globalState.currAnimationIndx < globalState.steps.length) {
                // The current cell being processed by the algorithm
                globalState.currCell = globalState.steps[globalState.currAnimationIndx].cell

                // Update the grid
                setGrid(globalState.steps[globalState.currAnimationIndx].grid)

                // Move to the next "Animation Frame"
                globalState.currAnimationIndx++
            }
        }, 500)

        return () => clearInterval(interval)
    }, [globalState.steps])

    return (
        <div className='h-full flex items-center justify-center flex-col'>
            <nav>TODO: NAVBAR</nav>
            <div className='w-full h-full flex'>
                <div className='flex flex-col flex-1'>
                    <div>
                        <h1 className='text-2xl font-bold w-full flex p-4 animate-fade-in-right'>Sudoko Solver</h1>
                    </div>
                </div>
                <div className='flex flex-col flex-1 w-fit justify-center items-center'>
                    <div>
                        <Grid grid={grid}/>
                    </div>
                    <button onClick={() => {
                        // Start the animation
                        globalState.animate = true

                        // Clear the steps array
                        globalState.steps = []

                        // Reset the grid
                        setGrid(globalState.initalGrid)

                        // Solve the grid and store the steps (Trigger the useEffect)
                        solve(globalState.initalGridCopy, 0, 0, globalState.steps)

                        // Reset the current animation index
                        globalState.currAnimationIndx = 0
                    }} className='mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-md'>Solve</button>
                </div>
                <div className='flex-1'>TODO: CONTROLS</div>
            </div>
        </div>
    )
}

export default App
