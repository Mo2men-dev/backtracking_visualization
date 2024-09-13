import { useEffect, useState } from 'react'
import { useGlobalState } from '../context/state'

function Title() {
    const globalState = useGlobalState()
    const [title, setTitle] = useState(getTitle())

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


    useEffect(() => {
        // Get the title from the URL
        function handleHashChange() {
            const title = getTitle()
            globalState.problem = title
            setTitle(title)
        }

        // Listen to hash changes
        window.addEventListener('hashchange', () => handleHashChange);
    
        // Cleanup listener on component unmount
        return () => window.removeEventListener('hashchange', () => handleHashChange);
      }, []);
    
    return (
        <div key={title} className='animate-fade-in-right'>
            <h1 className='text-5xl italic font-bold h-fit origin-center -rotate-90 text-nowrap'>
                {title}
            </h1>
        </div>
  )
}

export default Title