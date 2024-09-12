import Cell from './Cell'

function Grid({ grid }: { grid: number[][] }) {
  return (
    <div className='w-fit h-fit'>
                {
                    grid.map((row, i) => {
                        return (
                            <div key={i} className='flex'>
                                {
                                    row.map((cell, j) => {
                                        return <Cell key={j} cellVal={cell} i={i} j={j} />
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