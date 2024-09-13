function Button({ text, props }: { text: string, props: any }) {
  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-fit p-2 rounded-md transition-all text-sm'
      {...props}
    >
      {text}
    </button>
  )
}

export default Button