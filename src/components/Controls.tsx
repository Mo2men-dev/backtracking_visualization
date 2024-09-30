import React from 'react'
import HorizontalSection from '../layout/HorizontalSection'
import VerticalSection from '../layout/VerticalSection'
import { reset, pause, nextStep, generate } from '../utils/controls'
import Button from './Button'
import { useGlobalDispatch, useGlobalState } from '../context/state'
import Slider from './Slider'
import Steps from './Steps'

function Controls() {
    const globalState = useGlobalState()
    const dispatch = useGlobalDispatch()

    function handleSpeedChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch({ type: 'SET_ANIMATION_SPEED', payload: parseInt(e.target.value) })
        if (globalState.pause) return
    }

    function handleDifficultyChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch({ type: 'SET_DIFFICULTY', payload: parseInt(e.target.value) })
        if (globalState.pause) return
    }


    return (
        <HorizontalSection styles='flex flex-1'>
            <h1 className='text-2xl font-bold w-full flex animate-fade-in-right-delay opacity-0'>Controls</h1>
            <HorizontalSection styles='opacity-0 animate-fade-in-top'>
                <Slider key="speed" label={`Speed: ${globalState.animationSpeed}ms`} props={{ min: "50", max: "500", step: "50", value: globalState.animationSpeed, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleSpeedChange(e) }} />
                <Slider key="diffi" label={`Difficulty: ${globalState.sudokuDifficulty}%`} props={{ min: "10", max: "70", step: "10", value: globalState.sudokuDifficulty, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleDifficultyChange(e) }} />
                <VerticalSection styles='flex-initial justify-evenly items-center mt-4'>
                    <Button text='Generate' props={{ onClick: () => generate(globalState, dispatch) }} />
                    <Button text='Reset' props={{ onClick: () => reset(globalState, dispatch), disabled: globalState.currAnimationIndx === 0 }} />
                    <Button text={ globalState.pause ? 'Resume' : 'Pause' } props={{ onClick: () => pause(globalState, dispatch), disabled: globalState.currAnimationIndx === 0 || globalState.animationDone }} />
                    <Button text='Next Step' props={{ onClick: () => nextStep(globalState, dispatch), disabled: !globalState.pause || globalState.currAnimationIndx === 0 || globalState.animationDone}} />
                </VerticalSection>
            </HorizontalSection>
            <hr className='my-5 mx-auto w-4/5 animate-fade-in-right-delay opacity-0' />
            <HorizontalSection styles='p-2 max-h-64 h-64 animate-fade-in-right-delay opacity-0 overflow-y-auto'>
                <h1 className='text-2xl font-bold w-full flex'>Steps</h1>
                <Steps />
            </HorizontalSection>
        </HorizontalSection>
    )
}

export default Controls