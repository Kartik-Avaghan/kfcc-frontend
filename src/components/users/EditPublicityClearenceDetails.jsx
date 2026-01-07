import React, { useEffect, useState } from "react";
import {
  X,
  FileText,
  Calendar,
  Upload,
  Save,
} from "lucide-react";
import { notify } from "../../Utils/notify";


const DOCUMENT_TYPES = [
  "CBCF_CERTIFICATE",
  "HOARDINGS",
  "POSTER_DESIGNS",
  "PHOTOCARDS",
  "SLIDES",
  "BLOCK_DESIGNS",
  "ART_PULLS",
  "STICKERS",
  "NEWSPAPER_PUBLICITY",
  "OTHERS",
];


function EditPublicityClearenceDetails({ applicationId, onClose, onSuccess }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

 const [formData, setFormData] = useState({
  cbcfCertificateNo: "",
  cbcfCertificateDate: "",
  remark: "",
});

const [documents, setDocuments] = useState({});
const [existingDocs, setExistingDocs] = useState({});


  /* FETCH PREVIOUS DATA */
  useEffect(() => {
  if (!applicationId) return;

  fetch(`${import.meta.env.VITE_API_BASE_URL}/publicityClearance/${applicationId}`, {
    headers: { Authorization: localStorage.getItem("token") },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    })
    .then((data) => {
      setFormData({
        cbcfCertificateNo: data.cbcfCertificateNo || "",
        cbcfCertificateDate: data.cbcfCertificateDate || "",
        remark: data.remark || "",
      });

      // ✅ Group documents by type
      const groupedDocs = {};
      (data.documents || []).forEach((doc) => {
        if (!groupedDocs[doc.documentType]) {
          groupedDocs[doc.documentType] = [];
        }
        groupedDocs[doc.documentType].push(doc);
      });

      setExistingDocs(groupedDocs);
    })
    .catch((err) => notify(err.message, "error"))
    .finally(() => setLoading(false));
}, [applicationId]);


  /* INPUT HANDLER */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* FILE HANDLER */
  const handleFileChange = (type, files) => {
  setDocuments((prev) => ({
    ...prev,
    [type]: files,
  }));
};


  /* SUBMIT UPDATE */
  const handleSubmit = async () => {
  setSaving(true);

  try {
    const payload = new FormData();

    payload.append(
      "data",
      new Blob([JSON.stringify(formData)], {
        type: "application/json",
      })
    );

    Object.keys(documents).forEach((type) => {
      Array.from(documents[type]).forEach((file) => {
        payload.append(type, file);
      });
    });

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/publicityClearance/${applicationId}`,
      {
        method: "PUT",
        headers: { Authorization: localStorage.getItem("token") },
        body: payload,
      }
    );

    if (!response.ok) throw new Error("Update failed");

    notify("Publicity Clearance updated successfully", "success");
    onSuccess?.();
    onClose();
  } catch (err) {
    notify(err.message, "error");
  } finally {
    setSaving(false);
  }
};


  if (loading) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-blue-700 text-white px-6 py-8 flex justify-between items-center">
          <div>
          <h2 className="text-xl font-semibold">
            Edit Publicity Clearance
          </h2>
          <p>Application No : <span className="text-lg font-bold">{applicationId}</span> </p>
          </div>

          <button onClick={onClose} className="hover:cursor-pointer hover:text-gray-300">
            <X />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

          {/* CBCF DETAILS */}
          <section className="bg-gray-50 p-4 rounded-xl space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-blue-700">
              <Calendar className="w-5 h-5" />
              CBCF Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">
                  CBCF Certificate No
                </label>
                <input
                  type="text"
                  name="cbcfCertificateNo"
                  value={formData.cbcfCertificateNo}
                  onChange={handleChange}
                  className="
      w-full rounded-xl
      border border-gray-300
      p-2
      outline-none
      focus:outline-none
      focus:ring-2 focus:ring-blue-500
      focus:border-transparent
    "

                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  CBCF Certificate Date
                </label>
                <input
                  type="date"
                  name="cbcfCertificateDate"
                  value={formData.cbcfCertificateDate}
                  onChange={handleChange}
                  className="
      w-full rounded-xl
      border border-gray-300
      p-2
      outline-none
      focus:outline-none
      focus:ring-2 focus:ring-blue-500
      focus:border-transparent
    "

                />
              </div>
            </div>
          </section>

          
          {/* <section className="bg-gray-50 p-4 rounded-xl space-y-3">
            <h3 className="font-semibold flex items-center gap-2 text-blue-700">
              <FileText className="w-5 h-5" />
              Existing Documents
            </h3>

            {existingDocs.length > 0 ? (
              existingDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex justify-between items-center border border-gray-300 rounded-xl p-2 text-sm"
                >
                  <span>{doc.documentType}</span>
                  <a
                    href={`${import.meta.env.VITE_API_BASE_URL}/${doc.filePath}`}
                    target="_blank"
                    className="text-blue-600 underline hover:cursor-pointer"
                  >
                    View
                  </a>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No documents uploaded
              </p>
            )}
          </section>

          
          <section className="bg-gray-50 p-4 rounded-xl space-y-4">
  <h3 className="font-semibold flex items-center gap-2 text-blue-700">
    <Upload className="w-5 h-5" />
    Replace / Add Documents
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {DOCUMENT_TYPES.map((type) => (
      <div key={type} className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          {type.replace(/_/g, " ")}
        </label>

        
        {existingDocs[type]?.map((doc) => (
          <div
            key={doc.id}
            className="flex justify-between items-center border rounded-lg p-2 text-xs"
          >
            <span>Existing File</span>
            <a
              href={`${import.meta.env.VITE_API_BASE_URL}/${doc.filePath}`}
              target="_blank"
              className="text-blue-600 underline"
            >
              View
            </a>
          </div>
        ))}

        
        <input
          type="file"
          multiple
          onChange={(e) => handleFileChange(type, e.target.files)}
          className="w-full rounded-xl border border-gray-300 p-2
                     outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    ))}
  </div>
</section> */}


<section className="bg-gray-50 p-4 rounded-xl space-y-4">
  <h3 className="font-semibold flex items-center gap-2 text-blue-700">
    <Upload className="w-5 h-5" />
    Documents
  </h3>

  <div className="space-y-4">
    {DOCUMENT_TYPES.map((type) => (
      <div
        key={type}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start
                   border border-gray-200 rounded-xl p-4 bg-white"
      >
        {/* LEFT: EXISTING DOCUMENT */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            {type.replace(/_/g, " ")} – Existing
          </label>

          {existingDocs[type]?.length > 0 ? (
            existingDocs[type].map((doc) => (
              <div
                key={doc.id}
                className="flex justify-between items-center
                           border rounded-lg px-3 py-2 text-sm"
              >
                <span className="text-gray-700 truncate">
                  Existing File
                </span>

                <a
                  href={`${import.meta.env.VITE_API_BASE_URL}/${doc.filePath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View
                </a>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-400">
              No file uploaded
            </p>
          )}
        </div>

        {/* RIGHT: REPLACE / UPDATE */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Replace / Update
          </label>

          <input
            type="file"
            multiple
            onChange={(e) => handleFileChange(type, e.target.files)}
            className="
              w-full rounded-xl
              border border-gray-300
              p-2 text-sm
              outline-none
              focus:ring-2 focus:ring-blue-500
              focus:border-transparent
            "
          />

          <p className="text-xs text-gray-500">
            Uploading here will replace existing file(s)
          </p>
        </div>
      </div>
    ))}
  </div>
</section>



<div>
  <label className="text-sm text-gray-600">
    Remark
  </label>
  <textarea
    name="remark"
    value={formData.remark}
    onChange={handleChange}
    rows={3}
    className="
      w-full rounded-xl
      border border-gray-300
      p-2
      outline-none
      focus:ring-2 focus:ring-blue-500
      focus:border-transparent
    "
  />
</div>



        {/* FOOTER */}
        <div className="border-t p-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700 hover:cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </div>
    </div>

  );
}

export default EditPublicityClearenceDetails;
