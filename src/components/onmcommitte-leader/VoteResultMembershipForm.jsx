import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

function VoteResultMembershipForm({
  voteResult,
  meetingId,
  applicationId,
  onCloseVoteResult,
}) {
  const [loading, setLoading] = useState(false);

  const handleFinalAction = async (action) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/meetings/${meetingId}/final-${action}/${applicationId}`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!res.ok) throw new Error("Action failed");

      alert(`Application ${action.toUpperCase()} successfully`);
      onCloseVoteResult();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Vote Summary</h2>
          <button onClick={onCloseVoteResult}>✕</button>
        </div>

        {/* Vote Counts */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span>Total Votes</span>
            <span className="font-semibold">{voteResult.totalVotes}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Approved</span>
            <span className="font-semibold">
              {voteResult.approvedCount}
            </span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>Rejected</span>
            <span className="font-semibold">
              {voteResult.rejectedCount}
            </span>
          </div>
        </div>

        {/* Final Actions */}
        <div className="flex gap-4">
          <button
            disabled={loading}
            onClick={() => handleFinalAction("approve")}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
          >
            <CheckCircle size={18} />
            Final Approve
          </button>

          <button
            disabled={loading}
            onClick={() => handleFinalAction("reject")}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700"
          >
            <XCircle size={18} />
            Final Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoteResultMembershipForm;
