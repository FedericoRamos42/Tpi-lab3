import React from 'react';
import TopBar from './TopBar';
import Footer from './Footer'
const Layout = ({ children }) => {
  return (
    <div>
      <TopBar />
      <div className='w-full min-h-screen'>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout;
