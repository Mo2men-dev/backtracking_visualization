import { initalGrid } from '../App'
import { border } from '../utils'

function Cell({ cell, i, j, currCell, animate }: { cell: number, i: number, j: number, currCell: { r: number, c: number }, animate: boolean, initalGrid: number[][] }) {
  return (
    <div key={j} className={`px-4 py-2 select-none font-bold text-xl ${border(i, j)} ${(currCell.r === i && currCell.c === j + 1) && animate ? 'bg-blue-400 bg-opacity-25' : ''}`}>
        {cell === 0 ? <>&nbsp;</> : <span className={`${initalGrid[i][j] !== 0 ? 'text-green-400' : 'text-yellow-400' }`}>{cell}</span>}
    </div>
  )
}

export default Cell