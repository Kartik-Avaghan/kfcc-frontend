import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

function Auth() {

const navigate = useNavigate();
const[user, setUser] = useState(null);


useEffect(()=>{
let token = localStorage.getItem("token");
if(token  && token.startsWith("Bearer ")){
    token = token.split(" ")[1];
}

if(!token){
    setUser(false);
    navigate("/login");
    return;
}

try{
    const decodedToken = jwtDecode(token);

    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem("token");
        setUser(false);
        navigate("/login");
        
    }
    else{
        setUser(true);
    }
}
catch(error){
    console.error("Error decoding token:", error);
    localStorage.removeItem("token");
    setUser(false);
    navigate("/login");
}

},[navigate])

if(user === false) return <Navigate to = "/login"/>

  return (
    <div className='flex'>
        <Nav/>
        <div className='md:ml-64 flex-1'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Auth