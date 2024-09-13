import React from 'react'

function HorizontalSection({ children, styles = ''}: { children: React.ReactNode, styles?: string}) {
    return (
        <div className={`${ styles } flex flex-col`}>
            {children}
        </div>
    )
}

export default HorizontalSection