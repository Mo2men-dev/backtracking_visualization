import { useEffect, useState } from 'react'
import { border, solve } from './utils'

export const initalGrid = [
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

const initalGridCopy = initalGrid.map(row => row.slice())
let steps: { cell: { r: number, c: number }, grid: number[][] }[] = []
let i = 0

function App() {
    const [grid, setGrid] = useState<number[][]>(initalGrid)
    const [currCell, setCurrCell] = useState<{ r: number, c: number }>({ r: 0, c: 0 })
    const [animate, setAnimate] = useState<boolean>(false)
    
    useEffect(() => {

        if (!animate) {
            setGrid(initalGridCopy)
            return
        }

        const interval = setInterval(() => {
            if (i < steps.length) {
                setCurrCell(steps[i].cell)
                setGrid(steps[i].grid)
                i++
            }
        }, 500)

        return () => clearInterval(interval)
    }, [steps])

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
                                            <div key={j} className={`px-4 py-2 select-none font-bold text-xl ${border(i, j)} ${(currCell.r === i && currCell.c === j + 1) && animate ? 'bg-blue-400 bg-opacity-25' : ''}`}>
                                                {cell === 0 ? <>&nbsp;</> : <span className={`${initalGrid[i][j] !== 0 ? 'text-green-400' : 'text-yellow-400' }`}>{cell}</span>}
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
                setAnimate(true)
                steps = []
                setGrid(initalGrid)
                solve(initalGridCopy, 0, 0, steps)
                i = 0
            }} className='mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-md'>Solve</button>
        </div>
    )
}

export default App
