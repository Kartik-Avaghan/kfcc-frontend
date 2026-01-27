import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, IdCard, Image as ImageIcon } from "lucide-react";
import { notify } from "../../Utils/notify";
import { startPayment } from "../../Utils/Payment";

function ApplyForIdCard() {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [membershipApplicationId, setMembershipApplicationId] = useState("");
  const [availableMemberships, setAvailableMemberships] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  //getMemberShipId
  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/membership/user/activeMemberships`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch memberships");
      }

      const memberships = await response.json();
      setAvailableMemberships(memberships);
    } catch (error) {
      notify(error.message || "Something went wrong", "error");
    }
  };

  /* Handle file selection */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify("Please upload a valid image file", "error");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      notify("Image size must be less than 2MB", "error");
      return;
    }

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  /* Submit ID Card Request */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      notify("Applicant photo is required", "error");
      return;
    }

    const formData = new FormData();
    formData.append("applicantPhoto", photo);

    try {
      setSubmitting(true);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/idcard/apply/${membershipApplicationId}`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        },
      );

      if (!response.ok) {
        const err = await response.json();
        notify(err.message || "Failed to apply for ID card", "error");
        throw new Error(err || "Failed to apply for ID card");
      }

      const data = await response.json();

      await startPayment("IDCARD", data.id);

      notify("ID Card request submitted", "success");

      setPhoto(null);
      setPreview(null);

    } catch (error) {
      notify(error.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }

  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 px-8 py-6 flex items-center gap-3">
          <div>
            <h1 className="text-xl flex font-semibold text-white items-center gap-2">
              <IdCard className="size-6 text-white" />
              Apply for ID Card
            </h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Applicant Photo */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Applicant Photo <span className="text-red-500">*</span>
            </label>

            {!preview && (
              <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition">
                <Upload className="w-10 h-10 text-blue-600" />
                <p className="text-sm text-gray-600">
                  Click to upload passport size photo
                </p>
                <p className="text-xs text-gray-400">JPG / PNG • Max 2MB</p>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}

            {/* Preview */}
            {preview && (
              <div className="mt-5 flex items-center gap-6 flex-col">
                <div className="w-38 h-38 rounded-xl overflow-hidden border">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPhoto(null);
                    setPreview(null);
                  }}
                  className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:underline cursor-pointer"
                >
                  Remove Photo
                </button>
              </div>
            )}
          </div>

          {/* Membership Selection */}
          <div>
            <label
              htmlFor="membershipID"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Select Membership <span className="text-red-500">*</span>
            </label>
            <select
              name="memberhipId"
              id="membershipID"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
              onChange={(e) => setMembershipApplicationId(e.target.value)}
              required
            >
              <option value="">- Select Membership Category -</option>
              {availableMemberships.map((membership) => (
                <option
                  value={membership.applicationId}
                  key={membership.applicationId}
                >
                  {membership.membershipCategory} - {membership.membershipId}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-300">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 h-11 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 h-11 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Submitting..." : "Apply"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyForIdCard;
