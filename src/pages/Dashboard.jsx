import React from 'react'
import logo from "../assets/logo.jpeg";

function Dashboard() {
  return (
    <div className='flex  mt-24 flex-col items-center'>
        <img src={logo} alt="" className='w-16 h-16 rounded-full' />
       <p className='text-2xl font-medium '>Wel Come To KFCC</p></div>
  )
}

export default Dashboard