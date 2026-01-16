import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, replace } from 'react-router-dom';

function ProtectedRoutes({allowedRoles= [],children}) {


    const {isAuntenticated,user}= useSelector((state)=> state.user);

    if(!isAuntenticated){
        <Navigate to="/login" replace/>
    }

    if(allowedRoles && !allowedRoles.some((role)=> user?.roles?.includes(role))){
        return <Navigate to="/unauthorized" replace/>
    }
  return children
};

export default ProtectedRoutes