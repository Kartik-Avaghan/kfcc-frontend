import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle,
  XCircle,
  Send,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { notify } from "../../Utils/notify";

function VoteMembershipForm({ voteApplicationId, onCloseVote, onVoteSuccess }) {
  const [vote, setVote] = useState(null); // APPROVE | REJECT
  const [meeting, setMeeting] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActiveMeeting = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/onm/meetings/status?status=ACTIVE`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Meeting data:", data);

        if (Array.isArray(data) && data.length > 0) {
          setMeeting(data[0]); // take first ACTIVE meeting
        } else {
          setMeeting(null);
        }
      } catch (error) {
        console.error("Error fetching meeting:", error);
      }
    };

    fetchActiveMeeting();
  }, []);

  const submitVote = async () => {
    if (!meeting?.id) {
      notify("No active meeting found", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/onm/meetings/${meeting.id}/vote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            applicationId: voteApplicationId,
            vote: vote, //
          }),
        }
      );

      if (!res.ok) throw new Error("Vote failed");

      notify("Vote submitted successfully", "success");
      onVoteSuccess(voteApplicationId);
      onCloseVote();
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onCloseVote}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 relative">
          <button
            onClick={onCloseVote}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 pr-10">
            <div className="p-2">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">ONM Committee Vote</h2>
              <p className="text-sm text-blue-100">
                Application ID: {voteApplicationId}
              </p>
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
                  Your vote will be recorded and cannot be changed later.
                </p>
              </div>
            </div>
          </div>

          {/* Vote Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setVote("APPROVE")}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium border-2 transition-all duration-200 cursor-pointer
            ${
              vote === "APPROVE"
                ? "bg-green-50 border-green-600 text-green-700 shadow-md"
                : "border-gray-200 text-gray-700 hover:border-green-500 hover:bg-green-50"
            }`}
            >
              <CheckCircle className="w-5 h-5" />
              Approve
            </button>

            <button
              type="button"
              onClick={() => setVote("REJECT")}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium border-2 transition-all duration-200 cursor-pointer
            ${
              vote === "REJECT"
                ? "bg-red-50 border-red-600 text-red-700 shadow-md"
                : "border-gray-200 text-gray-700 hover:border-red-500 hover:bg-red-50"
            }`}
            >
              <XCircle className="w-5 h-5" />
              Reject
            </button>
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onCloseVote}
              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={submitVote}
              disabled={loading || !vote}
              className="flex-1 bg-linear-to-r from-blue-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
            >
              <Send className="w-5 h-5" />
              {loading ? "Submitting..." : "Submit Vote"}
            </button>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-linear-to-r from-blue-600 to-blue-600"></div>
      </div>

      {/* {alreadyVoted && (
        <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium text-sm">
                Vote already submitted
              </p>
              <p className="text-green-700 text-xs">
                You have already voted{" "}
                <span className="font-semibold">{existingVote}</span> for this
                application.
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default VoteMembershipForm;
