import React, { useState } from 'react'
import HorizontalSection from '../layout/HorizontalSection'
import VerticalSection from '../layout/VerticalSection'
import { reset, pause, nextStep } from '../utils/controls'
import Button from './Button'
import { useGlobalState } from '../context/state'

function Controls({ setGrid }: { setGrid: React.Dispatch<React.SetStateAction<number[][]>> }) {
    const globalState = useGlobalState()

    // The speed of the animation
    const [speed, setSpeed] = useState(250)

    function handleSpeedChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSpeed(parseInt(e.target.value))
        globalState.animationSpeed = parseInt(e.target.value)
        if (globalState.pause) return
    }
  return (
    <HorizontalSection styles='flex flex-1'>
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
  )
}

export default Controls