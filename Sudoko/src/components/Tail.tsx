import { useGlobalState } from "../context/state"

function Tail({ cellVal, i, j }: { cellVal:number, i: number, j: number }) {
    const globalState = useGlobalState()

    function roundedCorners(i: number, j: number) {
        const gridSize = globalState.initalGrid ? globalState.initalGrid.length : 0

        if (i === 0 && j === 0) return 'rounded-tl-lg'
        if (i === 0 && j === gridSize - 1) return 'rounded-tr-lg'
        if (i === gridSize - 1 && j === 0) return 'rounded-bl-lg'
        if (i === gridSize - 1 && j === gridSize - 1) return 'rounded-br-lg'
    }

    function checkeredBackground(i: number, j: number) {
        if ((i % 2 === 0) && (j % 2 !== 0) || (i % 2 !== 0) && (j % 2 === 0)) {
            return 'bg-orange-200'
        } else {
            return 'bg-black'
        }
    }

    return (
        <div>
            <div key={j} className={`transition-all px-10 py-8 select-none ${checkeredBackground(i, j)} ${roundedCorners(i, j)}`}>
                {
                    cellVal === 0 ? <>&nbsp;</> : <span className='text-white'>Q</span>
                }
            </div>
        </div>
    )
}

export default Tail