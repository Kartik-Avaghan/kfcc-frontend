import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, IdCard, Image as ImageIcon } from "lucide-react";
import { notify } from "../../Utils/notify";

function ApplyForIdCard() {
  const { membershipId } = useParams(); // from route
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);



  // const getMemberShipId

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
        `${import.meta.env.VITE_API_BASE_URL}/idcard/apply/${membershipId}`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Failed to apply for ID card");
      }

      notify("ID Card request submitted successfully", "success");

      // redirect after success
      navigate("/dashboard");
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 flex items-center gap-3">
          <IdCard className="w-7 h-7 text-white" />
          <div>
            <h1 className="text-xl font-semibold text-white">
              Apply for ID Card
            </h1>
            <p className="text-sm text-blue-100">
              Submit your photo to request an official ID card
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Applicant Photo */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Applicant Photo <span className="text-red-500">*</span>
            </label>

            <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition">
              <Upload className="w-10 h-10 text-blue-600" />
              <p className="text-sm text-gray-600">
                Click to upload passport size photo
              </p>
              <p className="text-xs text-gray-400">
                JPG / PNG • Max 2MB
              </p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Preview */}
            {preview && (
              <div className="mt-5 flex items-center gap-6">
                <div className="w-28 h-28 rounded-xl overflow-hidden border">
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
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove Photo
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 h-11 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-8 h-11 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyForIdCard;
