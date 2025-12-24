import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle,
  XCircle,
  MessageSquare,
  User,
  Building,
  Users,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import MembershipRemark from "./MembershipRemark";
import MembershipReject from "./MembershipReject";
import MembershipAccept from "./MembereshipAccept";
import { useSelector } from "react-redux";

// import MembershipAccept from "./MembershipAccept";

export default function ViewMembershipForm({ applicationId, onClose }) {
  const [preview, setPreview] = useState(null);

  const [data, setData] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const user = useSelector((state) => state.user.user);
  const roles = user?.roles || [];

  const ONM_BLOCKED_ROLES = [
    "ONM_COMMITTEE_VOTER","ONM_COMMITTEE_LEADER","ONM_COMMITTEE",
    "EC_MEMBER",
  ];

  const isRestrictedUser = roles.some((role) =>
    ONM_BLOCKED_ROLES.includes(role)
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/membership/${applicationId}`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching membership data:", err));
  }, [applicationId]);

  if (!data) return null;

  const isProprietor = data.applicantOwnershipType === "PROPRIETOR";
  const hasMembers = [
    "PARTNERSHIP",
    "LIMITED",
    "COMPANY",
    "ASSOCIATION",
  ].includes(data.applicantOwnershipType);

  const openPreview = (file) => {
    if (!file) return;
    setPreview(file);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 ">
      {/* <div className="mt-10"> */}
      {/* <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden "> */}
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="bg-linear-to-r from-blue-950 to-blue-800 text-white p-6 relative ">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 hover:text-gray-300 hover:cursor-pointer"
          >
            <X />
          </button>

          <h2 className="text-2xl font-bold">Membership Application</h2>
          <p className="text-blue-100 mt-1">
            Application ID: {data.applicationId}
          </p>

          {/* <span className="inline-flex mt-3 px-3 py-1 rounded-full text-sm bg-white/10 border border-white/20">
            Status: {data.membershipStatus}
          </span> */}
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-gray-50">
          {/* APPLICANT */}
          <InfoSection title="Applicant Details" icon={User}>
            <Field label="Firm Name" value={data.applicantFirmName} />
            <Field
              label="Membership Category"
              value={data.applicantMembershipCategory}
            />
            <Field label="Ownership Type" value={data.applicantOwnershipType} />
            <Field label="GST No" value={data.applicantGstNo} />
            <Field label="Blood Group" value={data.applicantBloodGroup} />

            <Field label="Address Line 1" value={data.applicantAddressLine1} />
            <Field label="Address Line 2" value={data.applicantAddressLine2} />
            <Field label="District" value={data.applicantDistrict} />
            <Field label="State" value={data.applicantState} />
            <Field label="Pin Code" value={data.applicantPinCode} />

            <Doc
              label="Applicant Image"
              file={data.applicantImage}
              onView={openPreview}
            />
            <Doc label="PAN" file={data.applicantPan} onView={openPreview} />
            <Doc
              label="Aadhaar"
              file={data.applicantAadhaar}
              onView={openPreview}
            />
            <Doc
              label="Address Proof"
              file={data.applicantAddressProof}
              onView={openPreview}
            />
            <Doc
              label="Signature"
              file={data.applicantSignature}
              onView={openPreview}
            />
            <Doc label="Firm Seal" file={data.firmSeal} onView={openPreview} />
            <Doc
              label="Partnership Deed"
              file={data.partnershipDeed}
              onView={openPreview}
            />
            <Doc label="MOA" file={data.moa} onView={openPreview} />
            <Doc label="AOA" file={data.aoa} onView={openPreview} />
          </InfoSection>

          {/* PROPRIETOR */}
          {isProprietor && data.proprietor && (
            <InfoSection title="Proprietor Details" icon={Building}>
              <Field label="Name" value={data.proprietor.proprietorName} />
              <Field label="DOB" value={data.proprietor.proprietorDob} />
              <Field
                label="Blood Group"
                value={data.proprietor.proprietorBloodGroup}
              />
              <Field
                label="Address"
                value={data.proprietor.proprietorAddress}
              />
              <Field label="PAN No" value={data.proprietor.proprietorPanNo} />
              <Field
                label="Aadhaar No"
                value={data.proprietor.proprietorAadhaarNo}
              />

              <Doc
                label="PAN Image"
                file={data.proprietor.proprietorPanImg}
                onView={openPreview}
              />
              <Doc
                label="Aadhaar Image"
                file={data.proprietor.proprietorAadhaarImg}
                onView={openPreview}
              />
              <Doc
                label="E-Signature"
                file={data.proprietor.proprietorESignature}
                onView={openPreview}
              />
            </InfoSection>
          )}

          {/* MEMBERS */}

          {hasMembers && data.partners?.length > 0 && (
            <InfoSection title="Partners / Directors / Members" icon={Users}>
              <div className="space-y-6 col-span-full">
                {data.partners.map((p, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-2xl  p-5 space-y-4"
                  >
                    {/* CARD HEADER */}
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-blue-700">
                        Member {idx + 1}
                      </h4>
                    </div>

                    {/* BASIC DETAILS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Name" value={p.partnerName} />
                      <Field label="DOB" value={p.partnerDob} />
                      <Field label="Blood Group" value={p.partnerBloodGroup} />
                      <Field label="PAN No" value={p.partnerPanNo} />
                      <Field label="Aadhaar No" value={p.partnerAadhaarNo} />
                    </div>

                    {/* DOCUMENTS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-gray-400">
                      <Doc
                        label="PAN Image"
                        file={p.partnerPanImg}
                        onView={openPreview}
                      />
                      <Doc
                        label="Aadhaar Image"
                        file={p.partnerAadhaarImg}
                        onView={openPreview}
                      />
                      <Doc
                        label="E-Signature"
                        file={p.partnerESignature}
                        onView={openPreview}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </InfoSection>
          )}

          {/* NOMINEE */}

          <InfoSection title="Nominee Details" icon={User}>
            <div className="space-y-6 col-span-full">
              {data.nominee?.length ? (
                data.nominee.map((n, i) => (
                  <div
                    key={i}
                    className=" bg-white rounded-2xl w-full shadow-sm p-5 space-y-4"
                  >
                    {/* CARD HEADER */}
                    <h4 className="text-lg font-semibold text-blue-700">
                      Nominee {i + 1}
                    </h4>

                    {/* DETAILS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="First Name" value={n.nomineeFirstName} />
                      <Field label="Middle Name" value={n.nomineeMiddleName} />
                      <Field label="Last Name" value={n.nomineeLastName} />
                      <Field label="Mobile" value={n.nomineeMobileNo} />
                      <Field label="Email" value={n.nomineeEmail} />
                      <Field
                        label="Relationship"
                        value={n.nomineeRelationship}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No nominee added</p>
              )}
            </div>
          </InfoSection>

          {/* PROPOSER & SECONDER */}
          <InfoSection title="Proposer Details" icon={Users}>
            <Field label="Name" value={data.proposer?.proposerName} />
            <Field
              label="Membership ID"
              value={data.proposer?.proposerMembershipId}
            />
            <Field label="Mobile" value={data.proposer?.proposerMobileNo} />
            <Field
              label="Designation"
              value={data.proposer?.proposerDesignation}
            />
            <Field label="Address" value={data.proposer?.proposerAddress} />
          </InfoSection>

          <InfoSection title="Seconder Details" icon={Users}>
            <Field label="Name" value={data.seconder?.seconderName} />
            <Field
              label="Membership ID"
              value={data.seconder?.seconderMembershipId}
            />
            <Field label="Mobile" value={data.seconder?.seconderMobileNo} />
            <Field
              label="Designation"
              value={data.seconder?.seconderDesignation}
            />
            <Field label="Address" value={data.seconder?.seconderAddress} />
          </InfoSection>

          {/* PAYMENT */}
          <InfoSection title="Payment Summary" icon={CreditCard}>
            <Field label="Membership Fee" value={`₹ ${data.membershipFee}`} />
            <Field label="Kalyan Nidhi" value={`₹ ${data.kalyanNidhi}`} />
            <Field label="Total Amount" value={`₹ ${data.totalAmount}`} />
          </InfoSection>
        </div>

        {/* ACTIONS */}
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
          <MembershipAccept
            applicationId={applicationId}
            onClose={() => setShowConfirm(false)}
            onSuccess={() => {
              setShowRemarkModal(false);
              onClose(); // close main view if needed
            }}
          />
        )}

        {/* POP Up */}
        {showRemarkModal && (
          <MembershipRemark
            applicationId={applicationId}
            onClose={() => setShowRemarkModal(false)}
            onSuccess={() => {
              setShowRemarkModal(false);
              onClose(); // close main view if needed
            }}
          />
        )}

        {showRejectModal && (
          <MembershipReject
            applicationId={applicationId}
            onClose={() => setShowRejectModal(false)}
            onSuccess={() => {
              setShowRejectModal(false);
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ----------------- UI HELPERS ----------------- */

// eslint-disable-next-line no-unused-vars
function InfoSection({ title, icon: Icon, children }) {
  return (
    <div className="  rounded-2xl p-4 space-y-3">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-600" />
        {title}
      </h3>
      {/* <div className="flex  gap-3"> */}
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
  const hasFile =
    file !== null && file !== undefined && file !== "" && file !== false;

  return (
    <div className="flex items-center justify-around border rounded-lg px-3 py-2">
      <span className="text-sm text-gray-600">{label}</span>

      {hasFile ? (
        <button
          onClick={() => onView(file)}
          className="text-blue-600 text-sm underline hover:cursor-pointer"
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

// eslint-disable-next-line no-unused-vars
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
