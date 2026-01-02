import React, { useEffect, useState } from "react";
import {
  Eye,
  Film,
  User,
  Building,
  Search,
  Vote,
  CheckCircle,
  FileText,
  Loader2,
} from "lucide-react";
import { notify } from "../../Utils/notify";
import ViewTitleRegistrationForm from "../../components/titleregistrationformView/ViewTitleRegistrationForm";
import VoteTitleRegistrationForm from "../../components/titlecommitte/VoteTitleRegistrationForm";

function TitleRegistrationVotingDashboard() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [viewApplication, setViewApplication] = useState(null);
  const [voteApplication, setVoteApplication] = useState(null);
  const [votedApplications, setVotedApplications] = useState(new Set());

  /*  FETCH  */
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/titleRegistration/pending/requests`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) throw new Error("Failed to load applications");

        const data = await response.json();
        setApplications(
          Array.isArray(data)
            ? data.filter((item) => item.status === "STAFF_APPROVED")
            : []
        );
      } catch (err) {
        notify(err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  /* ================= SEARCH ================= */
  const filteredApplications = applications.filter((app) => {
    const term = searchTerm.toLowerCase();
    return (
      app?.title?.toLowerCase().includes(term) ||
      app?.director?.toLowerCase().includes(term) ||
      app?.leadActor?.toLowerCase().includes(term) ||
      `${app?.producer?.firstName ?? ""} ${app?.producer?.lastName ?? ""}`
        .toLowerCase()
        .includes(term)
    );
  });

  /* ================= UI ================= */
  return (
    <div className="p-16 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-blue-900">
          Title Registration Voting
        </h1>
        <p className="text-sm text-gray-600">
          Review approved title registrations and cast your vote
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl">
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

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center h-48 text-blue-600">
          <Loader2 className="animate-spin mr-2" />
          Loading applications...
        </div>
      )}

     {/* EMPTY STATE: No applications at all */}
{!loading && applications.length === 0 && (
  <div className="flex flex-col items-center justify-center py-24 text-gray-500">
    <FileText className="w-14 h-14 mb-3 text-gray-400" />
    <p className="text-lg font-medium">
      Applications not found
    </p>
    <p className="text-sm text-gray-400">
      No title registration applications are available for voting
    </p>
  </div>
)}


{/* NO SEARCH RESULTS */}
{!loading &&
  applications.length > 0 &&
  filteredApplications.length === 0 && (
    <div className="flex flex-col items-center justify-center py-24 text-gray-500">
      <FileText className="w-12 h-12 mb-3 text-gray-400" />
      <p className="text-lg font-medium">No records found</p>
      {/* <p className="text-sm text-gray-400">
        Try searching with a different keyword
      </p> */}
    </div>
)}


      {/* Cards */}
      {!loading && filteredApplications.length > 0 && (
      <div className="grid grid-cols-1 gap-6">
        {filteredApplications.map((app) => {
          const isVoted = votedApplications.has(app.id);

          return (
            <div
              key={app.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition border-l-4 border-blue-600 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-blue-50 px-6 py-4 border-b">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {app.title}
                    </h3>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600 mt-2">
                      <p><b>ID:</b> #{app.id}</p>
                      <p><b>Language:</b> {app.language}</p>
                      <p><b>Category:</b> {app.category}</p>
                      <p>
                        <b>Submitted:</b>{" "}
                        {app.createdAt
                          ? new Date(app.createdAt).toLocaleDateString("en-IN")
                          : "-"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setViewApplication(app)}
                      className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700"
                    >
                      <Eye size={16} />
                      View Title Registration Form
                    </button>

                    <button
                      disabled={isVoted}
                      onClick={() => setVoteApplication(app)}
                      className={`px-6 py-2 rounded-xl flex items-center gap-2 text-white
                        ${
                          isVoted
                            ? "bg-yellow-600 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                      {isVoted ? (
                        <>
                          <CheckCircle size={16} />
                          Voted
                        </>
                      ) : (
                        <>
                          <Vote size={16} />
                          Vote
                        </>
                      )}
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
                    app.producer
                      ? `${app.producer.firstName} ${app.producer.lastName ?? ""}`
                      : "-"
                  }
                />
                <InfoCard
                  icon={<User className="text-green-600" />}
                  label="Director"
                  value={app.director}
                />
                <InfoCard
                  icon={<Film className="text-purple-600" />}
                  label="Lead Actor"
                  value={app.leadActor}
                />
              </div>

{/* status */}
              <div className="px-6 pb-6">
              <span className="text-sm text-gray-500">Current Status:</span>
              <span className="ml-2 bg-gray-100 px-3 py-1 rounded text-sm font-semibold">
                {app.status}
              </span>
            </div>
            </div>
          );
        })}
      </div>)}

      {/* Child Components */}
      {viewApplication && (
        <ViewTitleRegistrationForm
          applicationId={viewApplication.id}
          onClose={() => setViewApplication(null)}
        />
      )}

      {voteApplication && (
        <VoteTitleRegistrationForm
          voteApplicationId={voteApplication.id}
          onCloseVote={() => setVoteApplication(null)}
          onVoteSuccess={(id) => {
            setVotedApplications((prev) => new Set(prev).add(id));
            setVoteApplication(null);
          }}
        />
      )}
    </div>
  );
}

/* ================= INFO CARD ================= */
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

export default TitleRegistrationVotingDashboard;
