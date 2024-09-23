import VerticalSection from "../layout/VerticalSection"

function Slider({ label, props }: { label: string, props: any }) {
  return (
    <VerticalSection>
        <label className='mr-1 flex-initial'>{label}</label>
        <input type="range" {...props} />
    </VerticalSection>
  )
}

export default Slider