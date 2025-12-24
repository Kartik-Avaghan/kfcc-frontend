import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  X,
  FileText,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";
import { notify } from "../../Utils/notify";

import MembershipAccept from "../membershipformView/MembereshipAccept";
import MembershipRemark from "../membershipformView/MembershipRemark";
import MembershipReject from "../membershipformView/MembershipReject";

function VoteResultMembershipForm({
  acceptForApplicationId,
  onCloseVoteResult,
}) {
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [voteResult, setVoteResult] = useState(null);

  const [showAccept, setShowAccept] = useState(false);
  const [showRemark, setShowRemark] = useState(false);
  const [showReject, setShowReject] = useState(false);

  
  useEffect(() => {
    const fetchActiveMeeting = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/onm/meetings/status?status=ACTIVE`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch meeting");

        const data = await res.json();
        setMeeting(Array.isArray(data) && data.length ? data[0] : null);
      } catch (err) {
        notify(err.message, "error");
      }
    };

    fetchActiveMeeting();
  }, []);

  
  useEffect(() => {
    if (!meeting?.id) return;

    const fetchVoteSummary = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/onm/meetings/${meeting.id}/votes/${acceptForApplicationId}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch vote summary");

        setVoteResult(await res.json());
      } catch (err) {
        notify(err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchVoteSummary();
  }, [meeting, acceptForApplicationId]);

  const totalVotes = voteResult
    ? voteResult.approveCount + voteResult.rejectCount
    : 0;

  return (
    <>
     
      <div
        className="fixed inset-0 bg-black flex justify-center items-center z-40 p-4"
        onClick={onCloseVoteResult}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-6 relative">
            <button
              onClick={onCloseVoteResult}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20"
            >
              <X />
            </button>

            <div className="flex items-center gap-3">
              <FileText />
              <div>
                <h2 className="text-xl font-bold">Final Decision</h2>
                <p className="text-sm text-blue-100">
                  Application ID: {acceptForApplicationId}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <div className="flex gap-2">
                <AlertTriangle className="text-yellow-600" />
                <p className="text-xs text-yellow-700">
                  This is the final decision and cannot be changed later.
                </p>
              </div>
            </div>

            {/* Vote Summary */}
            {voteResult && (
              <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-2xl font-bold text-green-700">
                    {voteResult.approveCount}
                  </p>
                  <p className="text-xs">Approved</p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-2xl font-bold text-red-700">
                    {voteResult.rejectCount}
                  </p>
                  <p className="text-xs">Rejected</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-2xl font-bold text-blue-700">
                    {totalVotes}
                  </p>
                  <p className="text-xs">Total</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setShowAccept(true)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-green-600 text-green-700 hover:bg-green-50 font-medium"
              >
                <CheckCircle className="w-5 h-5" />
                Approve
              </button>

              <button
                onClick={() => setShowRemark(true)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-yellow-500 text-yellow-700 hover:bg-yellow-50 font-medium"
              >
                <MessageSquare className="w-5 h-5" />
                Remark
              </button>

              <button
                onClick={() => setShowReject(true)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-red-600 text-red-700 hover:bg-red-50 font-medium"
              >
                <XCircle className="w-5 h-5" />
                Reject
              </button>
            </div>
          </div>

          <div className="h-1 bg-blue-600"></div>
        </div>
      </div>

      {/* ================= POPUPS ================= */}
      {showAccept && (
        <MembershipAccept
          applicationId={acceptForApplicationId}
          onClose={() => setShowAccept(false)}
          onSuccess={() => {
            setShowAccept(false);
            onCloseVoteResult();
          }}
        />
      )}

      {showRemark && (
        <MembershipRemark
          applicationId={acceptForApplicationId}
          onClose={() => setShowRemark(false)}
          onSuccess={() => {
            setShowRemark(false);
            onCloseVoteResult();
          }}
        />
      )}

      {showReject && (
        <MembershipReject
          applicationId={acceptForApplicationId}
          onClose={() => setShowReject(false)}
          onSuccess={() => {
            setShowReject(false);
            onCloseVoteResult();
          }}
        />
      )}
    </>
  );
}

export default VoteResultMembershipForm;
