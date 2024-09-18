
function Button({ text, props }: { text: string, props: any }) {
    
    return (
    <button key={`${text}-btn-${props.disabled}`} className={`bg-blue-500 text-white font-bold h-fit p-2 rounded-md transition-all text-sm ${props.disabled ? 'opacity-60' : 'hover:bg-blue-700'}`} {...props}>
        {text}
    </button>
  )
}

export default Button