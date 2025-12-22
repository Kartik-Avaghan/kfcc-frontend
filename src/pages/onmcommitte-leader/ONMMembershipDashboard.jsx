import React, { useEffect, useState } from "react";
import { Eye, FileText, Loader2, Users, Phone, CheckCircle, Calendar, Vote } from "lucide-react";
import ViewMembershipForm from "../../components/staff/ViewMembershipForm";

function ONMMembershipDashboard() {
 
  const [memberships, setMemberships] = useState([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/membership/pending/requests`,
          {
            method: "GET",
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        setMemberships(
          data.filter((item) => item.status === "STAFF_APPROVED")
        );
      } catch (err) {
        console.log("API error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, [selectedApplicationId]);


  


  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-blue-600">
        <Loader2 className="animate-spin mr-2" />
        Loading membership applications...
      </div>
    );
  }

  return (
    <div className="p-16 max-w-7xl mx-auto space-y-8">
  
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-blue-900">
          Applied Membership Applications
        </h1>
        <p className="text-sm text-gray-600">
          Review and verify submitted membership requests
        </p>
      </div>

      {/* <span className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
        Total: {memberships.length}
      </span> */}
      
    </div>

  
    {memberships.length === 0 && (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500">
        <FileText className="w-12 h-12 mb-3 text-gray-400" />
        <p className="text-lg font-medium">
          No submitted membership applications
        </p>
      </div>
    )}

  
    <div className="grid grid-cols-1 gap-8 w-full">
      {memberships.map((member) => (
        <div
          key={member.applicationId}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-600 overflow-hidden"
        >

          <div className="bg-blue-50 px-6 py-6 border-b border-gray-300">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    {/* LEFT: Applicant Info */}
    <div className="space-y-1">
      <h3 className="text-xl font-semibold text-gray-800">
        {member.applicantName}
      </h3>

      <div className="flex flex-wrap  gap-8 text-sm text-gray-600">
        <p>
          <span className="font-medium">Application ID:</span> #{member.applicationId}
        </p>
      </div>
    </div>

    {/* RIGHT: Action Buttons */}
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
      <button
        onClick={() => setSelectedApplicationId(member)}
        className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition shadow-md hover:shadow-lg"
      >
        <Eye className="w-4 h-4" />
        View Membership Form
      </button>

      <button
        className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-green-700 transition shadow-md hover:shadow-lg"
      >
        <Vote className="w-4 h-4" />
        Voting Result
      </button>
    </div>

  </div>
</div>


          {/* ===== Card Body ===== */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

              {/* Category */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Membership Type</p>
                  <p className="text-gray-800 font-semibold">
                    {member.membershipCategory || "—"}
                  </p>
                </div>
              </div>

              {/* Mobile */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Mobile Number</p>
                  <p className="text-gray-800 font-semibold">
                    {member.mobileNo || "—"}
                  </p>
                </div>
              </div>

              {/* Submitted At */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Submitted At</p>
                  <p className="text-gray-800 font-semibold">
                    {member?.submittedAt ? new Date(member.submittedAt).toLocaleDateString("en-IN") : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

        
          {/* <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
            <button
              onClick={() => setSelectedMember(member)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              <Eye className="w-4 h-4" />
              View Membership Form
            </button>
          </div> */}
        </div>
      ))}
    </div>

  
    {selectedApplicationId && (
      <ViewMembershipForm
        applicationId={selectedApplicationId.applicationId}
        onClose={() => setSelectedApplicationId(null)}
      />
    )}

  </div>

  );
}

export default ONMMembershipDashboard;
