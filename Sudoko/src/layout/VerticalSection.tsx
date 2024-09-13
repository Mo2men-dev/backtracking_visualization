import React from 'react'

function VerticalSection({ children, styles, childrenFlex = 'none' }: { children: React.ReactNode, styles?: string, childrenFlex?: string }) {
  return (
    <div className={`${ styles } flex [&>*]:flex [&>*]:flex-${childrenFlex}`}>
        {children}
    </div>
  )
}

export default VerticalSection