import React, { useEffect, useState } from "react";
import { Users, CheckSquare, Square, Search } from "lucide-react";
import { notify } from "../../Utils/notify";
import { useNavigate } from "react-router-dom";

function ONMMemberList() {
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [meeting, setMeeting] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch ONM Committee Members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/user/role?role=ONM_COMMITTEE`,
          {
            method: "GET",
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch members");
        }

        const data = await res.json();
        setMembers(data);
      } catch (err) {
        console.log("Error fetching ONM members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

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

  // useEffect(()=>{
  const handleStartVoting = async (e) => {
    if (!meeting?.id) {
      notify("No active meeting found", "error");
      return;
    }

    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/onm/meetings/${
          meeting.id
        }/addMembers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ memberIds: selected }),
        }
      );

      if (!response.ok) throw new Error("Failed to assign members");

      const data = await response.json();
     
      notify("Voting started successfully", "success");
      navigate("/onmleader/membershipDashboard");
    } catch (error) {
      notify(error.message, "error");
      
    }
  };

  // },[])

  // Search filter (API data)
  const filteredMembers = members.filter((member) =>
    `${member.firstName ?? ""} ${member.lastName ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Select / Unselect member
  const toggleMember = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-16 ">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-blue-900">
          Select Members for Voting
        </h1>
      </div>

      {/* Search Bar */}
      <div className="relative flex mb-8 max-w-xl">
        <Search
          size={22}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 py-2 border border-gray-400 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading members...</p>}

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!loading && filteredMembers.length > 0
          ? filteredMembers.map((member) => {
              const isSelected = selected.includes(member.id);

              return (
                <div
                  key={member.id}
                  className={`px-2 py-4 rounded-xl border shadow-sm flex justify-between items-center transition
                ${isSelected ? "bg-blue-50 border-blue-400" : "bg-white"}`}
                >
                  {/* Member Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {member.firstName} {member.middleName} {member.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Mobile: {member.mobileNo}
                    </p>
                  </div>

                  {/* Checkbox */}
                  <button
                    className="cursor-pointer"
                    onClick={() => toggleMember(member.id)}
                  >
                    {isSelected ? (
                      <CheckSquare className="text-blue-600 w-6 h-6" />
                    ) : (
                      <Square className="text-gray-600 w-6 h-6" />
                    )}
                  </button>
                </div>
              );
            })
          : !loading && (
              <div className="flex justify-center items-center">
                {" "}
                <p className="text-gray-500 col-span-2">No members found.</p>
              </div>
            )}
      </div>

      {/* Floating Action Bar */}
      {selected.length > 0 && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-4">
          <span className="font-medium">
            {selected.length} member(s) selected
          </span>

          <button
            onClick={handleStartVoting}
            className="bg-white text-blue-700 px-4 py-1.5 rounded-md font-semibold"
          >
            Start Voting Process
          </button>
        </div>
      )}
    </div>
  );
}

export default ONMMemberList;
