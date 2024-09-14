import { useGlobalState } from '../context/state'
import Cell from './Cell'
import Tail from './Tail'

function Grid({ grid }: { grid: number[][] }) {
    const globalState = useGlobalState()
    
    return (
        <div className='w-fit h-fit'>
            {
                grid.map((row, i) => {
                    return (
                        <div key={i} className='flex'>
                            {
                                row.map((cell, j) => {
                                        return globalState.problem === 'Sudoko' ? <Cell key={j} cellVal={cell} i={i} j={j} /> : <Tail key={j} cellVal={cell} i={i} j={j} />
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