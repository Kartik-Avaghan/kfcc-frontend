import { X, Save, UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import { notify } from "../../Utils/notify";
import RoleSelectField from "./RoleSelectField";


function EditUser({ userData, onCloseEdit, onActionSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    bloodGroup: "",
    dob: "",
    roles: [],
  });

  // Prefill form with existing user data
  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        middleName: userData.middleName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        mobileNo: userData.mobileNo || "",
        bloodGroup: userData.bloodGroup || "",
        dob: userData.dob || "",
        roles: userData.roles || [],
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {

    if(formData.roles.length === 0){
      notify("At least one role must be selected", "error");
      return;
    }

    setLoading(true);
    const userId = userData.id;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("The response was not ok");
      }

      //   const data = await response.json();
      //   setFormData(data);
      onActionSuccess();
      onCloseEdit();
      notify("User updated successfully", "success");
    } catch (error) {
      notify(error.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center text-xl gap-2 font-bold text-blue-900">
            <UserRoundPen size={24}/>
            Edit User Details
          </h2>
          <button onClick={onCloseEdit}>
            <X className="text-gray-500 hover:text-red-600 cursor-pointer" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2  focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2  focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Blood Group
              </label>
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none">
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 ">
              Roles
            </label>
            <RoleSelectField
              formData={formData}
              setFormData={setFormData}
            />

            {formData.roles.length === 0 && (
              <p className="text-sm text-red-500">
                At least one role must be selected
              </p>
            )}

          </div>

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onCloseEdit}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            <Save size={16} />
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
