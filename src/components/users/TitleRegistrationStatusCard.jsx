import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Search,
  AlertCircle,
  FileText,
} from "lucide-react";
import { notify } from "../../Utils/notify";
import ViewTitleRegistrationForm from "../titleregistrationformView/ViewTitleRegistrationForm";
import EditTitleRegistrationForm from "./EditTitleRegistrationForm";

/*  STATUS FLOW  */
const STATUS_STEP_INDEX = {
  DRAFT: 0,
  SUBMITTED: 1,

  STAFF_APPROVED: 2,
  STAFF_REJECTED: 2,
  STAFF_REMARKED: 2,

  TITLE_COMMITTEE_APPROVED: 3,
  TITLE_COMMITTEE_REJECTED: 3,
  TITLE_COMMITTEE_REMARKED: 3,

  EC_COMMITTEE_HOLD: 4,
  EC_COMMITTEE_REJECTED: 4,
  EC_COMMITTEE_REMARKED: 4,

  FINAL_APPROVED: 4,
  REJECTED: 4,
};

const STEPS = [
  "Submitted",
  "Staff Review",
  "Title Committee",
  "EC Committee",
  "Final Approval",
];

/*  STATUS TYPE  */
const getStatusType = (status) => {
  if (!status) return "IN_PROGRESS";
  if (status.includes("REJECTED")) return "REJECTED";
  if (status.includes("REMARKED")) return "REMARKED";
  if (status === "FINAL_APPROVED") return "APPROVED";
  return "IN_PROGRESS";
};

/*  STATUS STYLES  */
const STATUS_STYLE = {
  //  PENDING: {
  //   bar: "bg-blue-600",
  //   text: "text-blue-700",
  //   bg: "bg-blue-50",
  //   border: "border-blue-600",
  //   badge: "border-blue-200",
  //   icon: Clock,
  //   message: "Application is currently under review",
  // },
  IN_PROGRESS: {
    bar: "bg-blue-600",
    text: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-600",
    badge: "border-blue-200",
    icon: Clock,
    message: "Application is currently under review",
  },
  REMARKED: {
    bar: "bg-yellow-600",
    text: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-600",
    badge: "border-yellow-200",
    icon: AlertTriangle,
    message: "Application needs attention - please review remarks",
  },
  REJECTED: {
    bar: "bg-red-600",
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-600",
    badge: "border-red-200",
    icon: XCircle,
    message: "Application has been rejected",
  },
  APPROVED: {
    bar: "bg-green-600",
    text: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-600",
    badge: "border-green-200",
    icon: CheckCircle,
    message: "Application has been approved successfully",
  },
};

/*  MAIN COMPONENT  */
export default function TitleRegistrationStatusCard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // const[viewFormOpen,setViewFormOpen]=useState(false);
  // const[editForm,setEditForm]=useState(false);
  const [selectedAppId, setSelectedAppId] = useState(null);
