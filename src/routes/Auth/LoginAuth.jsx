import React from 'react'
import { Outlet } from 'react-router-dom'

function LoginAuth() {
  return (
     <div className='flex h-screen'>
        <Nav/>
        <div className='flex-1 overflow-y-auto'>
            <Outlet/>
        </div>
    </div>
  )
}

export default LoginAuth