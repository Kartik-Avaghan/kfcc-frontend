import React, { useState } from "react";
import { Users, CheckSquare, Square, Search } from "lucide-react";
import { Link } from "react-router-dom";

function KFCCMemberList
() {
  const dummyMembers = [
    { id: 1, name: "Rahul Sharma", role: "Member" },
    { id: 2, name: "Amit Verma", role: "Member" },
    { id: 3, name: "Sneha Patil", role: "Member" },
    { id: 4, name: "Rohan Desai", role: "Member" },
    { id: 5, name: "Kavya Rao", role: "Member" },
  ];

  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  // FIXED: Search Filter Working
  const filteredMembers = dummyMembers.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleMember = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-blue-700 ">
          Select Members for Voting
        </h1>
      </div>

      {/* Search Bar */}
      <div className="relative flex mb-8 max-w-xl">
        <Search
          size={22}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input type="text" placeholder="search for members..." value={search} onChange={(e)=> setSearch(e.target.value)}
        className="w-full pl-12 py-2 border border-gray-400 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        {/* <input
          type="search"
          placeholder="Search for members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 py-2 w-full border border-gray-400 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        /> */}
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => {
            const isSelected = selected.includes(member.id);

            return (
              <div
                key={member.id}
                className={`p-4 rounded-xl border shadow-sm flex justify-between items-center transition 
                ${isSelected ? "bg-blue-50 border-blue-400" : "bg-white"}`}
              >
                {/* Member Info */}
                <div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
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
        ) : (
          <p className="text-gray-500 col-span-2">No members found.</p>
        )}
      </div>

      {/* Floating Action Bar */}
      {selected.length > 0 && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-4">
          <span className="font-medium">
            {selected.length} member(s) selected
          </span>
          <Link to="/o&m/leaderdashboard">
            <button className="bg-white text-blue-700 px-4 py-1.5 rounded-md font-semibold hover:bg-gray-100">
              Start Voting Process
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default KFCCMemberList
;
