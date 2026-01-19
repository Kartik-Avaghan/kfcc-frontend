import React, { useState } from "react";

function AddUser() {
  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNo: "",
    bloodGroup: "",
    dob: "",
    role: "",
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      {" "} {userData.firstName}
    </div>
  );
}

export default AddUser;
