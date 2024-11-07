import React from 'react';
import TopBar from './TopBar';
import Footer from './Footer'
const Layout = ({ children }) => {
  return (
    <div>
      <TopBar />
      {children}
      <Footer/>
    </div>
  )
}

export default Layout;
