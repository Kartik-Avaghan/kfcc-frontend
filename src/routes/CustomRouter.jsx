import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Login from '../pages/Login'
import Nav from '../components/Nav'

function CustomRouter() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/nav" element={<Nav/>}/>
        </Routes>
    </div>
  )
}

export default CustomRouter