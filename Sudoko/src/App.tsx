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

    const [speed, setSpeed] = useState(500)

    useEffect(() => {
        // Show answer without animation
        if (!globalState.animate) {
            setGrid(globalState.initalGridCopy)
            return
        }

        // Play animation
        const interval = setInterval(() => {
            if (!globalState.pause) {
                if (globalState.currAnimationIndx < globalState.steps.length) {
                    // The current cell being processed by the algorithm
                    globalState.currCell = globalState.steps[globalState.currAnimationIndx].cell

                    // Update the grid
                    setGrid(globalState.steps[globalState.currAnimationIndx].grid)

                    // Move to the next "Animation Frame"
                    globalState.currAnimationIndx++
                }
            }
        }, globalState.animationSpeed)

        return () => clearInterval(interval)
    }, [globalState.steps, globalState.animationSpeed])

    function onSolve(startingIndex: number = 0) {
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
        solve(globalState.initalGridCopy, 0, 0, globalState.steps)

        // Reset the current animation index
        globalState.currAnimationIndx = startingIndex
    }

    function pause() {
        if (globalState.currAnimationIndx === globalState.steps.length) {
            return
        }
        // Toggle the pause state
        globalState.pause = !globalState.pause

        // Update the grid (to rerender the tree)
        setGrid(globalState.steps[globalState.currAnimationIndx].grid)
    }

    return (
        <div className='h-full flex items-center justify-center flex-col'>
            <div className='w-full h-full flex'>
                <div className='flex flex-1 justify-end items-center'>
                    <div className='animate-fade-in-right'>
                        <h1 className='text-5xl italic font-bold h-fit origin-center -rotate-90 text-nowrap'>Sudoko Solver</h1>
                    </div>
                </div>
                <div className='flex flex-col flex-1 w-fit justify-center items-center animate-fade-in opacity-0'>
                    <div>
                        <Grid grid={grid}/>
                    </div>
                    <button onClick={() => onSolve()} className='mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-md'>Solve</button>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='p-4'>
                        <h1 className='text-2xl font-bold w-full flex animate-fade-in-right-delay opacity-0'>Controls</h1>
                        <div className='opacity-0 animate-fade-in-top'>
                            <div className='flex'>
                                <label className='mr-1'>Speed: {globalState.animationSpeed}ms</label>
                                <input type="range" 
                                min="50"
                                max="500"
                                step="50"
                                value={speed} 
                                onChange={(e) => {
                                    setSpeed(parseInt(e.target.value))
                                    globalState.animationSpeed = parseInt(e.target.value)
                                    
                                    if (globalState.pause) return
                                    onSolve(globalState.currAnimationIndx)
                                }} />
                            </div>
                            <div className='mt-4 flex justify-evenly text-sm items-center text-white font-bold'>
                                <button
                                    onClick={() => {
                                        if (globalState.currAnimationIndx === 0) return
                                        if (!globalState.pause) return
                                        globalState.currAnimationIndx++
                                        globalState.currCell = globalState.steps[globalState.currAnimationIndx].cell
                                        setGrid(globalState.steps[globalState.currAnimationIndx].grid)
                                    }} 
                                    className={`h-fit p-2 bg-blue-500 rounded-md`}>
                                        Next Step
                                </button>
                                <button 
                                    onClick={pause}
                                    className='h-fit p-2 bg-blue-500 rounded-md'>
                                        {globalState.pause ? 'Resume' : 'Pause'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>TODO: FOOTER</footer>
        </div>
    )
}

export default App
