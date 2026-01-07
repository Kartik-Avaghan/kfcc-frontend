import React, { useState } from "react";
import {
  X,
  User,
  Phone,
  Calendar,
  Building,
  BadgeCheck,
  CreditCard,
  Image as ImageIcon,
  IdCard,
} from "lucide-react";
import { notify } from "../../Utils/notify";

function ViewIdCardDetails({ request, onClose, onSuccessAction }) {
  const [issuing, setIssuing] = useState(false);

  const handleIssueCard = async () => {
    try {
      setIssuing(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/idcard/issued/${request.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to issue ID card");
      }

      notify("ID Card issued successfully", "success");
      onSuccessAction();
      onClose();
    } catch (error) {
      notify(error.message || "Something went wrong", "error");
    } finally {
      setIssuing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-4xl w-full rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-800 to-blue-600 px-6 py-8 border-b border-gray-300 ">
          <h2 className="flex items-center text-xl font-bold gap-2  text-white">
            <IdCard size={28}  />ID Card  Details
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer " />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Applicant Image */}
          <div className="col-span-1 flex flex-col items-center gap-3">
            {request.applicantImage ? (
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${request.applicantImage}`}
                alt="Applicant"
                className="w-40 h-40 rounded-xl object-cover "
              />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded-xl">
                <ImageIcon className="w-10 h-10 text-gray-400" />
              </div>
            )}

            <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-semibold">
              {request.status}
            </span>
          </div>

          {/* Details */}
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Info label="Full Name" value={`${request.firstName} ${request.middleName ?? ""} ${request.lastName}`} icon={<User />} />
            <Info label="Mobile No" value={request.mobileNo} icon={<Phone />} />
            <Info label="Blood Group" value={request.bloodGroup} icon={<BadgeCheck />} />
            <Info label="Date of Birth" value={request.dob} icon={<Calendar />} />
            <Info label="Membership Category" value={request.membershipCategory} icon={<CreditCard />} />
            <Info label="Membership No" value={request.membershipNumber} icon={<CreditCard />} />
            <Info label="Firm Name" value={request.firmName} icon={<Building />} />
            <Info label="Address Line 1" value={request.addressLine1} />
            <Info label="Address Line 2" value={request.addressLine2} />
            <Info label="Membership Expiry" value={request.membershipExpiryDate} icon={<Calendar />} />
            {/* <Info label="Submitted At" value={request.submittedAt} icon={<Calendar />} />
            <Info label="Issued At" value={request.issuedAt ?? "Not Issued"} icon={<Calendar />} /> */}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-300 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 cursor-pointer  hover:bg-gray-100"
          >
            Close
          </button>

          {request.status === "REQUESTED" && (
            <button
              onClick={handleIssueCard}
              disabled={issuing}
              className="px-6 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 cursor-pointer disabled:opacity-50"
            >
              {issuing ? "Issuing..." : "Issue ID Card"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable Info Row */
function Info({ label, value, icon }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
      {icon && <div className="text-blue-600">{icon}</div>}
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value || "-"}</p>
      </div>
    </div>
  );
}

export default ViewIdCardDetails;
