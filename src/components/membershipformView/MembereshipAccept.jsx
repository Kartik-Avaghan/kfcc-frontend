import React from "react";
import { useState } from "react";
import { X, MessageSquare, AlertTriangle, CheckCircle } from 'lucide-react';

function MembershipAccept({ applicationId, onClose , onSuccess }) {
  const [actionLoading, setActionLoading] = useState(false);

  const handleAccept = async () => {
    setActionLoading(true);

    // const action = "APPROVE";

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/membership/${applicationId}/action`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            action: "APPROVE",
            remark: "",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to accept");

      alert(" Application accepted successfully");
      onClose();
      onSuccess();
    } catch (err) {
      alert(" Failed to accept application");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-green-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20 hover:cursor-pointer "
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 pr-10">
            <div className="p-2">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Accept Application</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Info Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-800 text-sm font-medium mb-1">
                  Important Notice
                </p>
                <p className="text-yellow-700 text-xs leading-relaxed">
                  This Application will be esculated to the next level.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleAccept} className="space-y-6">
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-linear-to-r from-green-600 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-700 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer"
              >
                <CheckCircle className="size-5" />
                {actionLoading ? "Accepting..." : "Accept"}
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-linear-to-r from-green-600 to-green-600"></div>
      </div>
    </div>
  );
}

export default MembershipAccept;
