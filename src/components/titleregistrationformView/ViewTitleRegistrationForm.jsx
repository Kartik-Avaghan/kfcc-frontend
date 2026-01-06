import React, { useEffect, useState } from "react";
import {
  X,
  Film,
  User,
  Globe,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  XCircle,
} from "lucide-react";
import TitleRegistrationAccept from "./TitleRegistrationAccept";
import TitleRegistrationRemark from "./TitleRegistrationRemark";
import TitleRegistrationReject from "./TitleRegistrationReject";
import { useSelector } from "react-redux";
import { notify } from "../../Utils/notify";

export default function ViewTitleRegistrationForm({ applicationId, onClose,onActionSuccess }) {
  const [data, setData] = useState(null);
  const [preview, setPreview] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);

  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);


   const user = useSelector((state) => state.user.user);
  const roles = user?.roles || [];

  const ONM_BLOCKED_ROLES = [
    "TITLE_COMMITTEE_VOTER","TITLE_COMMITTEE_LEADER","TITLE_COMMITTEE",
    "EC_MEMBER","PRODUCER","USER",
  ];

  const isRestrictedUser = roles.some((role) =>
    ONM_BLOCKED_ROLES.includes(role)
  );

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/titleRegistration/${applicationId}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then(setData)
      .catch((err) => notify(err.message || "Failed to load data", "error"));
  }, [applicationId]);

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 hover:text-gray-300 cursor-pointer" 
          >
            <X />
          </button>

          <h2 className="text-2xl font-bold">Title Registration</h2>
          <p className="text-blue-100 mt-1">Application ID: {data.id}</p>

          {/* <span className="inline-flex mt-3 px-3 py-1 rounded-full text-sm bg-white/10 border border-white/20">
            Status: {data.status}
          </span> */}
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-gray-50">
          {/* TITLE DETAILS */}
          <InfoSection title="Title Details" icon={Film}>
            <Field label="Title (English)"   value={data.title}  />
            <Field label="Title (Kannada)" value={data.titleInKannada} />
            <Field label="Language" value={data.language} />
            <Field label="Category" value={data.category} />
            <Field label="First Film" value={data.firstFilm ? "Yes" : "No"} />
          </InfoSection>

          {/* FILM DETAILS */}
          <InfoSection title="Film Details" icon={Globe}>
            <Field label="Director" value={data.director} />
            <Field label="Lead Actor" value={data.leadActor} />
            <Field label="Music Director" value={data.musicDirector} />
            <Field label="Films by Institute" value={data.filmsByInstitutes} />
          </InfoSection>

          {/* PRODUCER */}
          <InfoSection title="Producer Details" icon={User}>
            <Field
              label="Name"
              value={`${data.producer.firstName} ${data.producer.lastName}`}
            />
            <Field label="Email" value={data.producer.email} />
            <Field label="Mobile" value={data.producer.mobileNo} />
            <Field label="DOB" value={data.producer.dob} />
            <Field label="GST No" value={data.gstNo || "-"} />
          </InfoSection>

          {/* DATES */}
          <InfoSection title="Dates" icon={Calendar}>
            <Field
              label="Created At"
              value={
                data.createdAt ? new Date(data.createdAt).toLocaleString() : "-"
              }
            />
            <Field label="Accepted Date" value={data.acceptedDate || "-"} />
            <Field label="Expire Date" value={data.expireDate || "-"} />
          </InfoSection>

          {/* DOCUMENTS */}
          <InfoSection title="Uploaded Documents" icon={FileText}>
            {data.documents?.length > 0 ? (
              data.documents.map((doc) => (
                <Doc
                  key={doc.id}
                  label={`Document ${doc.id}`}
                  file={doc.path}
                  onView={setPreview}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">No documents uploaded</p>
            )}
          </InfoSection>
        </div>


        {!isRestrictedUser && (

        <div className="border-t border-gray-300 p-4 flex justify-between items-center gap-4">
          <ActionBtn
            color="green"
            icon={CheckCircle}
            text="Accept"
            onClick={() => setShowConfirm(true)}
          />

          <ActionBtn
            color="yellow"
            icon={MessageSquare}
            text="Remark"
            onClick={() => setShowRemarkModal(true)}
          />

          <ActionBtn
            color="red"
            icon={XCircle}
            text="Reject"
            onClick={() => setShowRejectModal(true)}
          />
        </div>
        )}

        {/* IMAGE PREVIEW */}
        {preview && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-60"
            onClick={() => setPreview(null)}
          >
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${preview}`}
              alt="preview"
              className="max-h-[90%] rounded-xl"
            />
          </div>
        )}

        {showConfirm && (
          <TitleRegistrationAccept
            applicationId={applicationId}
            onClose={() => setShowConfirm(false)}
             onSuccess={() => {
    onActionSuccess(applicationId); //  REMOVE FROM PARENT
    onClose();
  }}
          />
        )}

        {showRemarkModal && (
          <TitleRegistrationRemark
            applicationId={applicationId}
            onClose={() => setShowRemarkModal(false)}
           onSuccess={() => {
    onActionSuccess(applicationId); //  REMOVE FROM PARENT
    onClose();
  }}
          />
        )}

        {showRejectModal && (
          <TitleRegistrationReject
            applicationId={applicationId}
            onClose={() => setShowRejectModal(false)}
            onSuccess={() => {
    onActionSuccess(applicationId); //  REMOVE FROM PARENT
    onClose();
  }}
          />
        )}
      </div>
    </div>
  );
}

function InfoSection({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl p-4 space-y-3 bg-white shadow-sm">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
        <Icon className="w-5 h-5" />
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value || "-"}</p>
    </div>
  );
}

function Doc({ label, file, onView }) {
  const hasFile = file && file !== "";

  return (
    <div className="flex items-center justify-between border rounded-lg px-3 py-2">
      <span className="text-sm text-gray-600">{label}</span>

      {hasFile ? (
        <button
          onClick={() => onView(file)}
          className="text-blue-600 text-sm underline"
        >
          View
        </button>
      ) : (
        <span className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          Not uploaded
        </span>
      )}
    </div>
  );
}

function ActionBtn({ color, icon: Icon, text, onClick }) {
  const colors = {
    green: "bg-green-600 hover:bg-green-700",
    yellow: "bg-yellow-600 hover:bg-yellow-700",
    red: "bg-red-600 hover:bg-red-700",
  };
  return (
    <button
      onClick={onClick}
      className={`${colors[color]} text-white  px-2 w-xl py-3 rounded-xl flex justify-center items-center gap-2 hover:cursor-pointer`}
    >
      <Icon className="w-4 h-4" />
      {text}
    </button>
  );
}
