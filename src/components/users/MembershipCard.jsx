import { useEffect, useState } from "react";
import { notify } from "../../Utils/notify";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  FileText,
  Search,
} from "lucide-react";
import ViewMembershipForm from "../membershipformView/ViewMembershipForm";
import EditMembershipForm from "./EditMembershipForm";

const STATUS_FLOW = {
  SUBMITTED: 0,

  STAFF_APPROVED: 1,
  STAFF_REMARKED: 1,
  STAFF_REJECTED: 1,

  ONM_VOTING: 2,
  ONM_APPROVED: 2,
  ONM_REMARKED: 2,
  ONM_REJECTED: 2,

  EC_HOLD: 3,
  EC_REMARKED: 3,
  EC_REJECTED: 3,

  FINAL_APPROVED: 4,
};

const getStatusType = (status) => {
  if (status?.includes("REJECTED")) return "REJECTED";
  if (status?.includes("REMARKED")) return "REMARKED";
  if (status?.includes("HOLD")) return "HOLD";
  if (status === "FINAL_APPROVED") return "APPROVED";
  return "IN_PROGRESS";
};

const STATUS_STYLES = {
  IN_PROGRESS: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    bar: "bg-blue-600",
    icon: Clock,
  },
  REMARKED: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    bar: "bg-yellow-600",
    icon: AlertTriangle,
  },

  REJECTED: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    bar: "bg-red-600",
    icon: XCircle,
  },
  APPROVED: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    bar: "bg-green-600",
    icon: CheckCircle,
  },
  HOLD: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    bar: "bg-orange-600",
    icon: AlertTriangle,
  },
};

const STEPS = [
  "Submitted",
  "Staff",
  "ONM Committee",
  "EC Members",
  "Final Approval",
];

