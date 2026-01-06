import React, { useEffect, useState } from "react";
import {
  Search,
  Film,
  User,
  Languages,
  CheckCircle,
  CircleParking,
  AlertTriangle,
  Clock,
  X,
  XCircle,
  FileText,
} from "lucide-react";
import { notify } from "../../Utils/notify";
import PublicityClearenceForm from "../../components/users/PublicityClearenceForm";
import ViewPublicityClearenceForm from "../../components/publicityClearenceFormView/ViewPublicityClearenceForm";
import EditPublicityClearenceDetails from "../../components/users/EditPublicityClearenceDetails";

/*  STATUS CONFIG  */

const STATUS_FLOW = {
  SUBMITTED: 0,

  STAFF_APPROVED: 1,
  STAFF_REMARKED: 1,
  STAFF_REJECTED: 1,

  VP_APPROVED: 2,
  VP_REMARKED: 2,
  VP_REJECTED: 2,

  SECRETARY_APPROVED: 3,
  SECRETARY_REMARKED: 3,
  SECRETARY_REJECTED: 3,

  FINAL_APPROVED: 4,
  MANAGER_REJECTED: 4,
};

const STEPS = [
  "Submitted",
  "Staff",
  "VP_Producer",
  "Secretary",
  "Final Approval",
];

const getStatusType = (status) => {
  if (!status) return "IN_PROGRESS";
  if (status.includes("REJECTED")) return "REJECTED";
  if (status.includes("REMARKED")) return "REMARKED";
  if (status === "FINAL_APPROVED") return "APPROVED";
  return "IN_PROGRESS";
};

const STATUS_STYLES = {
  IN_PROGRESS: {
    bg: "bg-blue-50",
    border: "border-blue-400",
    text: "text-blue-700",
    bar: "bg-blue-600",
    icon: Clock,
    message: "Application is currently under review",
  },

  REMARKED: {
    bg: "bg-yellow-50",
    border: "border-yellow-600",
    text: "text-yellow-700",
    bar: "bg-yellow-600",
    icon: AlertTriangle,
    message: "Application needs attention - please review remarks",
  },
  REJECTED: {
    bg: "bg-red-50",
    border: "border-red-600",
    text: "text-red-700",
    bar: "bg-red-600",
    icon: XCircle,
    message: "Application has been rejected",
  },
  APPROVED: {
    bg: "bg-green-50",
    border: "border-green-600",
    text: "text-green-700",
    bar: "bg-green-600",
    icon: CheckCircle,
    message: "Application has been approved successfully",
  },
};

/*  COMPONENT  */

