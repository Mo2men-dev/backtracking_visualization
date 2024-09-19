import HorizontalSection from '../layout/HorizontalSection'
import { play } from '../utils/controls'
import Button from './Button'
import Grid from './Grid'
import { useGlobalDispatch, useGlobalState } from '../context/state'

function Display() {
    const globalState = useGlobalState()
    const dispatch = useGlobalDispatch()

    return (
        <HorizontalSection styles='flex flex-1 w-fit justify-evenly items-center animate-fade-in opacity-0'>
            <Grid />
            <Button text='Solve' props={{ onClick: () => play(dispatch, globalState), disabled: globalState.animationDone }} />
        </HorizontalSection>
    )
}

export default Display