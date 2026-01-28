import { useEffect, useState } from "react";
import { Save, ArrowLeft, Loader2, Pen } from "lucide-react";
import { notify } from "../../Utils/notify";
import { useNavigate } from "react-router-dom";

function EditUserProfile() {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    dob: "",
    bloodGroup: "",
  });

  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH USER DATA ---------------- */
  const fetchUserData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/userDetails`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      setFormData(data);
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /*  UPDATE PROFILE  */
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) throw new Error("Update failed");

      notify("Profile updated successfully", "success");
      await fetchUserData();
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen  p-6">
      <div className="max-w-4xl mx-auto rounded-2xl  p-6">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft
            size={24}
            className="text-gray-600 hover:text-gray-700 mb-6 cursor-pointer"
          />
        </button>
        {/* Header */}
        <div className="gap-3 mb-10">
          <h1 className="flex  items-center gap-2 text-3xl font-bold text-blue-900">
            <Pen size={20} /> Edit Profile
          </h1>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            label="Middle Name"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Mobile No"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
          />
          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />

          <div>
            <label className="text-sm text-gray-800">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

/*  INPUT COMPONENT  */
const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-800">{label}</label>
    <input
      {...props}
      className="w-full border border-gray-300 rounded-lg px-2 py-2  focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
);

export default EditUserProfile;
