import { useEffect, useState } from "react";
import {
  Eye,
  User,
  Building,
  Search,
  FileText,
  Calendar,
  BadgeCheck,
} from "lucide-react";
import { notify } from "../../Utils/notify";
import ViewIdCardDetails from "../../components/staff/ViewIdCardDetails";
// import ViewIdCardRequest from "../../components/idcard/ViewIdCardRequest"; 

function IdCardRequests() {
  const [idCardRequests, setIdCardRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  
    const fetchIdCards = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/idcard/pending`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch ID card requests");
        }

        const data = await response.json();
        setIdCardRequests(data);
      } catch (error) {
        notify(error.message || "Something went wrong", "error");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {

    fetchIdCards();
  }, []);

  /* Search Filter */
  const filteredRequests = idCardRequests.filter((item) => {
    const term = searchTerm.toLowerCase();

    return (
      `${item.firstName} ${item.middleName ?? ""} ${item.lastName}`
        .toLowerCase()
        .includes(term) ||
      item.membershipNumber?.toLowerCase().includes(term) ||
      item.membershipCategory?.toLowerCase().includes(term) ||
      item.firmName?.toLowerCase().includes(term)||
      item.mobileNo?.toString().toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            ID Card Requests
          </h1>
          <p className="text-sm text-gray-600">
            Review and process pending ID card applications
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mt-6 mb-10 max-w-xl">
        <div className="flex items-center gap-2 border-2 border-gray-300 rounded-xl p-3">
          <Search className="w-5 h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search by name, membership number, firm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full focus:outline-none"
          />
        </div>
      </div>

      {/* Empty State */}
      {!loading && filteredRequests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <FileText className="w-12 h-12 mb-3 text-gray-400" />
          <p className="text-lg font-medium">No ID card requests found</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="text-center mt-10 text-gray-500">Loading...</p>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {filteredRequests.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition  overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-orange-50 px-6 py-4 border-b border-gray-300">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {item.firstName} {item.middleName ?? ""} {item.lastName}
                  </h3>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mt-2">
                    {/* <p>
                      <b>ID:</b> #{item.id}
                    </p> */}
                    <p>
                      <b>Mobile No:</b> {item.mobileNo}
                    </p>
                    {/* <p>
                      <b>Category:</b> {item.membershipCategory}
                    </p> */}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRequest(item)}
                  className="bg-blue-600 text-white h-12 px-6 rounded-xl flex items-center gap-2 hover:bg-blue-700 cursor-pointer"
                >
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                icon={<Building className="text-blue-600" />}
                label="Firm Name"
                value={item.firmName}
              />

              <InfoCard
                icon={<BadgeCheck className="text-green-600" />}
                label="Membership No"
                value={item.membershipNumber}
              />

              <InfoCard
                icon={<User className="text-purple-600" />}
                label="Category"
                value={item.membershipCategory}
              />
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <span className="text-sm text-gray-500">Submitted At:</span>
              <span className="ml-2 px-3 py-1 rounded text-sm font-semibold">
                {new Date(item.submittedAt).toLocaleDateString("en-IN")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View Details Modal */}
      {selectedRequest && (
        <ViewIdCardDetails
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onSuccessAction = {fetchIdCards}
        />
      )}
    </div>
  );
}

/* Reusable Info Card */
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

export default IdCardRequests;
