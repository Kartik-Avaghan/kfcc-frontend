import React, { useState } from "react";
import { X, MessageSquare, AlertTriangle, Send } from 'lucide-react';
import { notify } from "../../Utils/notify";

function MembershipReject({ applicationId, onClose, onSuccess }) {
  const [remark, setRemark] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_BASE_URL}/membership/${applicationId}/action`, {
      method: "POST",
      headers: {
        "Authorization": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "REJECT",
        remark : remark,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response not ok");
        }
        notify("Application is Rejected","error")
        onClose(false);
        onSuccess();
        return response.json();
      })
      .then((data) => {
        console.log("Remark submitted:", data);
         // close popup after success
      })
      .catch((error) => console.log("Error:", error));
  }

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
        <div className="bg-red-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 pr-10">
            <div className="p-2">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Reject Application</h2>
              <p className="text-yellow-100 text-sm">Provide feedback for this application</p>
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
                <p className="text-yellow-800 text-sm font-medium mb-1">Important Notice</p>
                <p className="text-yellow-700 text-xs leading-relaxed">
                  This remark will be sent to the applicant. Please provide clear and constructive feedback.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Textarea */}
            <div className="space-y-2">
              <label htmlFor="remark" className="block text-sm font-medium text-gray-700">
                Your Remark *
              </label>
              <textarea
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Enter your detailed remark here. Be specific about what needs to be addressed or improved..."
                className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200 resize-none"
                rows={5}
                required
                minLength={10}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">Minimum 10 characters required</p>
                <p className="text-xs text-gray-500">{remark.length} characters</p>
              </div>
            </div>

            {/* Action Buttons */}
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
                disabled={remark.length < 10}
                className="flex-1 bg-linear-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:from-yellow-700 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer"
              >
                <X className="size-5" />
                 Reject 
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-linear-to-r from-yellow-600 to-orange-600"></div>
      </div>
    </div>
  );
}

export default MembershipReject;