function PublicityClearenceDashboard() {
  const [titleRegisteredData, setTitleRegisteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formMode, setFormMode] = useState(null);

  useEffect(() => {
    fetchTitleRegisteredData();
  }, []);

  const fetchTitleRegisteredData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/publicityClearance/producer/titles/publicity-status`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      setTitleRegisteredData(await response.json());
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = titleRegisteredData.filter((item) =>
    [
      item.title?.title,
      item.title?.director,
      item.title?.leadActor,
      item.title?.language,
      item.title?.category,
      item.title?.id?.toString(),
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleOpenForm = (item) => {
    const statusType = getStatusType(item.publicityClearanceStatus);

    if (statusType === "REMARKED") {
      setFormMode("edit");
    } else {
      setFormMode("view");
    }

    setSelectedId(item.publicityClearanceId);
  };

  return (
    <div className="p-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">
          Apply for Publicity Clearance
        </h1>
        <p className="text-sm text-gray-600">
          Select a registered title to apply for publicity clearance
        </p>
      </div>

      {/* Search */}
      <div className="mt-6 mb-10 max-w-xl">
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
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-500 mt-20">
          Loading applications...
        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredData.length === 0 && (
        <div className="flex flex-col items-center mt-24 text-gray-500">
          <FileText className="w-10 h-10 mb-3" />
          <p className="text-xl font-medium">No applications found</p>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredData.map((item) => {
          const status = item.publicityClearanceStatus;
          const isNotSubmitted = status === "NOT_SUBMITTED";

          const stepIndex = STATUS_FLOW[status] ?? 0;
          const statusType = getStatusType(status);
          const style = STATUS_STYLES[statusType];
          const StatusIcon = style.icon;

          return (
            <div
              key={item.title.id}
              className={`rounded-2xl shadow-md ${
                isNotSubmitted
                  ? "border-b-4 border-blue-400"
                  : `border-b-4  ${style.border} ${style.bg}`
              }`}
            >
              {/* Header */}
              <div
                className={`px-6 py-4 border-b border-gray-300 flex justify-between ${
                  isNotSubmitted ? "bg-blue-50 rounded-t-2xl " : ""
                }`}
              >
                <div>
                  <h3 className="text-xl font-semibold">{item.title.title}</h3>
                  <p className="text-sm text-gray-600">
                    Application No:
                    <span className="text-lg font-bold ml-1">
                      #{item.title.id}
                    </span>
                  </p>
                </div>

                {isNotSubmitted ? (
                  <button
                    onClick={() => {
                      setFormMode("apply");
                      setSelectedId(item.title.id);
                    }}
                    className="px-6 h-12 rounded-xl bg-blue-600 text-white hover:cursor-pointer"
                  >
                    Apply Publicity Clearance
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenForm(item)}
                    className={`px-6 h-12 rounded-xl text-white ${
                      statusType === "REMARKED"
                        ? "bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer"
                        : "bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
                    }`}
                  >
                    {statusType === "REMARKED"
                      ? "Edit Application"
                      : "View Details"}
                  </button>
                )}
              </div>

              {/* Body */}
              {isNotSubmitted && (
                <div className="p-6 grid grid-cols-2 gap-4 text-sm">
                  <p>
                    <User className="inline w-4 h-4" /> Director:{" "}
                    {item.title.director}
                  </p>
                  <p>
                    <User className="inline w-4 h-4" /> Lead Actor:{" "}
                    {item.title.leadActor}
                  </p>
                  <p>
                    <Languages className="inline w-4 h-4" /> Language:{" "}
                    {item.title.language}
                  </p>
                  <p>
                    <Film className="inline w-4 h-4" /> Category:{" "}
                    {item.title.category}
                  </p>
                </div>
              )}

              {/* STATUS BADGE */}
              {/* <div className="w-fit mb-10">
                  <span
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border ${style.badge} ${style.text}`}
                  >
                    <Icon size={16} />
                    {item.status}
                  </span>
                </div> */}

              {/* Status + Progress */}
              {!isNotSubmitted && (
                <>
                  <div className="flex items-center mt-8  justify-between ">
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

                  <div className="flex justify-between text-xs text-gray-600 mt-2 ">
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

                  {/* message */}
                  <div
                    className={`mx-6 my-6 p-3 rounded-lg border ${style.border} flex gap-2`}
                  >
                    {/* <StatusIcon className={style.text} /> */}
                    <p className={`text-sm ${style.bg} ${style.text}`}>
                      {style.message}
                    </p>
                  </div>

                  {statusType === "REMARKED" && (
                    <div
                      className={`flex flex-col mx-6 my-4 p-3 rounded-lg border ${style.border} flex gap-2`}
                    >
                      {/* <StatusIcon className={style.text} /> */}
                      <p className={`text-sm ${style.bg} ${style.text}`}>
                        <span className="font-bold">Remarked by :</span>{" "}
                        {item.remarkBy || "N/A"}
                      </p>
                      <p className={`text-sm ${style.bg} ${style.text}`}>
                        <span className="font-bold">Remarks :</span>{" "}
                        {item.remark}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* APPLY FORM */}
      {formMode === "apply" && selectedId && (
        <PublicityClearenceForm
          titleId={selectedId}
          onClose={() => {
            setFormMode(null);
            setSelectedId(null);
          }}
        />
      )}

      {/* EDIT FORM */}
      {formMode === "edit" && selectedId && (
        <EditPublicityClearenceDetails
          applicationId={selectedId}
          onClose={() => {
            setFormMode(null);
            setSelectedId(null);
          }}
        />
      )}

      {/* VIEW FORM */}
      {formMode === "view" && selectedId && (
        <ViewPublicityClearenceForm
          applicationId={selectedId}
          onClose={() => {
            setFormMode(null);
            setSelectedId(null);
          }}
        />
      )}
    </div>
  );
}

export default PublicityClearenceDashboard;
