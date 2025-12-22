import React, { useState } from "react";
import { Eye, Users, Phone, CheckCircle } from "lucide-react";




function MembershipDashboard() {
  const [selectedMember, setSelectedMember] = useState(null);

  const memberships = [
    {
      id: 101,
      name: "Rahul Sharma",
      category: "user",
      phone: "9876543210",
      email: "rahul@gmail.com",
      status: "Pending",
      formData: {},
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
       Membership Applications
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 mt-6 w-full px-2 sm:px-4">
        {memberships.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-600 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-50 px-6 py-4 border-b border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {member.name}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Membership ID:</span> #{member.id}
                    </p>
                    <p>
                      <span className="font-medium">Category:</span> {member.category}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {member.phone}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMember(member)}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-md flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Membership Form
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Membership Type
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {member.category}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Contact Number
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {member.phone}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Current Status
                    </p>
                    <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm font-semibold">
                      {member.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {/* {selectedMember && (
        <ViewMembershipForm
          data={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )} */}
    </div>
  );
}

export default MembershipDashboard;

