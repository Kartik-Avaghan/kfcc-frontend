import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, LockKeyhole } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      <div className="flex flex-col items-center text-center max-w-md">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="bg-red-600/10 p-6 rounded-full">
            <LockKeyhole className="w-16 h-16 text-red-500 animate-pulse" />
          </div>
          <div className="absolute inset-0 blur-xl bg-red-600/20 rounded-full"></div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold mb-3 tracking-wide">
          Unauthorized Access
        </h1>
        <p className="text-gray-400 mb-6">
          You don’t have permission to view this page. Please log in with the
          correct credentials or return to a safe page.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-lg transition font-semibold"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2.5 border border-gray-500 hover:border-orange-400 rounded-lg transition font-semibold"
          >
            Login
          </button>
        </div>

        {/* Footer graphic */}
        <div className="mt-10 text-gray-600 text-sm flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <span>Access restricted — Authorized users only</span>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
