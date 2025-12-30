import { useEffect, useState } from "react";
import { notify } from "../../Utils/notify";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
} from "lucide-react";

/* ================= STATUS FLOW ================= */
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

/* ================= STATUS TYPE ================= */
const getStatusType = (status) => {
  if (status?.includes("REJECTED")) return "REJECTED";
  if (status?.includes("REMARKED")) return "REMARKED";
  if (status === "FINAL_APPROVED") return "APPROVED";
  return "IN_PROGRESS";
};

/* ================= SAFE TAILWIND STYLES ================= */
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
};

const STEPS = ["Submitted", "Staff", "ONM", "EC", "Final"];

/* ================= COMPONENT ================= */
export default function MembershipCard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setApplications(data);
      } catch (err) {
        notify(err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  /* ===== LOADING ===== */
  if (loading) {
    return <p className="text-center text-gray-500">Loading applications...</p>;
  }

  /* ===== EMPTY STATE ===== */
  if (!applications.length) {
    return (
      <p className="text-center text-gray-500">
        No membership applications found
      </p>
    );
  }

  return (
    <div className="p-18 grid grid-cols-1 gap-6   ">
  {applications.map((application) => {
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
              {application.applicantName?.charAt(0)}
            </div>

            {/* Name & ID */}
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {application.applicantName}
              </h2>
              <p className="text-xs text-gray-500">
                Application #{application.applicationId}
              </p>
            </div>
          </div>

          {/* Status Pill */}
          <span
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${style.text} bg-white border ${style.border}`}
          >
            <StatusIcon size={14} />
            {application.status.replaceAll("_", " ")}
          </span>
        </div>

        {/* ===== STATUS MESSAGE ===== */}
        <div
          className={`mb-4 p-3 rounded-lg border ${style.border} ${style.bg} flex items-center gap-2`}
        >
          <StatusIcon size={18} className={style.text} />
          <p className={`text-sm font-medium ${style.text}`}>
            {statusType === "APPROVED" && "Application approved successfully"}
            {statusType === "IN_PROGRESS" && "Application is under process"}
            {statusType === "REMARKED" && "Application needs clarification"}
            {statusType === "REJECTED" && "Application has been rejected"}
          </p>
        </div>

        {/* ===== PROGRESS BAR ===== */}
        <div className="relative mb-4">
          <div className="flex items-center justify-between">
            {STEPS.map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center relative">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold z-10
                    ${i <= stepIndex ? `${style.bar} text-white` : "bg-gray-200 text-gray-400"}`}
                >
                  {i + 1}
                </div>

                {i < STEPS.length - 1 && (
                  <div
                    className={`absolute top-4 left-1/2 w-full h-1
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
              className={`mt-4 p-4 rounded-lg border ${style.border} ${style.bg}`}
            >
              <h4 className={`text-sm font-semibold ${style.text} mb-1`}>
                {statusType === "REMARKED" ? "Remark" : "Rejection Reason"}
              </h4>
              <p className="text-sm text-gray-700">
                {application.remark}
              </p>
              {application.remarkedBy && (
                <p className="text-xs text-gray-500 mt-2">
                  By: {application.remarkedBy}
                </p>
              )}
            </div>
          )}

        {/* ===== FOOTER ===== */}
        <div className="mt-5 pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-600">
          <span>
            <span className="font-medium">Mobile:</span> {application.mobileNo}
          </span>
          <span>
            <span className="font-medium">Category:</span>{" "}
            {application.membershipCategory ?? "—"}
          </span>
        </div>
      </div>
    );
  })}
</div>

  );
}
