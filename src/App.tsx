import { useEffect, useState } from 'react'
import { useGlobalState } from './context/state'
import Title from './components/Title'
import VerticalSection from './layout/VerticalSection'
import HorizontalSection from './layout/HorizontalSection'
import Controls from './components/Controls'
import Display from './components/Display'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { reset } from './utils/controls'
import { useLocation } from 'react-router-dom'

function App() {
    // Get the global state
    const globalState = useGlobalState()
    const path = useLocation().pathname.split('/')[1]

    switch (path) {
        case 'sudoko':
            globalState.problem = 'sudoko'
            break
        case 'n-queens':
            globalState.problem = 'n-queens'
            break
        default:
            globalState.problem = 'sudoko'
    }

    // TODO: Function to generate a random grids
    globalState.initalGrid = globalState.problem === 'sudoko' ? [
        [0,9,0,1,2,0,4,6,5],
        [0,0,0,8,5,6,9,0,3],
        [0,1,0,0,9,4,0,0,8],
        [0,3,0,7,0,8,0,0,6],
        [1,0,0,0,0,2,0,3,0],
        [8,0,0,9,3,5,1,2,0],
        [7,0,0,0,6,0,3,0,2],
        [6,5,1,2,8,0,0,9,4],
        [2,4,3,0,7,9,0,0,0]
    ] : [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ]
    
    // Copy the initial grid to preserve the original state
    globalState.initalGridCopy = globalState.initalGrid.map(row => row.slice())

    // The current grid being displayed
    const [grid, setGrid] = useState<number[][]>(globalState.initalGrid)
    const [animationDone, setAnimationDone] = useState(false)

    useEffect(() => {
        globalState.initalGrid = globalState.problem === 'sudoko' ? [
            [0,9,0,1,2,0,4,6,5],
            [0,0,0,8,5,6,9,0,3],
            [0,1,0,0,9,4,0,0,8],
            [0,3,0,7,0,8,0,0,6],
            [1,0,0,0,0,2,0,3,0],
            [8,0,0,9,3,5,1,2,0],
            [7,0,0,0,6,0,3,0,2],
            [6,5,1,2,8,0,0,9,4],
            [2,4,3,0,7,9,0,0,0]
        ] : [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
        globalState.initalGridCopy = globalState.initalGrid.map(row => row.slice())
        globalState.gridSize = globalState.problem === 'sudoko' ? Math.sqrt(globalState.initalGrid[0].length) : globalState.initalGrid.length
        setGrid(globalState.initalGrid)
        reset(setGrid, globalState)

        // Show answer without animation
        if (!globalState.animate) {
            setGrid(globalState.initalGridCopy)
            return
        }
    }, [globalState.steps])

    useEffect(() => {
        // Play animation
        const interval = setInterval(() => {
        if (!globalState.pause) {
            if (globalState.currAnimationIndx < globalState.steps.length) {
                // Update the animation done state
                setAnimationDone(false)
        
                // The current cell being processed by the algorithm
                globalState.currCell = globalState.steps[globalState.currAnimationIndx].cell
        
                // Update the grid
                setGrid(globalState.steps[globalState.currAnimationIndx].grid)
        
                // Move to the next "Animation Frame"
                globalState.currAnimationIndx++
            } else {
                // Animation is done
                globalState.animate = false
        
                // Update the animation done state
                setAnimationDone(true)
        
                // Update the grid to the final frame
                setGrid(globalState.steps[globalState.steps.length - 1].grid)
        
                clearInterval(interval)
            }
                        
        }
    }, globalState.animationSpeed)
    
        return () => clearInterval(interval)
    }, [globalState.animationSpeed])

    return (
        <HorizontalSection styles='h-full'>
            <Navbar />
            <VerticalSection styles='w-full h-full'>
                <Title title={globalState.problem} />
                <Display grid={grid} setGrid={setGrid} animationDone={animationDone} />
                <Controls setGrid={setGrid} />
            </VerticalSection>
            <Footer />
        </HorizontalSection>
    )
}

export default App
