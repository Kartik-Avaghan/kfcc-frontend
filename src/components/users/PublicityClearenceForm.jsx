import React, { useState } from "react";
import {
  FileText,
  Hash,
  Calendar,
  UploadCloud,
  ImageIcon,
  MessageSquare,
  CheckCircle,
  X
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



const DOCUMENT_TYPE_LABELS = {
  CBCF_CERTIFICATE: {
    en: "CBCF Certificate",
    kn: "ಸಿಬಿಎಫ್ ಪ್ರಮಾಣಪತ್ರ",
  },
  HOARDINGS: {
    en: "Hoardings",
    kn: "ಹೋರ್ಡಿಂಗ್‌ಗಳು",
  },
  POSTER_DESIGNS: {
    en: "Poster Designs",
    kn: "ಪೋಸ್ಟರ್ ವಿನ್ಯಾಸಗಳು",
  },
  PHOTOCARDS: {
    en: "Photocards",
    kn: "ಫೋಟೋ ಕಾರ್ಡ್‌ಗಳು",
  },
  SLIDES: {
    en: "Slides",
    kn: "ಸ್ಲೈಡ್ಸ್",
  },
  BLOCK_DESIGNS: {
    en: "Block Designs",
    kn: "ಬ್ಲಾಕ್ ವಿನ್ಯಾಸಗಳು",
  },
  ART_PULLS: {
    en: "Art Pulls",
    kn: "ಆರ್ಟ್ ಪುಲ್ಸ್",
  },
  STICKERS: {
    en: "Stickers",
    kn: "ಸ್ಟಿಕ್ಕರ್‌ಗಳು",
  },
  NEWSPAPER_PUBLICITY: {
    en: "Newspaper Publicity",
    kn: "ಪತ್ರಿಕಾ ಪ್ರಚಾರ",
  },
  OTHERS: {
    en: "Others",
    kn: "ಇತರೆ ದಾಖಲೆಗಳು",
  },
};



function PublicityClearanceForm({ titleId, onClose }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    cbcfCertificateNo: "",
    cbcfCertificateDate: "",
    remark: "",
    documents: {},
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (type, files) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [type]: files,
      },
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();

      // simple fields
      payload.append("cbcfCertificateNo", formData.cbcfCertificateNo);
      payload.append("cbcfCertificateDate", formData.cbcfCertificateDate);
      payload.append("remark", formData.remark);

      // documents
      Object.entries(formData.documents).forEach(([type, files]) => {
        Array.from(files).forEach((file) => {
          payload.append(`documents[${type}]`, file);
        });
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/publicityClearance/${titleId}/apply`,
        {
          method: "POST",
          headers: {
            Authorization: ` ${localStorage.getItem("token")}`,
          },
          body: payload,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit publicity clearance");
      }

      notify("Publicity clearance submitted successfully", "success");
      // onSuccess?.();
      onClose();
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">

    {/* Header */}
    <div className="flex items-center justify-between px-8 py-5 border-b bg-gradient-to-r from-blue-800 to-blue-600">
     <div className="flex flex-col   gap-2">
        <div className="flex">
            {/* <FileText className="w-7 h-7 text-white " /> */}

  <h2 className="text-xl font-semibold text-white px-2">
    Publicity Clearance Application / ಪ್ರಚಾರ ಅನುಮತಿ ಅರ್ಜಿ
  </h2>
        </div>


        
  

  <p className="text-lg text-white pl-2">
    <span className="text-sm">Application No / ಅರ್ಜಿ ಸಂಖ್ಯೆ:</span> <span className="font-medium">{titleId}</span>
  </p>
</div>

 <button
        onClick={onClose}
        className="p-2 rounded-full  transition hover:cursor-pointer "
      >
        <X className="w-6 h-6 text-white hover:text-gray-300" />
      </button>


     
    </div>

    {/* Body */}
    <form
      onSubmit={handleSubmit}
      className="p-8 space-y-8 max-h-[80vh] overflow-y-auto"
    >
      {/* CBCF Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 ">
          CBCF Certificate Details / ಸಿಬಿಎಫ್ ಪ್ರಮಾಣಪತ್ರ ವಿವರಗಳು
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Hash className="w-4 h-4 text-blue-700" />
              CBCF Certificate No / ಸಿಬಿಎಫ್ ಪ್ರಮಾಣಪತ್ರ ಸಂಖ್ಯೆ
            </label>
            <input
              type="number"
              name="cbcfCertificateNo"
              value={formData.cbcfCertificateNo}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-700" />
              CBCF Certificate Date / ಸಿಬಿಎಫ್ ಪ್ರಮಾಣಪತ್ರ ದಿನಾಂಕ
            </label>
            <input
              type="date"
              name="cbcfCertificateDate"
              value={formData.cbcfCertificateDate}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1">
          Publicity Clearance Documents To Upload / ಪ್ರಚಾರ ಅನುಮತಿಗೆ ಸಂಬಂಧಿಸಿದ ದಾಖಲೆಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {DOCUMENT_TYPES.map((type) => (
            <div
              key={type}
              className=" rounded-xl p-4 hover:border-blue-500 transition"
            >
              <label className="flex items-center gap-2 font-semibold text-gray-800 pb-2">
                <ImageIcon className="w-4 h-4 text-blue-700" />
                
                
  <span className="text-sm font-semibold text-gray-700">
    {DOCUMENT_TYPE_LABELS[type].en} / {DOCUMENT_TYPE_LABELS[type].kn}
  </span>
  



              </label>

              <input
                type="file"
                multiple
                onChange={(e) =>
                  handleFileChange(type, e.target.files)
                }
                className="
                  w-full text-sm
                  file:mr-4
                  file:py-2
                  file:px-4
                  file:rounded-lg
                  file:border-0
                  file:bg-blue-600
                  file:text-white
                  hover:file:bg-blue-700
                  border border-gray-300
                  rounded-xl
                  
                  transition
                "
              />

              {/* <p className="text-xs text-gray-500 mt-2">
                Upload JPG, PNG or PDF files
              </p> */}
            </div>
          ))}
        </div>
      </div>

      {/* Remark */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-700" />
          Remark (Optional) / ಟಿಪ್ಪಣಿ (ಐಚ್ಛಿಕ)
        </label>
        <textarea
          name="remark"
          value={formData.remark}
          onChange={handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter any additional remarks... / ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಟಿಪ್ಪಣಿಗಳನ್ನು ನಮೂದಿಸಿ..."
        />
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 pt-4 border-t border-gray-300">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-red-500 hover:cursor-pointer hover:text-white transition"
        >
          Cancel / ರದ್ದುಮಾಡಿ
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-7 py-2.5 rounded-xl bg-green-600 text-white flex items-center gap-2 hover:cursor-pointer hover:bg-green-700 transition disabled:opacity-50"
        >
          {/* <CheckCircle className="w-4 h-4" /> */}
          {loading ? "Submitting..." : "Submit Application / ಅರ್ಜಿ ಸಲ್ಲಿಸಿ "}
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default PublicityClearanceForm;
