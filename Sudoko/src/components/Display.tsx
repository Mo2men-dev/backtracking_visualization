import React from 'react'
import HorizontalSection from '../layout/HorizontalSection'
import { play } from '../utils/controls'
import Button from './Button'
import Grid from './Grid'
import { useGlobalState } from '../context/state'

function Display({ grid, setGrid }: { grid: number[][], setGrid: React.Dispatch<React.SetStateAction<number[][]>> } ) {
    const globalState = useGlobalState()

    return (
        <HorizontalSection styles='flex flex-1 w-fit justify-evenly items-center animate-fade-in opacity-0'>
            <Grid grid={grid} />
            <Button text='Solve' props={{ onClick: () => play(0, setGrid, globalState) }} />
        </HorizontalSection>
    )
}

export default Display