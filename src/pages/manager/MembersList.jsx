import React, { useEffect, useState } from "react";
import { UserCheck, X, Plus, Minus } from "lucide-react";

function MembersList() {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch ONM committee members
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/role?role=ONM_COMMITTEE`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch members");

      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  const openCreateMeeting = () => {
    fetchMembers();
    setShowModal(true);
  };

 
  const appointLeader = async () => {
    if (!selectedMemberId) {
      alert("Please select a member");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/onm/meetings/create/{leaderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            memberId: selectedMemberId,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to appoint leader");

      alert("ONM Leader appointed successfully");
      setShowModal(false);
      setSelectedMemberId(null);
    } catch (err) {
      console.error(err);
      alert("Error appointing leader");
    }
  };

  return (
    <>
      {/* ACTION BUTTONS */}
      <div className="flex justify-between items-center mt-10 px-10">
        <button
          onClick={openCreateMeeting}
          className="flex items-center bg-blue-700 px-5 py-3 rounded-lg text-white"
        >
          <Plus size={20} className="mr-2" />
          Create Meeting
        </button>

        <button className="flex items-center bg-red-700 px-5 py-3 rounded-lg text-white">
          <Minus size={20} className="mr-2" />
          Terminate Meeting
        </button>
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
              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            {/* BODY */}
            {loading ? (
              <p className="text-center py-10">Loading members...</p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {members.map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer ${
                      selectedMemberId === m.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {m.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Name: {m.membershipCategory || "N/A"}
                      </p>
                    </div>

                    <input
                      type="radio"
                      name="leader"
                      checked={selectedMemberId === m.id}
                      onChange={() => setSelectedMemberId(m.id)}
                      className="h-5 w-5"
                    />
                  </label>
                ))}

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
                onClick={appointLeader}
                className="flex items-center bg-green-600 text-white px-5 py-2 rounded-lg"
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

export default MembersList;






