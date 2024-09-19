import { useGlobalState } from './context/state'
import Title from './components/Title'
import VerticalSection from './layout/VerticalSection'
import HorizontalSection from './layout/HorizontalSection'
import Controls from './components/Controls'
import Display from './components/Display'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useLocation } from 'react-router-dom'

function App() {
    // Get the global state
    const globalState = useGlobalState()

    // Get the current path (name of the problem)
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

    return (
        <HorizontalSection styles='h-full'>
            <Navbar />
            <VerticalSection styles='w-full h-full'>
                <Title title={globalState.problem} />
                <Display />
                <Controls />
            </VerticalSection>
            <Footer />
        </HorizontalSection>
    )
}

export default App
