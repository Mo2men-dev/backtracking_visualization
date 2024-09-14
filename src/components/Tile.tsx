import { useGlobalState } from "../context/state"
import { GiChessQueen } from "react-icons/gi";
import { checkeredBackground, roundedCorners } from "../utils/styling"

function Tile({ cellVal, i, j }: { cellVal:number, i: number, j: number }) {
    const { currCell, animate, gridSize } = useGlobalState()

    return (
        <div key={j} className={`transition-all p-5 w-fit h-fit select-none ${checkeredBackground(i, j)} ${roundedCorners(i, j, gridSize)} ${(currCell.r === i && currCell.c === j + 1) && animate ? 'bg-opacity-25' : '' }`}>
                { cellVal === 0 ? 
                    <span className="opacity-0">
                        <GiChessQueen className="text-5xl" />
                    </span> :
                    <span>
                        <GiChessQueen className="text-5xl" />
                    </span>
                }
        </div>
    )
}

export default Tile