const [formMode, setFormMode] = useState(null); // "view" | "edit"


  /*  FETCH  */
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/titleRegistration/user/applications`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch applications");

        const data = await response.json();
        console.log(data);
        
        setApplications(Array.isArray(data) ? data : []);
      } catch (error) {
        notify(error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  /* ================= SEARCH ================= */
  const filteredApplications = applications.filter((d) => {
    const term = searchTerm.toLowerCase();
    return (
      d.title?.toLowerCase().includes(term) ||
      d.director?.toLowerCase().includes(term) ||
      d.language?.toLowerCase().includes(term)
    );
  });

  const handleOpenForm = (detail) => {
  if (getStatusType(detail.status) === "REMARKED") {
    setFormMode("edit");
  } else {
    setFormMode("view");
  }
  setSelectedAppId(detail.id);
};


 
  return (
    <div className="p-16 max-w-7xl mx-auto">
  {/* HEADER */}
  <div className="mb-8">
    <h1 className="text-2xl font-bold text-blue-900">
      Title Registration Applications
    </h1>
    <p className="text-blue-900 text-sm mt-1">
      Track and manage your title registration status
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

  {/* LIST */}
  <div className="grid grid-cols-1 gap-6">
    {filteredApplications.map((detail) => {
      // const stepIndex = STATUS_STEP_INDEX[detail.status] ?? 0;
      const rawStepIndex = STATUS_STEP_INDEX[detail.status] ?? 0;
const stepIndex = Math.min(rawStepIndex, STEPS.length - 1);

      const statusType = getStatusType(detail.status);
      const style = STATUS_STYLE[statusType];
      const Icon = style.icon;

      return (
        <div
          key={detail.id}
          className={`bg-white rounded-2xl shadow-lg border-l-4 ${style.border} overflow-hidden`}
        >
          {/* CARD HEADER */}
          <div className={`px-6 py-4 ${style.bg} border-b border-gray-200`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {detail.title}
                </h3>
                {/* <p className="text-sm text-gray-600">
                  Application ID: {detail.id}
                </p> */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <p>Application No: <span className="font-bold text-lg">{detail.id}</span></p>
                        <p>Submitted Date: <span className="font-mono font-medium">{new Date(detail.date).toLocaleDateString()}</span></p>
                        <p>Director: <span className="font-medium">{detail.director}</span></p>
                

                        {detail.acceptedDate && (
                          <p>Accepted Date: <span className="font-medium">{new Date(detail.acceptedDate).toLocaleDateString()}</span></p>
                        )}
                    
                      </div>
              </div>

              <button
                onClick={() => handleOpenForm(detail)}
                className={`px-6 py-2 rounded-xl text-white transition ${
                  statusType === "REMARKED"
                    ? "bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer"
                    : "bg-blue-900 hover:bg-blue-800 hover:cursor-pointer"
                }`}
              >
                {statusType === "REMARKED"
                  ? "Edit Application"
                  : "View Details"}
              </button>
            </div>
          </div>

          {/* CARD BODY */}
          <div className="p-6">
            {/* STATUS BADGE */}
            <div className="w-fit mb-10">
              <span
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border ${style.badge} ${style.text}`}
              >
                <Icon size={16} />
                {detail.status.replaceAll("_", " ")}
              </span>
            </div>

            {/* PROGRESS */}
            <div className="relative w-full mb-16">
              {/* BAR */}
              <div className="relative w-full h-0.5 bg-gray-200 rounded-full">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full ${style.bar}`}
                  style={{
                    width: `${(stepIndex / (STEPS.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {/* STEPS OVER BAR */}
              <div className="absolute left-0 top-1/2 -translate-y-1/3 w-full flex justify-between px-1">
                {STEPS.map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${
                        i <= stepIndex
                          ? `${style.bar} text-white`
                          : "bg-gray-300 text-gray-500"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`mt-3 text-xs font-medium text-center ${
                        i <= stepIndex
                          ? style.text
                          : "text-gray-400"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* STATUS MESSAGE */}
            <p
              className={`text-sm px-4 py-2 rounded-lg border ${style.bg} ${style.text}`}
            >
              {style.message}
            </p>

            {/* REMARK / REJECT */}
            {(statusType === "REMARKED" ||
              statusType === "REJECTED") &&
              detail.remark && (
                <div
                  className={`mt-4 p-4 rounded-lg border ${style.bg} ${style.text}`}
                >
                  <p className={`text-sm text ${style.text} `}>
                   <span className="font-bold">Remarks:</span> {detail.remark}
                  </p>
                  {detail.remarkedBy && (
                    <p className={`text-xs text ${style.text} mt-2`}>
                      <span className="font-bold" >By:</span> {detail.remarkedBy}
                    </p>
                  )}
                </div>
              )}
          </div>
        </div>
      );
    })}
  </div>

  {/* {viewFormOpen && <ViewTitleRegistrationForm applicationId={viewFormOpen} onClose={()=>setViewFormOpen(false)}/>}

    {editForm && <EditTitleRegistrationForm applicationId={editForm} onClose={()=>setEditForm(false)}/>} */}


    {formMode === "view" && selectedAppId && (
  <ViewTitleRegistrationForm
    applicationId={selectedAppId}
    onClose={() => {
      setFormMode(null);
      setSelectedAppId(null);
    }}
  />
)}

{formMode === "edit" && selectedAppId && (
  <EditTitleRegistrationForm
    applicationId={selectedAppId}
    onClose={() => {
      setFormMode(null);
      setSelectedAppId(null);
    }}
  />
)}




</div>

  );
}
