import React, { use } from 'react'
import { useEffect, useState } from 'react';
import { notify } from '../../Utils/notify';

function MembershipCard() {
const[membershipCard, setMembershipCard]=useState([]);


useEffect(() => {

    const fetchMembershipCard = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/membership/user/applications`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              AuthorizationL: `${localStorage.getItem("token")}`,
            },
          }
        );
        if(!response.ok){
            throw new Error("Failed to fetch membership cards");
        }
        const data = await response.json();
        setMembershipCard(data);
        console.log("Membership Cards:", data);
    }
    catch(error){
        notify(error.message, "error");
    }
}
    fetchMembershipCard();
},[]);



  return (
    <div>MembershipCard</div>
  )
}

export default MembershipCard