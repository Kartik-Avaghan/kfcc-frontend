import { Phone, Lock, Send, User, Mail, Droplet, Calendar, ChevronLeft,  } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import { notify } from "../Utils/notify";

function Signup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    bloodGroup: "",
    dob: "",
    otp: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestOtp = async () => {
    if (!formData.mobileNo) {
      notify("Mobile number is required", "warn");
      return;
    }

    if(formData.mobileNo.length !==10){
      notify("Please enter a valid 10-digit mobile number", "warn");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/auth/signup/request-otp?mobileNo=${formData.mobileNo}`,
        { method: "POST" }
      );

      const data = await response.json();

      if (!response.ok){
        notify(data.message, "error");
        return;
        // throw new Error(data.error || "Failed to send OTP");
      } 

      notify("OTP sent successfully", "success");
      setStep(2);

    } catch (error) {
      notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Signup failed");

      notify("User registered successfully", "success");

      // Optional: redirect to login
      navigate("/login");
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-100 via-white to-blue-50 px-4">
      <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-8 transition-all">
        {/* Header */}
        {step === 1 && (
          <div className="flex w-full flex-col items-center mb-8">
            <img
              src={logo}
              alt="logo"
              className="w-20 h-20 mb-4 rounded-full shadow-md"
            />
            <h2 className="text-3xl font-bold text-blue-950">Register</h2>
            <p className="text-gray-500 text-sm mt-1 text-center">
              Create your account using mobile verification
            </p>
          </div>
        )}

        {/* STEP 1 – MOBILE NUMBER */}
        {step === 1 && (
          <div className="space-y-5 min-w-sm">
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400 flex gap-1">
                <Phone className="h-5 w-5" />
                <span className="text-md">+91</span>
              </div>

              <input
                type="number"
                name="mobileNo"
                maxLength={10}
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="w-full border border-gray-300 rounded-lg py-2.5 px-4 pl-17 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            <button
              type="button"
              onClick={requestOtp}
              disabled={loading}
              className="w-full flex items-center justify-center gap-1 text-sm font-medium cursor-pointer bg-blue-950 text-white hover:bg-blue-900 active:scale-[0.98]w-full py-2.5 rounded-lg  shadow-md duration-200 group transition-all"
            >
              <Send className="h-4 w-4 group-hover:-translate-x-1 group-hover:rotate-45 ease-in-out duration-100" />
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* STEP 2 – OTP + DETAILS */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn max-w-5xl ">
            {/* LEFT SIDE – INFO */}
            <div className=" w-full flex flex-col justify-center place-items-center space-y-2">
              <ChevronLeft className="h-6 w-6 text-gray-800 z-50 top-10 left-10 cursor-pointer absolute" onClick={() => setStep(1)} />
              <img
                src={logo}
                alt="logo"
                className="w-16 h-16 rounded-full shadow-md"
              />

              <h2 className="text-3xl font-bold text-blue-950">Create Account</h2>

              <p className="text-gray-500 text-sm max-w-xs text-center p-2">
                Register to access KFCC services and manage your applications online.
              </p>

              <p className="text-sm text-gray-600">
                Already registered?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 underline font-medium"
                >
                  Login
                </Link>
              </p>
            </div>

            {/* RIGHT SIDE – FORM */}
            <form onSubmit={handleRegister} className="space-y-4 w-full">
              

              {/* NAME ROW */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="middleName"
                  placeholder="Middle Name"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* EMAIL */}
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-4 pl-10 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* BLOOD GROUP */}
              <div className="relative">
                <Droplet className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-4 pl-10 focus:ring-2 focus:ring-blue-500"
                >
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

              {/* DOB */}
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-4 pl-10 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="text-sm  p-1 m-0 text-gray-600">
                OTP sent to +91 {formData.mobileNo}
              </div>
              {/* OTP */}
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="otp"
                  maxLength={6}
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="text-sm text-gray-400">
                By registering, you confirm that the information provided is accurate and belongs to you. Providing incorrect details may lead to application rejection.
              </div>


              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2.5 rounded-lg shadow-md hover:bg-green-700 active:scale-[0.98] transition-all"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        )}

        {/* Footer */}
        {step === 1 && (
          <div className="w-full mt-6 text-center ">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


export default Signup;