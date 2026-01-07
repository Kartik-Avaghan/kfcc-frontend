import React, { useEffect, useState } from 'react'
import { notify } from '../../Utils/notify';

function IdCardRequests() {

  const[idCardRequests, setIdCardRequests]=useState([]);
  const[loading, setLoading]= useState(null);


  useEffect(()=>{
const fetchIdCards = async()=>{

  setLoading(true);

  try{
    const response= await fetch(`${import.meta.env.VITE_API_BASE_URL}/idcard/pending`,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }
    })

    if(!response.ok){
      throw new Error("The response was not ok");

    }

    const data = await response.json();
    console.log(data);
    
    setIdCardRequests(data);
  }
  catch(error){
    notify(message.error ,"error");
  }
  finally{
    setLoading(false);
  }
}


    fetchIdCards();
  },[])



  return (
    <div className='p-16'>IdCardRequests</div>
  )
}

export default IdCardRequests