import { useEffect, useState } from 'react'
import { useGlobalState } from './context/state'
import Grid from './components/Grid'
import Title from './components/Title'
import Button from './components/Button'
import VerticalSection from './layout/VerticalSection'
import HorizontalSection from './layout/HorizontalSection'
import { nextStep, pause, play, reset } from './utils/controls'

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

    // The speed of the animation
    const [speed, setSpeed] = useState(250)

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

    function handleSpeedChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSpeed(parseInt(e.target.value))
        globalState.animationSpeed = parseInt(e.target.value)
        if (globalState.pause) return
        play(globalState.currAnimationIndx, setGrid, globalState)
    }

    return (
        <div className='h-full flex items-center justify-center flex-col'>
            <nav className='w-full p-2'>
                <a href="#sudoko">Sudoko</a>
                <span>&nbsp;</span>
                <a href="#queens">N-Queens</a>
            </nav>
            <VerticalSection styles='w-full h-full' childrenFlex='1' >
                <Title />
                <HorizontalSection styles='w-fit justify-evenly items-center animate-fade-in opacity-0'>
                    <Grid grid={grid} />
                    <Button text='Solve' props={{ onClick: () => play(0, setGrid, globalState) }} />
                </HorizontalSection>
                <HorizontalSection>
                    <h1 className='text-2xl font-bold w-full flex animate-fade-in-right-delay opacity-0'>Controls</h1>
                    <div className='opacity-0 animate-fade-in-top'>
                        <VerticalSection>
                            <label className='mr-1 flex-initial'>Speed: { globalState.animationSpeed }ms</label>
                            <input type="range"
                            min="50"
                            max="500"
                            step="50"
                            value={speed} 
                            onChange={(e) => handleSpeedChange(e)} />
                        </VerticalSection>
                        <VerticalSection styles='flex-initial justify-evenly items-center mt-4'>
                            <Button text='Reset' props={{ onClick: () => reset(setGrid, globalState) }} />
                            <Button text={ globalState.pause ? 'Resume' : 'Pause' } props={{ onClick: () => pause(setGrid, globalState) }} />
                            <Button text='Next Step' props={{ onClick: () => nextStep(setGrid, globalState) }} />
                        </VerticalSection>
                    </div>
                </HorizontalSection>
            </VerticalSection>
            <footer>TODO: FOOTER</footer>
        </div>
    )
}

export default App
