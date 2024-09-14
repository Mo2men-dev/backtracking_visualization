import { useEffect, useState } from 'react'
import { useGlobalState } from './context/state'
import Title from './components/Title'
import VerticalSection from './layout/VerticalSection'
import HorizontalSection from './layout/HorizontalSection'
import Controls from './components/Controls'
import Display from './components/Display'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
    // Get the global state
    const globalState = useGlobalState()

    const [title, setTitle] = useState(globalState.problem)

    // TODO: Function to generate a random grids
    globalState.initalGrid = globalState.problem === 'Sudoko' ? [
        [0,7,0,0,0,4,0,0,0],
        [0,3,0,0,0,0,2,0,1],
        [1,0,6,0,0,0,0,4,0],
        [0,5,1,0,0,3,0,0,0],
        [0,6,0,1,5,0,8,0,0],
        [4,0,0,8,0,0,0,0,0],
        [0,0,5,2,0,6,0,0,0],
        [6,0,0,0,0,0,9,2,0],
        [0,0,0,3,7,0,0,0,0]
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

    useEffect(() => {
        function getTitle() {
            const url = document.URL
            const title = url.split('#')[1]
    
            switch (title) {
                case 'sudoko':
                    return 'Sudoko'
                case 'queens':
                    return "N-Queens"
                default:
                    return "Sudoko"
            }
        }

        // Get the title from the URL
        function handleHashChange() {
            globalState.initalGrid = globalState.problem === 'Sudoko' ? [
                [0,7,0,0,0,4,0,0,0],
                [0,3,0,0,0,0,2,0,1],
                [1,0,6,0,0,0,0,4,0],
                [0,5,1,0,0,3,0,0,0],
                [0,6,0,1,5,0,8,0,0],
                [4,0,0,8,0,0,0,0,0],
                [0,0,5,2,0,6,0,0,0],
                [6,0,0,0,0,0,9,2,0],
                [0,0,0,3,7,0,0,0,0]
            ] : [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ]
            setGrid(globalState.initalGrid)
            const title = getTitle()
            globalState.problem = title
            setTitle(title)
        }

        // Listen to hash changes
        window.addEventListener('hashchange', () => handleHashChange());

        // Cleanup listener on component unmount
        return () => window.removeEventListener('hashchange', () => handleHashChange());
    }, []);

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

        return () => {
            clearInterval(interval)
        }
    }, [globalState.steps, globalState.animationSpeed])

    return (
        <HorizontalSection styles='h-full'>
            <Navbar />
            <VerticalSection styles='w-full h-full'>
                <Title title={title} />
                <Display key={`${title}-grid`} grid={grid} setGrid={setGrid} />
                <Controls setGrid={setGrid} />
            </VerticalSection>
            <Footer />
        </HorizontalSection>
    )
}

export default App
