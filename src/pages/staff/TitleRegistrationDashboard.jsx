import React, { useEffect, useState } from "react";
import { Eye, Film, User, Building, Search, FileText } from "lucide-react";
import { notify } from "../../Utils/notify";
import ViewTitleRegistrationForm from "../../components/titleregistrationformView/ViewTitleRegistrationForm";

function TitleRegistrationDashboard() {
  const [registerDetails, setRegisterDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);

  useEffect(() => {
    const fetchTitleRegistrations = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/titleRegistration/pending/requests`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        setRegisterDetails(
          Array.isArray(data)
            ? data.filter((item) => item.status === "SUBMITTED")
            : []
        );
      } catch (err) {
        notify(err.message || "Failed to load data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchTitleRegistrations();
  }, []);

  const filteredDetails = registerDetails.filter((detail) => {
    const term = searchTerm.toLowerCase();

    return (
      detail?.title?.toLowerCase().includes(term) ||
      detail?.director?.toLowerCase().includes(term) ||
      detail?.leadActor?.toLowerCase().includes(term) ||
      `${detail?.producer?.firstName ?? ""} ${detail?.producer?.lastName ?? ""}`
        .toLowerCase()
        .includes(term)
    );
  });


  const handleApplicationActionSuccess = (applicationId) => {
  setRegisterDetails((prev) =>
    prev.filter((item) => item.id !== applicationId)
  );
};


  return (
    <div className="p-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            Applied Title Registration Applications
          </h1>
          <p className="text-sm text-gray-600">
            Review and verify submitted title registration requests
          </p>
        </div>
      </div>

     

      {/* Search */}
     <div className="mt-6 mb-10 max-w-xl">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />

    <input
      type="text"
      placeholder="Search by title, producer, director, actor..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full border rounded-lg py-2.5 pl-10 pr-4
                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
</div>

 {/* Empty State */}
      {!loading && registerDetails.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <FileText className="w-12 h-12 mb-3 text-gray-400" />
          <p className="text-lg font-medium">
            No submitted title registration applications
          </p>
        </div>
      )}


      {/* Loading */}
      {loading && (
        <p className="text-center mt-10 text-gray-500">Loading...</p>
      )}

      {/* No Results */}
      {!loading && filteredDetails.length === 0 && registerDetails.length > 0 && (
        <p className="text-center mt-10 text-gray-500">No records found</p>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {filteredDetails.map((detail) => (
          <div
            key={detail.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition border-l-4 border-blue-500 overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-blue-50 px-6 py-4 border-b">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {detail.title}
                  </h3>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600 mt-2">
                    <p><b>ID:</b> #{detail.id}</p>
                    <p><b>Language:</b> {detail.language}</p>
                    <p><b>Category:</b> {detail.category}</p>
                    <p>
                      <b>Submitted:</b>{" "}
                      {detail.createdAt
                        ? new Date(detail.createdAt).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                </div>

                <button onClick={()=> setSelectedRegistrationId(detail)}  className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700">
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                icon={<Building className="text-blue-600" />}
                label="Producer"
                value={
                  detail.producer
                    ? `${detail.producer.firstName} ${detail.producer.lastName ?? ""}`
                    : "-"
                }
              />

              <InfoCard
                icon={<User className="text-green-600" />}
                label="Director"
                value={detail.director}
              />

              <InfoCard
                icon={<Film className="text-purple-600" />}
                label="Lead Actor"
                value={detail.leadActor}
              />
            </div>

            {/* Status */}
            <div className="px-6 pb-6">
              <span className="text-sm text-gray-500">Current Status:</span>
              <span className="ml-2 bg-gray-100 px-3 py-1 rounded text-sm font-semibold">
                {detail.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedRegistrationId && (
        <ViewTitleRegistrationForm
        applicationId = {selectedRegistrationId.id}
        onClose={() => setSelectedRegistrationId(null)}
        onActionSuccess={handleApplicationActionSuccess} />
      )}
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

export default TitleRegistrationDashboard;
