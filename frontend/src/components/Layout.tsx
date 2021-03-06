import Navbar from './Navbar'
import React from 'react'
import Wrapper, { WrapperVariant } from './Wrapper'

interface LayoutProps {
  variant?: WrapperVariant
}

const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  )
}
export default Layout
