import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className='flex pb-4 justify-center w-full'>
        <div className="bg-blue-600 px-2 py-2 flex outline-2 rounded-b-md transition-all outline-dotted [&>*]:mx-2">
            <Link reloadDocument className="hover:underline" to="/">Sudoko</Link>
            <Link reloadDocument className="hover:underline" to="/n-queens">N-Queens</Link>
        </div>
    </nav>
  )
}

export default Navbar