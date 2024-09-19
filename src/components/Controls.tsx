import React from 'react'
import HorizontalSection from '../layout/HorizontalSection'
import VerticalSection from '../layout/VerticalSection'
import { reset, pause, nextStep } from '../utils/controls'
import Button from './Button'
import { useGlobalState } from '../context/state'

function Controls({ setGrid }: { setGrid: React.Dispatch<React.SetStateAction<number[][]>> }) {
    const globalState = useGlobalState()

    function handleSpeedChange(e: React.ChangeEvent<HTMLInputElement>) {
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
                    value={globalState.animationSpeed} 
                    onChange={(e) => handleSpeedChange(e)} />
                </VerticalSection>
                <VerticalSection styles='flex-initial justify-evenly items-center mt-4'>
                    <Button text='Reset' props={{ onClick: () => reset(setGrid, globalState), disabled: globalState.currAnimationIndx === 0 }} />
                    <Button text={ globalState.pause ? 'Resume' : 'Pause' } props={{ onClick: () => pause(setGrid, globalState), disabled: globalState.currAnimationIndx === 0 }} />
                    <Button text='Next Step' props={{ onClick: () => nextStep(setGrid, globalState), disabled: !globalState.pause || globalState.currAnimationIndx === 0 }} />
                </VerticalSection>
            </div>
        </HorizontalSection>
    )
}

export default Controls