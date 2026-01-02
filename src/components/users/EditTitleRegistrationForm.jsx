import React, { useEffect, useState } from "react";
import { notify } from "../../Utils/notify";
import { X } from "lucide-react";

export default function EditTitleRegistrationForm({ applicationId, onClose }) {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    titleInKannada: "",
    category: "",
    language: "",
    director: "",
    leadActor: "",
    musicDirector: "",
    institution: "",
    gstNo: "",
    filmsByInstitutes: "",
    firstFilm: "",
    previouslyRegistered: "",
    previouslyRegisteredDetails: "",
    producer: { firstName: "", lastName: "", email: "", mobileNo: "", dob: ""},
  });

  /* FETCH APPLICATION */
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/titleRegistration/${applicationId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch application");

        const data = await response.json();

        setFormData({
          title: data.title || "",
          titleInKannada: data.titleInKannada || "",
          category: data.category || "",
          language: data.language || "",
          director: data.director || "",
          leadActor: data.leadActor || "",
          musicDirector: data.musicDirector || "",
          institution: data.institution || "",
          gstNo: data.gstNo || "",
          filmsByInstitutes: data.filmsByInstitutes || "",
          firstFilm: data.firstFilm === true ? "true" : "false",
          previouslyRegistered:
            data.previouslyRegistered === true ? "true" : "false",
          previouslyRegisteredDetails:
            data.previouslyRegisteredDetails || "",
            producer: {
    firstName: data.producer?.firstName || "",
    lastName: data.producer?.lastName || "",
    email: data.producer?.email || "",
    mobileNo: data.producer?.mobileNo || "",
    dob: data.producer?.dob || "",
    },
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

  /* HANDLE CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProducerChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    producer: {
      ...prev.producer,
      [name]: value,
    },
  }));
};


  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/titleRegistration/${applicationId}/resubmit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            ...formData,
            firstFilm: formData.firstFilm === "true",
            previouslyRegistered:
              formData.previouslyRegistered === "true",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update application");

      notify("Your application has been edited", "success");
      onClose();
    } catch (error) {
      notify(error.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white px-6 py-4 rounded-xl shadow">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
  onClick={onClose}
  className="fixed inset-0 z-50 flex justify-center bg-black/90 backdrop-blur-sm p-6 overflow-y-auto"
>
  <div
    onClick={(e) => e.stopPropagation()}
    className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl animate-fadeIn max-h-screen overflow-y-auto"
  >

    {/* HEADER */}
<div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 
                text-white p-6 rounded-t-2xl">
  <button
    onClick={onClose}
    className="absolute top-4 right-4 text-white/80 hover:text-white transition"
  >
    <X />
  </button>

  <h2 className="text-2xl font-bold">Edit Title Registration</h2>
  <p className="text-blue-100 mt-1">
    Application ID: {applicationId}
  </p>
</div>


    {/* Form */}
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      {/* Film Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 mt-6">
          Film Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter film title"
          className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Film Title (In Kannada)
        </label>
        <input
          type="text"
          name="titleInKannada"
          value={formData.titleInKannada}
          onChange={handleChange}
          placeholder="Enter film title in Kannada"
          className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      {/* First Film */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Is this your First Film?
        </label>
        <select
          name="firstFilm"
          value={formData.firstFilm}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        >
          <option value="">-- Select --</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* Institution */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Institution
        </label>
        <input
          type="text"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          placeholder="Institution name"
          className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      {/* GST */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          GST Number
        </label>
        <input
          type="text"
          name="gstNo"
          value={formData.gstNo}
          onChange={handleChange}
          placeholder="GST number"
          className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      {/* Producer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Producer First Name
    </label>
    <input
      type="text"
      name="firstName"
      value={formData.producer.firstName}
      onChange={handleProducerChange}
      className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Producer Last Name
    </label>
    <input
      type="text"
      name="lastName"
      value={formData.producer.lastName}
      onChange={handleProducerChange}
      className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
</div>

      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Producer
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.producer.firstName}
          onChange={handleProducerChange}
          placeholder="Producer name"
          className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div> */}

      {/* Language */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Language
        </label>
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          placeholder="Language"
          className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      {/* Previously Registered */}
      {formData.firstFilm === "false" && (
        <div className="space-y-4 border rounded-xl p-4 bg-gray-50">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Previously Registered?
            </label>
            <select
              name="previouslyRegistered"
              value={formData.previouslyRegistered}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">-- Select --</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Previously Registered Details
            </label>
            <input
              type="text"
              name="previouslyRegisteredDetails"
              value={formData.previouslyRegisteredDetails}
              onChange={handleChange}
              placeholder="Provide details"
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Films By Institutes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Films By Institutes
        </label>
        <input
          type="text"
          name="filmsByInstitutes"
          value={formData.filmsByInstitutes}
          onChange={handleChange}
          placeholder="Enter films produced by institutes"
          className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Director */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Director
        </label>
        <input
          type="text"
          name="director"
          value={formData.director}
          onChange={handleChange}
          placeholder="Director"
          className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Music Director */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Music Director
        </label>
        <input
          type="text"
          name="musicDirector"
          value={formData.musicDirector}
          onChange={handleChange}
          placeholder="Music Director"
          className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Actor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lead Actor
        </label>
        <input
          type="text"
          name="leadActor"
          value={formData.leadActor}
          onChange={handleChange}
          placeholder="Lead Actor"
          className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g., Social / Mythological / Historical"
          className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="w-32 rounded-xl border border-gray-400 py-2 text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-40 bg-blue-900 text-white rounded-xl py-2 font-medium shadow-md hover:bg-blue-800 hover:shadow-lg transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</div>
  );
}


