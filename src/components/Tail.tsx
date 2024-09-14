import { useGlobalState } from "../context/state"
import { checkeredBackground, roundedCorners } from "../utils/styling"

function Tail({ cellVal, i, j }: { cellVal:number, i: number, j: number }) {
    const { currCell, animate, gridSize } = useGlobalState()

    return (
        <div>
            <div key={j} className={`transition-all px-10 py-8 select-none ${checkeredBackground(i, j)} ${roundedCorners(i, j, gridSize)} ${(currCell.r === i && currCell.c === j + 1) && animate ? 'bg-opacity-25' : '' }`}>
                {
                    cellVal === 0 ? <>&nbsp;</> : <span className='text-white'>Q</span>
                }
            </div>
        </div>
    )
}

export default Tail