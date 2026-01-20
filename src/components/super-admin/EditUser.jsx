import { X, Save, UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import { notify } from "../../Utils/notify";

function EditUser({ userData, onCloseEdit, onActionSuccess }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobileNo: "",
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
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/update/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        notify(data.message || "Failed to update user", "error");
        return;
      }

      notify("User updated successfully", "success");
      onActionSuccess();
      onCloseEdit();
    } catch (error) {
      console.error(error);
      notify("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
  <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">

    
    <div className="flex items-center justify-between mb-6">
      <h2 className="flex text-xl gap-2 font-bold text-blue-900">
        <UserRoundPen className="h-8 w-8 "/>Edit User Details
      </h2>
      <button onClick={onCloseEdit}>
        <X className="text-gray-500 hover:text-red-600 cursor-pointer" />
      </button>
    </div>

    {/* Form */}
    <div className="space-y-4">

      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      
      <div className="grid grid-cols-1 gap-4">
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
          <label className="text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2  focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      
      {/* <div>
        <label className="text-sm font-medium text-gray-700">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select Role</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
      </div> */}

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
