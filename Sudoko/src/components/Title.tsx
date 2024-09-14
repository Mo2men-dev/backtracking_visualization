function Title({ title }: { title: string }) {
    return (
        <div key={title} className='justify-end items-center flex flex-1'>
            <div className='animate-fade-in-right'>
                <h1 className='text-5xl italic font-bold h-fit origin-center -rotate-90 text-nowrap'>
                    {title}
                </h1>
            </div>
        </div>
  )
}

export default Title