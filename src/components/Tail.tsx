import { useGlobalState } from "../context/state"
import { checkeredBackground, roundedCorners } from "../utils/styling"

function Tail({ cellVal, i, j }: { cellVal:number, i: number, j: number }) {
    const gridSize = useGlobalState().initalGrid.length

    return (
        <div>
            <div key={j} className={`transition-all px-10 py-8 select-none ${checkeredBackground(i, j)} ${roundedCorners(i, j, gridSize)}`}>
                {
                    cellVal === 0 ? <>&nbsp;</> : <span className='text-white'>Q</span>
                }
            </div>
        </div>
    )
}

export default Tail