export default function MembershipCard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [formMode, setFormMode] = useState(null); // "view" | "edit"

  /* ===== FETCH API ===== */
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/membership/user/applications`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: ` ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch applications");

        const data = await res.json();
        console.log("Membership data",data);

        setApplications(data);
      } catch (err) {
        notify(err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleOpenForm = (details) => {
    setSelectedAppId(details.applicationId);
    if (getStatusType(details.status) === "REMARKED") {
      setFormMode("edit");
    } else {
      setFormMode("view");
    }
  };

  const filteredApplications = applications.filter((app) => {
    const term = searchTerm.toLowerCase();
    return (
    app.membershipCategory?.toLowerCase().includes(term)||
    app.applicationId?.toString().toLowerCase().includes(term) ||
    app.applicantName?.toLowerCase().includes(term)
    )
  });

  return (
    <div className="p-16 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900">
          Membership Applications
        </h1>
        <p className="text-blue-900 text-sm mt-1">
          Track and manage your membership applications status
        </p>
      </div>


      

      {/* SEARCH */}
      <div className="flex items-center gap-2 mb-10 max-w-lg border-2 border-gray-300 rounded-xl p-3">
        <Search className="w-5 h-5 text-gray-600" />
        <input
          type="text"
          placeholder="Search by title, director, language..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full focus:outline-none"
        />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-500 mt-20">
          Loading applications...
        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredApplications.length === 0 && (
        <div className="flex flex-col items-center mt-24 text-gray-500">
          <FileText className="w-10 h-10 mb-3" />
          <p className="text-xl font-medium">No applications found</p>
        </div>
      )}

      <div className=" grid grid-cols-1 gap-6   ">
        {filteredApplications.map((application) => {
          const stepIndex = STATUS_FLOW[application.status] ?? 0;
          const statusType = getStatusType(application.status);
          const style = STATUS_STYLES[statusType];
          const StatusIcon = style.icon;

          return (
            <div
              key={application.applicationId}
              className={`${style.bg} ${style.border} border rounded-2xl p-6   shadow-md`}
            >
              {/* ===== HEADER ===== */}
              <div className=" flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className={` w-12 h-12 rounded-full ${style.bar} text-white flex items-center justify-center font-bold text-lg`}
                  >
                    {application.membershipCategory?.charAt(0)}
                  </div>

                  {/* Name & ID */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {application.membershipCategory}
                    </h2>
                    <p className="text-md text-gray-500">
                      Application No:{" "}
                      <span className="font-bold text-lg">
                        #{application.applicationId}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Status Pill */}
                {/* <span
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${style.text} bg-white border ${style.border}`}
          >
            <StatusIcon size={14} />
            {application.status.replaceAll("_", " ")}
          </span> */}

                <button
                  onClick={() => handleOpenForm(application)}
                  className={`px-6 py-2 rounded-xl text-white transition ${
                    statusType === "REMARKED"
                      ? "bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer"
                      : "bg-blue-700 hover:bg-blue-800 hover:cursor-pointer"
                  }`}
                >
                  {statusType === "REMARKED"
                    ? "Edit Application"
                    : "View Details"}
                </button>
              </div>

              {/* ===== STATUS MESSAGE ===== */}
              <div
                className={`mb-4 p-3 rounded-lg border ${style.border} ${style.bg} flex items-center gap-2`}
              >
                <StatusIcon size={18} className={style.text} />
                <p className={`text-sm font-medium ${style.text}`}>
                  {statusType === "APPROVED" &&
                    "Application approved successfully"}
                  {statusType === "IN_PROGRESS" &&
                    "Application is under process"}
                  {statusType === "REMARKED" &&
                    "Application needs clarification"}
                  {statusType === "REJECTED" && "Application has been rejected"}
                  {statusType === "HOLD" && "Application has been put on hold"}
                </p>
              </div>

              {/* ===== PROGRESS BAR ===== */}
              <div className="relative mb-4">
                <div className="flex items-center justify-between">
                  {STEPS.map((step, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center relative"
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold z-10
                    ${
                      i <= stepIndex
                        ? `${style.bar} text-white`
                        : "bg-gray-200 text-gray-400"
                    }`}
                      >
                        {i + 1}
                      </div>

                      {i < STEPS.length - 1 && (
                        <div
                          className={`absolute top-4 left-1/2 w-full h-0.5
                      ${i < stepIndex ? style.bar : "bg-gray-200"}`}
                          style={{ transform: "translateY(-50%)" }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  {STEPS.map((step, i) => (
                    <span
                      key={i}
                      className={`flex-1 text-center ${
                        i <= stepIndex ? `font-semibold ${style.text}` : ""
                      }`}
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* ===== REMARK / REJECT ===== */}

              {(statusType === "REMARKED" || statusType === "REJECTED") &&
                application.remark && (
                  <div
                    className={` mt-4 p-4 rounded-lg border ${style.border} ${style.bg}`}
                  >
                    <div className="flex items-start">
                      {" "}
                      {/* Label */}
                      <p className={`text-sm font-bold ${style.text}`}>
                        {statusType === "REMARKED"
                          ? "Remark:"
                          : "Rejection Reason:"}
                      </p>
                      {/* Remark Text (NOT bold) */}
                      <p className={`text-sm pl-2 ${style.text}`}>
                        {application.remark}
                      </p>
                    </div>

                    {/* Remarked By */}

                    {application.remarkedBy && (
                      <p className={`text-xs mt-2 ${style.text}`}>
                        <span className="font-bold">By:</span>{" "}
                        {application.remarkedBy}
                      </p>
                    )}
                  </div>
                )}

              {/* {(statusType === "REMARKED" || statusType === "REJECTED") &&
          application.remark && (
            <div
              className={`mt-4 p-4 rounded-lg border ${style.border} ${style.bg}`}
            >
              <h4 className={`text-sm font-bold ${style.text} mb-1`}>
                {statusType === "REMARKED" ? "Remark: " : "Rejection Reason"}  <span className={`text-sm text ${style.text}`}>{application.remark}</span>
              </h4>
             
              {application.remarkedBy && (
                <p className={`text-xs text ${style.text} mt-2`}>
                  <span className="font-bold" >By:</span> {application.remarkedBy}
                </p>
              )}
            </div>
          )} */}

              {/* ===== FOOTER ===== */}
              <div className="mt-5 pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-600">
                <span>
                  <span className="font-medium">Mobile:</span>{" "}
                  {application.mobileNo}
                </span>
                <span>
                  <span className="font-medium">Category:</span>{" "}
                  {application.membershipCategory ?? "—"}
                </span>
              </div>
            </div>
          );
        })}

        {formMode === "view" && selectedAppId && (
          <ViewMembershipForm
            applicationId={selectedAppId}
            onClose={() => setFormMode(null)}
          />
        )}

        {formMode === "edit" && selectedAppId && (
          <EditMembershipForm
            applicationId={selectedAppId}
            onClose={() => setFormMode(null)}
          />
        )}
      </div>
    </div>
  );
}
