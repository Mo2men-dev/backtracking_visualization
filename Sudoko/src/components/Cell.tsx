import { useGlobalState } from '../context/state'
import { border } from '../utils'

function Cell({ cellVal, i, j }: { cellVal: number, i: number, j: number, }) {
    const { currCell, animate, initalGrid } = useGlobalState()
  return (
    <div key={j} className={`px-4 py-2 select-none font-bold text-xl ${border(i, j)} ${(currCell.r === i && currCell.c === j + 1) && animate ? 'bg-blue-400 bg-opacity-25' : ''}`}>
        {cellVal === 0 ? <>&nbsp;</> : <span className={`${initalGrid[i][j] !== 0 ? 'text-green-400' : 'text-yellow-400' }`}>{cellVal}</span>}
    </div>
  )
}

export default Cell