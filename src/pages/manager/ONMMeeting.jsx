import React, { useEffect, useState } from "react";
import {
  UserCheck,
  X,
  Plus,
  Minus,
  Square,
  CheckSquare,
  CalendarClock,
  User,
  Phone,
  ShieldCheck,
  Power,
} from "lucide-react";
import { notify } from "../../Utils/notify";

function ONMMeeting() {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState([]);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/onm/meetings/status?status=ACTIVE`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response) throw new Error("The response was not ok");

        const data = await response.json();
        setMeetingDetails(data);
      } catch (error) {
        notify(error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, []);

  //  Fetch ONM committee members
  // useEffect(()=>{
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/role?role=ONM_COMMITTEE`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch members");

      const data = await res.json();
      setMembers(data);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleTerminateMeeting = async (meetingId) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/onm/meetings/${meetingId}/terminate`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!res.ok) throw new Error("Failed to terminate meeting");

      notify("Meeting terminated successfully", "success");

      // Refresh meetings
      setMeetingDetails((prev) => prev.filter((m) => m.id !== meetingId));
    } catch (err) {
      notify(err.message, "error");
    }
  };

  // fetchMembers();
  // },[])

  const openCreateMeeting = () => {
    setSelectedMemberId(null);
    fetchMembers();
    setShowModal(true);
  };

  const toggleMember = (id) => {
    setSelectedMemberId((prev) => (prev === id ? null : id));
  };

  const appointLeader = async () => {
    if (!selectedMemberId) {
      alert("Please select a member");
      return;
    }

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/onm/meetings/create/${selectedMemberId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          // body: JSON.stringify({

          // }),
        }
      );

      if (!res.ok) throw new Error("Failed to appoint leader");

      notify("ONM Leader appointed successfully", "success");
      setShowModal(false);
      setSelectedMemberId(null);
    } catch (err) {
      notify(err.message, "error");
    }
  };

  return (
    <>
      {/* ACTION BUTTONS */}
      <div className="flex justify-between items-center  mt-10 px-20">
        <button
          onClick={openCreateMeeting}
          className="flex items-center bg-blue-700 hover:bg-blue-800 px-5 py-3 rounded-lg text-white hover:cursor-pointer"
        >
          <Plus size={20} className="mr-2" />
          Create ONM Meeting
        </button>
      </div>

      <div className="p-16 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">
              Active ONM Meetings
            </h1>
            <p className="text-sm text-gray-600">
              Manage ongoing ONM committee meetings
            </p>
          </div>

          {/* <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
      Total: {meetingDetails.length}
    </span> */}
        </div>

        {/* Empty State */}
        {!loading && meetingDetails.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <p className="text-lg font-medium">No active meetings found</p>
          </div>
        )}

        {/* Meeting Cards */}
        <div className="grid grid-cols-1 gap-8">
          {meetingDetails.map((meeting) => {
            const createdAt = new Date(meeting.createdAt);

            return (
              <div
                key={meeting.id}
                className="bg-white rounded-2xl shadow-md border-l-4 border-blue-600 overflow-hidden hover:shadow-lg transition"
              >
                {/* Card Header */}
                <div className="bg-blue-50 px-6 py-5 border-b border-gray-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                        ONM Meeting #{meeting.id}
                      </h3>

                      <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                        <CalendarClock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">
                          {createdAt.toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </p>
                    </div>

                    {/* Terminate Button */}
                    <button
                      onClick={() => handleTerminateMeeting(meeting.id)}
                      className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 hover:cursor-pointer transition shadow"
                    >
                      <Power className="w-4 h-4" />
                      Terminate
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Leader */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <UserCheck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        ONM Leader
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {meeting.leader.firstName} {meeting.leader.lastName}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {meeting.leader.mobileNo}
                      </p>
                    </div>
                  </div>

                  {/* Created By */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Created By
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {meeting.createdBy.firstName}{" "}
                        {meeting.createdBy.lastName}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium pl-1 pb-1">
                        Status
                      </p>
                      <span className="inline-flex bg-green-100 text-green-700 px-3 py-0 rounded-full text-sm font-semibold">
                        {meeting.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Select ONM Committee Leader
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedMemberId(null);
                }}
                className="hover:cursor-pointer hover:text-gray-600"
              >
                <X />
              </button>
            </div>

            {/* BODY */}
            {loading ? (
              <p className="text-center py-10">Loading members...</p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {members.map((m) => {
                  const isSelected = selectedMemberId === m.id;

                  return (
                    <div
                      key={m.id}
                      className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition
        ${isSelected ? "border-blue-600 bg-blue-50" : "border-gray-200"}
      `}
                      onClick={() => toggleMember(m.id)}
                    >
                      {/* LEFT INFO */}
                      <div>
                        <p className="font-semibold text-gray-800">
                          {m.firstName} {m.middleName} {m.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Ph No: {m.mobileNo}
                        </p>
                      </div>

                      {/* RIGHT CHECK ICON */}
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); //
                          toggleMember(m.id);
                        }}
                      >
                        {isSelected ? (
                          <CheckSquare className="text-blue-600 w-6 h-6" />
                        ) : (
                          <Square className="text-gray-600 w-6 h-6" />
                        )}
                      </button>
                    </div>
                  );
                })}

                {!members.length && (
                  <p className="text-center text-gray-500">
                    No ONM committee members found
                  </p>
                )}
              </div>
            )}

            {/* FOOTER */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                disabled={!selectedMemberId}
                onClick={appointLeader}
                className={`flex items-center px-5 py-2 rounded-lg text-white
    ${selectedMemberId ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
              >
                <UserCheck size={18} className="mr-2" />
                Appoint Leader
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ONMMeeting;
