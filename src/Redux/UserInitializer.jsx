import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from './Reducer';

function UserInitializer({children}) {

    const dispatch = useDispatch();
    const[loading, setLoading]= useState(true);


    useEffect(()=>{

        const restoreUser = async ()=>{

            try{
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/getDetail`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                    Authorization: `${localStorage.getItem("token")}`
                    }
                })


                 if(!response.ok){
                localStorage.removeItem("token");
                window.location.href = "/login"
                throw new Error("Failed to restor user");
            }
            
            const data = await response.json();

            dispatch(userLogin({
                id: data.id,
                name: data.name,
                phone: data.sub,
                roles: data.roles
            }))

            setLoading(false);

            }
            catch(error){
                console.error("Error restoring user:", error);
            }
            finally{
                setLoading(false);
            }

          
        }
         restoreUser();
    },[dispatch])

    if(loading){
       return (
   <div className="flex items-center justify-center h-screen w-full">
      <div
        className={`w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin`}
      ></div>
    </div>
    );
    }
  return children;
}

export default UserInitializer