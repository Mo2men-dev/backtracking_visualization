function Navbar() {
  return (
    <nav className='flex pb-4 justify-center w-full'>
        <div className="bg-blue-600 px-2 py-2 outline-dotted flex outline-2 rounded-b-md transition-all shadow-md [&>*]:mx-2">
            <a className="hover:underline" href="#sudoko">Sudoko</a>
            <a className="hover:underline" href="#queens">N-Queens</a>
        </div>
    </nav>
  )
}

export default Navbar