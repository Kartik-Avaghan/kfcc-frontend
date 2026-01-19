import { X } from "lucide-react";
import React, { useState } from "react";
import { notify } from "../../Utils/notify";

function AddUser({ setAddUser , fetchusers }) {
  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    bloodGroup: "",
    dob: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // validation
  if (
    !userData.firstName ||
    !userData.lastName ||
    !userData.mobileNo ||
    !userData.email ||
    !userData.role
  ) {
    notify("Please fill all required fields" , "error");
    return;
  }

  try {

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/create`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      notify(data.message , "error")
      return;
    }
    
    const data = response.ok ? await response.text() : await response.json();
    notify(data , "success")
    
    // Success
    setAddUser(false);
    setUserData({
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNo: "",
      email: "",
      bloodGroup: "",
      dob: "",
      role: "",
    });

    // Optional: refresh list
    fetchusers();

  } catch (error) {
    console.error(error);
    alert(error.message || "Something went wrong");
  } 
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-300 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Add New User</h2>
          <button
            onClick={() => setAddUser(false)}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                className="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Mobile No
              </label>
              <input
                type="text"
                name="mobileNo"
                className="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                className="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={userData.bloodGroup}
                onChange={handleChange}
                className="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                className="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Role</label>

            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="mt-1 rounded-md border border-gray-300 px-3 py-2 
               focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Role</option>

              {/* Basic */}
              <optgroup label="Basic">
                <option value="USER">User</option>
              </optgroup>

              {/* Office Bearers */}
              <optgroup label="Office Bearers">
                <option value="STAFF">Staff</option>
                <option value="SECRETARY">Secretary</option>
                <option value="MANAGER">Manager</option>
                <option value="PRESIDENT">President</option>
              </optgroup>

              {/* ONM Committee */}
              <optgroup label="ONM Committee">
                <option value="ONM_COMMITTEE">ONM Committee Member</option>
                <option value="ONM_COMMITTEE_VOTER">ONM Committee Voter</option>
                <option value="ONM_COMMITTEE_LEADER">ONM Committee Leader</option>
              </optgroup>

              {/* Title Committee */}
              <optgroup label="Title Committee">
                <option value="TITLE_COMMITTEE">TITLE Committee Member</option>
                <option value="TITLE_COMMITTEE_VOTER">Title Committee Voter</option>
                <option value="TITLE_COMMITTEE_LEADER">Title Committee Leader</option>
              </optgroup>

              {/* Executive */}
              <optgroup label="Executive Council">
                <option value="EC_MEMBER">EC Member</option>
              </optgroup>

              {/* Vice Presidents */}
              <optgroup label="Vice Presidents">
                <option value="VP_PRODUCER">VP – Producer</option>
                <option value="VP_EXHIBITOR">VP – Exhibitor</option>
                <option value="VP_DISTRIBUTOR">VP – Distributor</option>
              </optgroup>

              {/* Members */}
              <optgroup label="Members">
                <option value="PRODUCER">Producer</option>
                <option value="EXHIBITOR">Exhibitor</option>
                <option value="DISTRIBUTOR">Distributor</option>
                <option value="STUDIO">Studio</option>
                <option value="HONORARY_MEMBER">Honorary Member</option>
                <option value="TEMPORARY_MEMBER">Temporary Member</option>
              </optgroup>

              {/* Admin */}
              <optgroup label="Admin">
                <option value="SUPER_ADMIN">Super Admin</option>
              </optgroup>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-300 px-6 py-4">
          <button
            onClick={() => setAddUser(false)}
            className="rounded-md border border-gray-300 px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            className="rounded-md cursor-pointer bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save User
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
