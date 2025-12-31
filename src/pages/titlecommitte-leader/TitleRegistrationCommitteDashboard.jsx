
import React, { useEffect, useState } from "react";
import { Eye, FileText, Loader2, Users, Phone,  CheckCircle, Calendar, Vote, Search, Building, User, Film } from "lucide-react";
import ViewTitleRegistrationForm from "../../components/titleregistrationformView/ViewTitleRegistrationForm";
import { notify } from "../../Utils/notify";
import VoteRresultTitleRegistration from "../../components/titlecommitte-leader/VoteRresultTitleRegistration";


function TitleRegistrationCommitteDashboard() {
 
  const [memberships, setMemberships] = useState([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const[voteResult , setVoteResult]= useState();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  
    const fetchMemberships = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/titleRegistration/pending/requests`,
          {
            method: "GET",
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        // console.log(data);
        

        setMemberships(
          data.filter((item) => item.status === "STAFF_APPROVED")
        );
      } catch (err) {
        notify(err.message || "Failed to load data", "error");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {

    fetchMemberships();
  }, [selectedApplicationId]);

   const handleApplicationActionSuccess = (applicationId) => {
  setMemberships((prev) =>
    prev.filter((item) => item.id !== applicationId)
  );
};


  


  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-blue-600">
        <Loader2 className="animate-spin mr-2" />
        Loading title registration applications...
      </div>
    );
  }



  const filteredMemberships = memberships.filter((m) => {
  const q = searchTerm.toLowerCase();

  return (
    m.applicantName?.toLowerCase().includes(q) ||
    m.membershipCategory?.toLowerCase().includes(q) ||
    m.mobileNo?.toLowerCase().includes(q) ||
    String(m.id).includes(q)
  );
});

  return (
    <div className="p-16 max-w-7xl mx-auto space-y-8">
  
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-blue-900">
          Applied Title Registration Applications
        </h1>
        <p className="text-sm text-gray-600">
          Review and verify submitted title registration requests
        </p>
      </div>

      {/* <span className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
        Total: {memberships.length}
      </span> */}
      
    </div>


    <div className="mt-6 mb-10 max-w-xl">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
    <input
      type="text"
      placeholder="Search by name, category, mobile, ID..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full border rounded-lg py-2.5 pl-10 pr-4
                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
</div>


  
    {/* {memberships.length === 0 && (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500">
        <FileText className="w-12 h-12 mb-3 text-gray-400" />
        <p className="text-lg font-medium">
          No submitted title registration applications
        </p>
      </div>
    )} */}

    {/* Empty State */}
{!loading && memberships.length === 0 && (
  <div className="flex flex-col items-center justify-center py-24 text-gray-500">
    <FileText className="w-12 h-12 mb-3 text-gray-400" />
    <p className="text-lg font-medium">
      No membership applications found
    </p>
  </div>
)}

{/* No Search Results */}
{!loading && filteredMemberships.length === 0 && memberships.length > 0 && (
  <p className="text-center mt-10 text-gray-500">No records found</p>
)}


  
    <div className="grid grid-cols-1 gap-6 mt-6">
  {filteredMemberships.map((member) => (
    <div
      key={member.id}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition
                 border-l-4 border-blue-500 overflow-hidden"
    >
      {/* Card Header */}
      <div className="bg-blue-50 px-6 py-4 border-b">
        <div className="flex flex-col lg:flex-row justify-between gap-4">

          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {member.title}
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600 mt-2">
              <p><b>ID:</b> #{member.id}</p>
                    <p><b>Language:</b> {member.language}</p>
                    <p><b>Category:</b> {member.category}</p>
                    <p>
                      <b>Submitted:</b>{" "}
                      {member.createdAt
                        ? new Date(member.createdAt).toLocaleDateString()
                        : "-"}
                    </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setSelectedApplicationId(member)}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl
                         flex items-center gap-2 hover:bg-blue-700"
            >
              <Eye size={16} />
              View Title Registration Form
            </button>

            <button
              onClick={() => setVoteResult(member)}
              className="bg-green-600 text-white px-6 py-2 rounded-xl
                         flex items-center gap-2 hover:bg-green-700"
            >
              <Vote size={16} />
              Voting Result
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                icon={<Building className="text-blue-600" />}
                label="Producer"
                value={
                  member.producer
                    ? `${member.producer.firstName} ${member.producer.lastName ?? ""}`
                    : "-"
                }
              />

              <InfoCard
                icon={<User className="text-green-600" />}
                label="Director"
                value={member.director}
              />

              <InfoCard
                icon={<Film className="text-purple-600" />}
                label="Lead Actor"
                value={member.leadActor}
              />
            </div>

            {/* Status */}
            <div className="px-6 pb-6">
              <span className="text-sm text-gray-500">Current Status:</span>
              <span className="ml-2 bg-gray-100 px-3 py-1 rounded text-sm font-semibold">
                {member.status}
              </span>
            </div>
          </div>
  ))}
</div>


  
    {selectedApplicationId && (
      <ViewTitleRegistrationForm
        applicationId={selectedApplicationId.id}
        onClose={() => setSelectedApplicationId(null)}
        onActionSuccess={handleApplicationActionSuccess}
      />
    )}


    {voteResult && (
       <VoteRresultTitleRegistration
       acceptForApplicationId = {voteResult.id}
       onCloseVoteResult={()=> {setVoteResult(null);
        fetchMemberships()}
       }/>
    )
     
    }

  </div>

  );
}



function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value || "-"}</p>
      </div>
    </div>
  );
}

export default TitleRegistrationCommitteDashboard;
