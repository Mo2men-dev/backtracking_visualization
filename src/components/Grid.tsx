import { useGlobalState } from '../context/state'
import Cell from './Cell'
import Tile from './Tile'

function Grid({ grid }: { grid: number[][] }) {
    const { problem } = useGlobalState()
    
    return (
        <div className='w-fit h-fit'>
            {
                grid.map((row, i) => {
                    return (
                        <div key={i} className='flex'>
                            {
                                row.map((cell, j) => {
                                        return problem === "" || problem === 'sudoko' ? <Cell key={j} cellVal={cell} i={i} j={j} /> : <Tile key={j} cellVal={cell} i={i} j={j} />
                                    })
                                }
                            </div>
                    )
                })
            }
    </div>
  )
}

export default Grid