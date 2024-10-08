function Title({ title }: { title: string }) {
    return (
        <div key={title} className='justify-end items-center flex flex-1'>
            <div className='animate-fade-in-right'>
                <h1
                className={`text-5xl font-bold h-fit origin-center underline -rotate-90 text-nowrap ${ title === 'sudoko' ? 'text-cyan-400 font-ubuntu' : 'text-orange-200 font-ptserif' }`}>
                    {title.toUpperCase()}
                </h1>
            </div>
        </div>
  )
}

export default Title