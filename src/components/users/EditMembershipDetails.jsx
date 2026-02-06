import React, { useEffect, useState } from "react";
import { notify } from "../../Utils/notify";
import { X, Plus, Trash2 , XIcon , AlertCircle} from "lucide-react";

function EditMembershipDetails({ applicationId, onClose }) {
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    applicantFirmName: "",
    applicantMembershipCategory: "",
    applicantOwnershipType: "",
    applicantGstNo: "",
    applicantAadhaarNo: "",
    applicantPanNo: "",
    applicantAddressLine1: "",
    applicantAddressLine2: "",
    applicantDistrict: "",
    applicantState: "",
    applicantPinCode: "",
    membershipFee: "",
    membershipExpiryDate: "",
    nominee: [],
    partners: [],

    // docs
    aoa: null,
    moa: null,
    applicantAddressProof: null,
    applicantAadhaar: "",
    applicantPan: "",
    applicantImage: null,
    applicantSignature: null,
    firmSeal: null,
    partnershipDeed: null,
  });

  /* ================= FETCH APPLICATION ================= */
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/membership/${applicationId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          },
        );

        if (!response.ok) throw new Error("Failed to fetch membership");

        const data = await response.json();

        setFormData({
          applicantFirmName: data.applicantFirmName || "",
          applicantMembershipCategory: data.applicantMembershipCategory || "",
          applicantOwnershipType: data.applicantOwnershipType || "",
          applicantGstNo: data.applicantGstNo || "",
          applicantPanNo: data.applicantPanNo || "",
          applicantPan: data.applicantPan || "",
          applicantAadhaarNo: data.applicantAadhaarNo || "",
          applicantAadhaar: data.applicantAadhaar || "",
          applicantAddressLine1: data.applicantAddressLine1 || "",
          applicantAddressLine2: data.applicantAddressLine2 || "",
          applicantDistrict: data.applicantDistrict || "",
          applicantState: data.applicantState || "",
          applicantPinCode: data.applicantPinCode || "",
          membershipFee: data.membershipFee || "",
          membershipExpiryDate: data.membershipExpiryDate || "",
          nominee: data.nominee || [],
          partners: data.partners || [],
        });
      } catch (error) {
        notify(error.message, "error");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId, onClose]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNomineeChange = (index, field, value) => {
    const updated = [...formData.nominee];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, nominee: updated }));
  };

  const handlePartnerChange = (index, field, value) => {
    const updated = [...formData.partners];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, partners: updated }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/membership/update/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) throw new Error("Failed to update membership");

      notify("Membership application updated successfully", "success");
      // onClose();
    } catch (error) {
      notify(error.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white px-6 py-4 rounded-xl shadow">Loading...</div>
      </div>
    );
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-center bg-black/90 backdrop-blur-sm p-6 "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-0 animate-fadeIn overflow-hidden max-h-[90vh]"
      >
        {/* ================= HEADER ================= */}
        <div className="relative bg-linear-to-r from-blue-900 via-blue-800 to-blue-700 text-white p-6 rounded-t-2xl ">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 cursor-pointer"
          >
            <X />
          </button>
          <h2 className="text-2xl font-bold">Edit Membership Application</h2>
          <p className="text-blue-100 mt-1">Application ID: {applicationId}</p>
        </div>

        {/*  FORM  */}
        <form
          className="p-8 space-y-6 overflow-y-auto max-h-[80vh]"
        >
          <Section title="Personal Details">
            <Input
              label="PAN Number"
              name="applicantPanNo"
              value={formData.applicantPanNo}
              onChange={handleChange}
            />

            {/* <Doc
              label="PAN CARD"
              file={formData.applicantPan}
              onView={() => setPreview(formData.applicantPan)}
            /> */}

            <Input
              label="Aadhar Number"
              name="applicantAadhaarNo"
              value={formData.applicantAadhaarNo}
              onChange={handleChange}
            />

          </Section>

          {/* Firm Details */}
          <Section title="Firm Details">
            <Input
              label="Firm Name"
              name="applicantFirmName"
              value={formData.applicantFirmName}
              onChange={handleChange}
            />
            <Input
              label="Membership Category"
              name="applicantMembershipCategory"
              value={formData.applicantMembershipCategory}
              onChange={handleChange}
            />
            <Input
              label="Ownership Type"
              name="applicantOwnershipType"
              value={formData.applicantOwnershipType}
              onChange={handleChange}
            />
            <Input
              label="GST Number"
              name="applicantGstNo"
              value={formData.applicantGstNo}
              onChange={handleChange}
            />
          </Section>

          {/* Address */}
          <Section title="Address">
            <Input
              label="Address Line 1"
              name="applicantAddressLine1"
              value={formData.applicantAddressLine1}
              onChange={handleChange}
            />
            <Input
              label="Address Line 2"
              name="applicantAddressLine2"
              value={formData.applicantAddressLine2}
              onChange={handleChange}
            />
            <Input
              label="District"
              name="applicantDistrict"
              value={formData.applicantDistrict}
              onChange={handleChange}
            />
            <Input
              label="State"
              name="applicantState"
              value={formData.applicantState}
              onChange={handleChange}
            />
            <Input
              label="Pin Code"
              name="applicantPinCode"
              value={formData.applicantPinCode}
              onChange={handleChange}
            />
          </Section>

          {/* Nominees */}
          <Section title="Nominees">
            {formData.nominee.map((n, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 rounded-xl p-4 bg-gray-50"
              >
                <Input
                  label="First Name"
                  value={n.nomineeFirstName}
                  onChange={(e) =>
                    handleNomineeChange(i, "nomineeFirstName", e.target.value)
                  }
                />

                <Input
                  label="Middle Name"
                  value={n.nomineeMiddleName}
                  onChange={(e) =>
                    handleNomineeChange(i, "nomineeMiddleName", e.target.value)
                  }
                />
                <Input
                  label="Last Name"
                  value={n.nomineeLastName}
                  onChange={(e) =>
                    handleNomineeChange(i, "nomineeLastName", e.target.value)
                  }
                />
                <Input
                  label="Last Name"
                  value={n.nomineeRelationship}
                  onChange={(e) =>
                    handleNomineeChange(
                      i,
                      "nomineeRelationship",
                      e.target.value,
                    )
                  }
                />
                <Input
                  label="Email"
                  value={n.nomineeEmail}
                  onChange={(e) =>
                    handleNomineeChange(i, "nomineeEmail", e.target.value)
                  }
                />
                <Input
                  label="Mobile"
                  value={n.nomineeMobileNo}
                  onChange={(e) =>
                    handleNomineeChange(i, "nomineeMobileNo", e.target.value)
                  }
                />
              </div>
            ))}
          </Section>

          {/* Partners */}
          <Section title="Partners">
            {formData.partners.map((p, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 rounded-xl p-4 bg-gray-50"
              >
                <Input
                  label="Partner Name"
                  value={p.partnerName}
                  onChange={(e) =>
                    handlePartnerChange(i, "partnerName", e.target.value)
                  }
                />
                <Input
                  label="PAN No"
                  value={p.partnerPanNo}
                  onChange={(e) =>
                    handlePartnerChange(i, "partnerPanNo", e.target.value)
                  }
                />
                <Input
                  label="Aadhaar No"
                  value={p.partnerAadhaarNo}
                  onChange={(e) =>
                    handlePartnerChange(i, "partnerAadhaarNo", e.target.value)
                  }
                />
                <Input
                  label="PAN No"
                  value={p.partnerPanNo}
                  onChange={(e) =>
                    handlePartnerChange(i, "partnerPanNo", e.target.value)
                  }
                />
                <Input
                  label="Address"
                  value={p.partnerAddress}
                  onChange={(e) =>
                    handlePartnerChange(i, "partnerAddress", e.target.value)
                  }
                />
                <Input
                  label="Blood Group"
                  value={p.partnerBloodGroup}
                  onChange={(e) =>
                    handlePartnerChange(i, "partnerBloodGroup", e.target.value)
                  }
                />
                <Input
                  label="Date of Birth"
                  value={p.partnerDob}
                  onChange={(e) =>
                    handlePartnerChange(i, "partnerDob", e.target.value)
                  }
                />
              </div>
            ))}
          </Section>

          {/* Actions */}
          <div className="flex justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-32 rounded-xl border border-gray-400 py-2 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className="w-44 bg-blue-900 text-white rounded-xl py-2 font-medium shadow hover:bg-blue-800"
            >
              Save Changes
            </button>
          </div>
        </form>

        {preview && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-60"
            onClick={() => setPreview(null)}
          >
            <button className="absolute top-30 left-50 text-white cursor-pointer">
              <XIcon />
            </button>
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${preview}`}
              alt="preview"
              className="max-h-[90%] rounded-xl"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */
const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-blue-900 border-b pb-1">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Doc = ({ label, file, onView }) => {
  const hasFile =
    file !== null && file !== undefined && file !== "" && file !== false;

  return (
    <div className="flex items-center justify-between border border-gray-400 rounded-lg px-3 py-2">
      <span className="text-sm text-gray-600 pl-2">{label}</span>

      {hasFile ? (
        <button
          onClick={() => onView(file)}
          className="text-white text-sm cursor-pointer bg-blue-600 px-4 py-2 rounded-md "
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
};

export default EditMembershipDetails;
