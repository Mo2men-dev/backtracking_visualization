import React from 'react'

function HorizontalSection({ children, styles, childrenFlex }: { children: React.ReactNode, styles?: string, childrenFlex?: string }) {
  return (
    <div className={`${ styles } flex flex-col [&>*]:flex-${childrenFlex}`}>
        {children}
    </div>
  )
}

export default HorizontalSection