import { ChevronLeft, File, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "../../Utils/notify";
import TitleRegistrationStatusCard from "../../components/users/TitleRegistrationStatusCard";

function TitleRegistrationForm() {
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    titleInKannada: "",
    date: "",
    isFirstFilm: false,
    institution: "",
    language: "",
    previouslyRegistered: false,
    previouslyRegisteredDetails: "",
    filmsByInstitutes: "",
    director: "",
    musicDirector: "",
    leadActor: "",
    category: "",
    gstNo: "",
    documents: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "true" ? true : value === "false" ? false : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      alert("You can only upload up to 5 files.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      documents: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formPayload = new FormData();

    formPayload.append(
      "request",
      new Blob(
        [
          JSON.stringify({
            title: formData.title,
            titleInKannada: formData.titleInKannada,
            date: formData.date,
            isFirstFilm: formData.isFirstFilm,
            institution: formData.institution,
            language: formData.language,
            previouslyRegistered: formData.previouslyRegistered,
            previouslyRegisteredDetails: formData.previouslyRegisteredDetails,
            filmsByInstitutes: formData.filmsByInstitutes,
            director: formData.director,
            musicDirector: formData.musicDirector,
            leadActor: formData.leadActor,
            category: formData.category,
            gstNo: formData.gstNo,
          }),
        ],
        { type: "application/json" }
      )
    );

    for (let file of formData.documents || []) {
      formPayload.append("files", file);
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/titleRegistration/apply`, {
      method: "POST",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: formPayload,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        navigate("/producer/titleRegistrationform");
        return response.json();
      })
      .then((data) => {
        console.log("Successful", data);
        setFormData({
          title: "",
          titleInKannada: "",
          date: "",
          isFirstFilm: false,
          institution: "",
          language: "",
          previouslyRegistered: false,
          previouslyRegisteredDetails: "",
          filmsByInstitutes: "",
          director: "",
          musicDirector: "",
          leadActor: "",
          category: "",
          gstNo: "",
          documents: [],
        });
      })
      .catch((error) => notify(error.message, "error"));
  };

  return (
    <>
      

      {openModal && (
        <div className="  flex justify-center items-start  py-12 px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className=" w-full max-w-5xl bg-white p-8  space-y-8"
          >
            {/* Top-left Close Button */}
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="absolute top-4 left-4 flex items-center justify-center h-9 w-9 text-gray-700  hover:text-gray-400 transition"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Header */}

             {/* Header */}
  <div className="text-center space-y-2">
    <h2 className="text-2xl font-bold text-blue-900">
      ಶೀರ್ಷಿಕೆ ನೋಂದಣಿ ಅರ್ಜಿ / TITLE REGISTRATION APPLICATION
    </h2>
    {/* <h3 className="text-lg font-semibold text-blue-900">
      TITLE REGISTRATION APPLICATION
    </h3> */}
    <p className="text-sm text-blue-900">
      ದಯವಿಟ್ಟು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ / Please fill all required details carefully
    </p>
  </div>
            {/* <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-950">
                Title Registration
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Please fill out all required details carefully.
              </p>
            </div> */}

            {/* Film Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-blue-900 border-b pb-2">
                ಚಿತ್ರದ ವಿವರಗಳು / Film Details

              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block  font-semibold text-gray-700 mb-1">
                   ಚಿತ್ರದ ಶೀರ್ಷಿಕೆ / Film Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter film title"
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block  font-semibold text-gray-700 mb-1">
                   ಕನ್ನಡದಲ್ಲಿ ಚಿತ್ರದ ಶೀರ್ಷಿಕೆ /   Film Title In Kannada<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="titleInKannada"
                    value={formData.titleInKannada}
                    onChange={handleChange}
                    placeholder="Enter film title in Kannada"
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block  font-semibold text-gray-700 mb-1">
                   ಇದು ನಿಮ್ಮ ಮೊದಲ ಚಿತ್ರವೇ? / Is this your First Film?
                  </label>
                  <select
                    name="isFirstFilm"
                    value={formData.isFirstFilm}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div>
                  <label className="block  font-semibold text-gray-700 mb-1">
                    ಭಾಷೆ / Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">--Select Language--</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.language === "Other" && (
                  <div>
                    <label className="block  font-semibold text-gray-700 mb-1">
                     ಭಾಷೆಯನ್ನು ನಮೂದಿಸಿ / Enter the Language<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="language"
                      value={formData.language}
                      //   onChange={handleChange}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          language: e.target.value,
                        }))
                      }
                      placeholder="Enter the Language"
                      className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Producer & Institution */}
            {/* <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Production Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution Name
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="Institution Name"
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Number
              </label>
              <input
                type="text"
                name="gstNo"
                value={formData.gstNo}
                onChange={handleChange}
                placeholder="Enter GST No."
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            
          </div>
        </div> */}

            {/* Extra Info for non-first films */}
            {formData.isFirstFilm === false && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-blue-900 border-b pb-2">
                  ಹಿಂದಿನ ನೋಂದಣಿಗಳ ವಿವರಗಳು / Previous Registrations
                </h3>
                <div>
                  <label className="block  font-semibold text-gray-700 mb-1">
                   ಹಿಂದೆ ನೋಂದಾಯಿಸಲಾಗಿದೆಯೇ? / Previously Registered?
                  </label>
                  <select
                    name="previouslyRegistered"
                    value={formData.previouslyRegistered}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">--Select--</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                   ಹಿಂದಿನ ನೋಂದಣಿ ವಿವರಗಳು / Previously Registered Details
                  </label>
                  <input
                    type="text"
                    name="previouslyRegisteredDetails"
                    value={formData.previouslyRegisteredDetails}
                    onChange={handleChange}
                    placeholder="Enter details"
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Crew Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-blue-900 border-b pb-2">
               ತಾಂತ್ರಿಕ ತಂಡದ ವಿವರಗಳು /  Crew Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                   ನಿರ್ದೇಶಕರು / Director
                  </label>
                  <input
                    type="text"
                    name="director"
                    value={formData.director}
                    onChange={handleChange}
                    placeholder="Director"
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                   ಸಂಗೀತ ನಿರ್ದೇಶಕರು /  Music Director
                  </label>
                  <input
                    type="text"
                    name="musicDirector"
                    value={formData.musicDirector}
                    onChange={handleChange}
                    placeholder="Music Director"
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                      ಮುಖ್ಯ ಕಲಾವಿದ /Lead Artist
                  </label>
                  <input
                    type="text"
                    name="leadActor"
                    value={formData.leadActor}
                    onChange={handleChange}
                    placeholder="Lead Artist"
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Category & Institutes */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-blue-900 border-b pb-2">
               ಹೆಚ್ಚುವರಿ ಮಾಹಿತಿ / Additional Info
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    ವರ್ಗ / Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">--Select--</option>
                    <option value="Social">Social</option>
                    <option value="Mythological">Mythological</option>
                    <option value="Historical">Historical</option>
                    <option value="Drama">Drama</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Action">Action</option>
                    <option value="Romance">Romance</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Horror">Horror</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Animation">Animation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.category === "Other" && (
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      ವರ್ಗ ನಮೂದಿಸಿ /Enter the Category<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      //   onChange={handleChange}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      placeholder="Enter the Category"
                      className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                     ಸಂಸ್ಥೆಗಳಿಂದ ನಿರ್ಮಿತ ಚಿತ್ರಗಳು /  Films By Institutes
                  </label>
                  <input
                    type="text"
                    name="filmsByInstitutes"
                    value={formData.filmsByInstitutes}
                    onChange={handleChange}
                    placeholder="List films by institutes"
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                   ದಾಖಲೆಗಳನ್ನು ಲಗತ್ತಿಸಿ (ಗರಿಷ್ಠ 5) /  Attach  Documents (Max 5)
                  </label>
                  <div className="flex items-center w-full gap-4">
                    <input
                      type="file"
                      name="documents"
                      multiple
                      onChange={handleFileChange}
                      className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    />

                    {/* Clear Files Button */}
                    {formData.documents && formData.documents.length > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, documents: [] }))
                        }
                        className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Clear Files
                      </button>
                    )}
                  </div>

                  {/* Preview Window */}
                  {formData.documents && formData.documents.length > 0 && (
                    <div className="mt-3 border p-2 rounded bg-gray-50">
                      <p className="text-sm font-medium mb-1">
                        Selected Files:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.documents.map((file, idx) => {
                          const isImage = file.type.startsWith("image/");
                          return (
                            <div
                              key={idx}
                              className="border p-1 rounded w-24 text-center"
                            >
                              {isImage ? (
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  className="w-full h-16 object-cover rounded"
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center truncate  text-gray-600  ">
                                  <File />
                                  <p className="text-xs truncate">
                                    {file.name}
                                  </p>
                                </div>
                              )}
                              <p className="text-xs text-gray-500">
                                {Math.round(file.size / 1024)} KB
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-2xl py-3 bg-blue-950 text-white font-semibold rounded-xl shadow hover:bg-blue-800 hover:shadow-lg transition-all"
              >
                ಅರ್ಜಿ ಸಲ್ಲಿಸಿ / Submit Application
              </button>
            </div>
          </form>
        </div>
      )}

      {!openModal && <TitleRegistrationStatusCard  setOpenModal={setOpenModal}/>}
    </>
  );
}

export default TitleRegistrationForm;
