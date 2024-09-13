import React from 'react'

function VerticalSection({ children, styles = '' }: { children: React.ReactNode, styles?: string}) {
    return (
        <div className={`${ styles } flex`}>
            {children}
        </div>
  )
}

export default VerticalSection