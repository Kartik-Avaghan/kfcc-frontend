import React from 'react'
import logo from "../assets/logo.png";

function Dashboard() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-linear-to-br from-blue-100 via-white to-blue-50'>
      <img src={logo} alt="" className='size-48 rounded-full' />
      <p className='text-3xl font-medium mt-5'>Welcome To KFCC</p>
      <p className='text-4xl m-4 font-bold'>ಕರ್ನಾಟಕ ಚಲನಚಿತ್ರ ವಾಣಿಜ್ಯ ಮಂಡಳಿ</p>
      <p className='text-2xl font-bold'>Karnataka Film Chamber of Commerce</p>
    </div>
  )
}

export default Dashboard