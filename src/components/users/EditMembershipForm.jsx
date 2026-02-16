import { useState, useEffect } from "react";
import React from "react";
import {
  User,
  MapPin,
  Image as ImageIcon,
  Layers,
  Building,
  Droplet,
  Wallet,
  IndianRupee,
  Plus,
  Building2,
  Map,
  Hash,
  ChevronLeft,
  Check,
  Send,
  Calendar,
  CreditCard,
  Fingerprint,
} from "lucide-react";
import { notify } from "../../Utils/notify";
import ImageField from "./ImageField";

const EditMembershipForm = ({
  setOpenModal,
  onActionSuccess,
  applicationId,
}) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],

    applicantFirmName: "",
    applicantMembershipCategory: "",
    applicantOwnershipType: "PROPRIETOR",
    applicantGstNo: "",
    applicantBloodGroup: "",

    // -------- ADDRESS (FLAT – VERY IMPORTANT) --------
    applicantAddressLine1: "",
    applicantAddressLine2: "",
    applicantDistrict: "",
    applicantState: "",
    applicantPinCode: "",
    applicantAadhaarNo: "",
    applicantPanNo: "",

    // -------- DOCUMENT FILES --------
    applicantPhoto: null,
    applicantPan: null,
    applicantAadhaar: null,
    applicantAddressProof: null,
    applicantSignature: null,
    firmSeal: null,

    // parnership
    partnershipDeed: null,
    moa: null,
    aoa: null,

    proprietor: {
      proprietorName: "",
      proprietorAddress: "",
      proprietorDob: "", // yyyy-MM-dd
      proprietorBloodGroup: "",

      proprietorPanNo: "",
      proprietorAadhaarNo: "",

      proprietorPan: null, // FILE
      proprietorAadhaar: null, // FILE
      proprietorESignature: null, // FILE
    },

    partners: [
      // {
      //   partnerName: "",
      //   partnerAddress: "",
      //   partnerDob: "", // yyyy-MM-dd
      //   partnerBloodGroup: "",
      //   partnerPanNo: "",
      //   partnerAadhaarNo: "",
      //   partnerPan: null, // FILE
      //   partnerAadhaar: null, // FILE
      //   partnerSignature: null, // FILE
      // },
    ],

    nominees: [
      {
        nomineeFirstName: "",
        nomineeMiddleName: "",
        nomineeLastName: "",
        nomineeMobileNo: "",
        nomineeEmail: "",
        nomineeRelationship: "",
      },
    ],
  });

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
          nominees: data.nominee || [],
          partners: data.partners || [],
        });
      } catch (error) {
        notify(error.message, "error");
      }
    };

    fetchApplication();
  }, [applicationId]);

  useEffect(() => {
    if (formData.applicantOwnershipType === "PROPRIETOR") {
      setFormData((prev) => ({
        ...prev,
        partners: [],
        partnershipDeed: null,
        moa: null,
        aoa: null,
      }));
    }
  }, [formData.applicantOwnershipType]);

  const partnerField = [
    {
      key: "partnerName",
      type: "text",
      labelEn: "Partner Name",
      labelKn: "ಪಾಲುದಾರರ ಹೆಸರು",
    },
    {
      key: "partnerAddress",
      type: "text",
      labelEn: "Address",
      labelKn: "ವಿಳಾಸ",
    },
    {
      key: "partnerDob",
      type: "date",
      labelEn: "Date of Birth",
      labelKn: "ಜನ್ಮ ದಿನಾಂಕ",
    },

    {
      key: "partnerBloodGroup",
      type: "select",
      labelEn: "Blood Group",
      labelKn: "ರಕ್ತದ ಗುಂಪು",
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Other"],
    },

    {
      key: "partnerPanNo",
      type: "text",
      labelEn: "PAN Number",
      labelKn: "ಪ್ಯಾನ್ ಸಂಖ್ಯೆ",
      maxlength: 10,
    },
    {
      key: "partnerAadhaarNo",
      type: "text",
      labelEn: "Aadhaar Number",
      labelKn: "ಆಧಾರ್ ಸಂಖ್ಯೆ",
      maxlength: 12,
    },
    {
      key: "partnerPan",
      type: "file",
      labelEn: "PAN Card",
      labelKn: "ಪ್ಯಾನ್ ಕಾರ್ಡ್",
    },
    {
      key: "partnerAadhaar",
      type: "file",
      labelEn: "Aadhaar Card",
      labelKn: "ಆಧಾರ್ ಕಾರ್ಡ್",
    },
    {
      key: "partnerSignature",
      type: "file",
      labelEn: "E-Signature",
      labelKn: "ಇ-ಸಹಿ",
    },
  ];

  const nomineeFields = [
    {
      key: "nomineeFirstName",
      type: "text",
      labelEn: "Nominee First Name",
      labelKn: "ನಾಮಿನಿ ಮೊದಲ ಹೆಸರು",
    },
    {
      key: "nomineeMiddleName",
      type: "text",
      labelEn: "Nominee Middle Name",
      labelKn: "ನಾಮಿನಿ ಮಧ್ಯದ ಹೆಸರು",
    },
    {
      key: "nomineeLastName",
      type: "text",
      labelEn: "Nominee Last Name",
      labelKn: "ನಾಮಿನಿ ಕೊನೆಯ ಹೆಸರು",
    },
    {
      key: "nomineeMobileNo",
      type: "number",
      labelEn: "Nominee Mobile Number",
      labelKn: "ನಾಮಿನಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
      maxlength: 10,
    },
    {
      key: "nomineeEmail",
      type: "email",
      labelEn: "Nominee Email",
      labelKn: "ನಾಮಿನಿ ಇಮೇಲ್",
    },
    {
      key: "nomineeRelationship",
      type: "text",
      labelEn: "Nominee Relationship",
      labelKn: "ನಾಮಿನಿ ಸಂಬಂಧ",
    },
  ];

  const handleInputChange = (e, section = null, index = null) => {
    const { name, value, files } = e.target;

    if (section === "proprietor") {
      setFormData((prev) => ({
        ...prev,
        proprietor: {
          ...prev.proprietor,
          [name]: files ? files[0] : value,
        },
      }));
    } else if (section === "partners") {
      const newPartners = [...formData.partners];
      newPartners[index][name] = files ? files[0] : value;
      setFormData((prev) => ({ ...prev, partners: newPartners }));
    } else if (section === "applicant") {
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "applicantMembershipCategory"
            ? value.toUpperCase()
            : name === "applicantPinCode"
              ? value === ""
                ? ""
                : Number(value)
              : files
                ? files[0]
                : value,
      }));
    } else if (section === "proposer") {
      setFormData((prev) => ({
        ...prev,
        proposer: {
          ...prev.proposer,
          [name]: value,
        },
      }));
    } else if (section === "seconder") {
      setFormData((prev) => ({
        ...prev,
        seconder: {
          ...prev.seconder,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const handleNomineeChange = (idx, key, value) => {
    const newNominee = [...formData.nominees];
    newNominee[idx][key] = value;
    setFormData((prev) => ({ ...prev, nominees: newNominee }));
  };

  const addPartner = () => {
    if (formData.partners.length < 6) {
      setFormData((prev) => ({
        ...prev,
        partners: [
          ...prev.partners,
          {
            partnerName: "",
            partnerAddress: "",
            partnerDob: "",
            partnerBloodGroup: "",

            partnerPanNo: "",
            partnerAadhaarNo: "",

            partnerPan: null, // FILE
            partnerAadhaar: null, // FILE
            partnerSignature: null,
          },
        ],
      }));
    }
  };

  const removePartner = (idx) => {
    setFormData((prev) => ({
      ...prev,
      partners: prev.partners.filter((_, i) => i !== idx),
    }));
  };

  const addNominee = () => {
    if (formData.nominees.length < 2) {
      setFormData((prev) => ({
        ...prev,
        nominees: [
          ...prev.nominees,
          {
            nomineeFirstName: "",
            nomineeMiddleName: "",
            nomineeLastName: "",
            nomineeMobileNo: "",
            nomineeEmail: "",
            nomineeRelationship: "",
          },
        ],
      }));
    }
  };

  const removeNominee = (idx) => {
    setFormData((prev) => ({
      ...prev,
      nominees: prev.nominees.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();

    const payload = {
      ...formData,
      partners:
        formData.applicantOwnershipType === "PROPRIETOR"
          ? []
          : formData.partners,
    };

    // 1 JSON payload (CORRECT)
    form.append(
      "request",
      new Blob([JSON.stringify(payload)], { type: "application/json" }),
    );

    // applicant
    if (formData.applicantPhoto)
      form.append("applicantPhoto", formData.applicantPhoto);
    if (formData.applicantPan)
      form.append("applicantPan", formData.applicantPan);
    if (formData.applicantAadhaar)
      form.append("applicantAadhaar", formData.applicantAadhaar);
    if (formData.applicantAddressProof)
      form.append("applicantAddressProof", formData.applicantAddressProof);
    if (formData.applicantSignature)
      form.append("applicantSignature", formData.applicantSignature);
    if (formData.firmSeal) form.append("firmSeal", formData.firmSeal);

    if (formData.partnershipDeed)
      form.append("partnershipDeed", formData.partnershipDeed);

    if (formData.moa) form.append("moa", formData.moa);

    if (formData.aoa) form.append("aoa", formData.aoa);

    if (formData.applicantOwnershipType !== "PROPRIETOR") {
      formData.partners.forEach((p) => {
        if (p.partnerPan) form.append("partnerPan", p.partnerPan);
        if (p.partnerAadhaar) form.append("partnerAadhaar", p.partnerAadhaar);
        if (p.partnerSignature)
          form.append("partnerSignature", p.partnerSignature);
      });
    }

    try {
      fetch(
        `${import.meta.env.VITE_API_BASE_URL}/membership/update/${applicationId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
          body: form,
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response was not ok");
          }
          return response.json();
        })
        .then(async () => {
          notify("membership form is successfully submited", "success");

          // Reset formData to empty/default
          setFormData({
            applicantFirmName: "",
            applicantMembershipCategory: "",
            applicantOwnershipType: "PROPRIETOR",
            applicantGstNo: "",

            // -------- ADDRESS (FLAT – VERY IMPORTANT) --------
            applicantAddressLine1: "",
            applicantAddressLine2: "",
            applicantDistrict: "",
            applicantState: "",
            applicantPinCode: "",

            // -------- DOCUMENT FILES --------
            applicantPhoto: null,
            applicantPan: null,
            applicantAadhaar: null,
            applicantAddressProof: null,
            applicantSignature: null,
            firmSeal: null,
            partnershipDeed: null,
            moa: null,
            aoa: null,

            partners: [
              // {
              //   partnerName: "",
              //   partnerAddress: "",
              //   partnerDob: "", // yyyy-MM-dd
              //   partnerBloodGroup: "",
              //   partnerPanNo: "",
              //   partnerAadhaarNo: "",
              //   partnerPan: null, // FILE
              //   partnerAadhaar: null, // FILE
              //   partnerSignature: null, // FILE
              // },
            ],

            nominees: [
              {
                nomineeFirstName: "",
                nomineeMiddleName: "",
                nomineeLastName: "",
                nomineeMobileNo: "",
                nomineeEmail: "",
                nomineeRelationship: "",
              },
            ],
          });

          setOpenModal(false);
          onActionSuccess();
        })
        .catch((error) => {
          notify(error.message, "error");
        });
    } catch (error) {
      console.error("Error submitting membership form:", error);
    }
  };

  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    bloodGroup: "",
    dob: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/user/userDetails`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: ` ${localStorage.getItem("token")}`,
            },
          },
        );
        if (!response.ok) throw new Error("The response was not ok");

        const data = await response.json();
        setUserData({
          firstName: data.firstName || "",
          middleName: data.middleName || "",
          lastName: data.lastName || "",
          bloodGroup: data.bloodGroup || "",
          dob: data.dob || "",
        });
      } catch (error) {
        notify(error.message, "error");
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className=" max-w-6xl mx-auto p-8 bg-white  space-y-6 mt-6">
        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="flex items-center text-lg justify-center  text-gray-900  hover:text-gray-600 transition cursor-pointer"
          >
            <ChevronLeft size={18} /> Back
          </button>
          <h2 className="text-3xl font-bold text-blue-900 mb-2">
            ಸದಸ್ಯತ್ವದ ಅರ್ಜಿಯೊಂದಿಗೆ ಲಗತ್ತಿಸಬೇಕದ ವಿವರಗಳು
          </h2>
          <h3 className="text-lg font-semibold text-gray-700">
            ANNEXURE TO APPLICATION FORM FOR MEMBERSHIP
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Applicant Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-xl">
            <div className="col-span-2">
              <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <User className="size-4 text-blue-700" />
                ಸದಸ್ಯತ್ವದ ರಿಜಿಸ್ಟರ್‌ನಲ್ಲಿ ನಮೂದಿಸಬೇಕಾದ ಅರ್ಜಿದಾರರ ಅಥವಾ ಸಂಸ್ಥೆಯ
                ಹೆಸರು / Name of Applicant
              </label>

              <div className="w-full flex gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  disabled
                  placeholder="first name"
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition bg-gray-200"
                />

                <input
                  type="text"
                  name="middleName"
                  value={userData.middleName}
                  disabled
                  placeholder="middle name"
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition bg-gray-200"
                />

                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  disabled
                  placeholder="last name"
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition bg-gray-200"
                />
              </div>
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2 ">
                <MapPin className="size-4 text-blue-700" />
                ಸದಸ್ಯತ್ವದ ರಿಜಿಸ್ಟರ್‌ನಲ್ಲಿ ನಮೂದಿಸಬೇಕಾದ ಅರ್ಜಿದಾರರ ಅಥವಾ ಸಂಸ್ಥೆಯ
                ವಿಳಾಸ / Address
              </label>

              <div className="w-full flex gap-4">
                <input
                  type="text"
                  name="applicantAddressLine1"
                  value={formData.applicantAddressLine1 || ""}
                  onChange={(e) => handleInputChange(e, "applicant")}
                  placeholder="Address line 1"
                  required
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
                />

                <input
                  type="text"
                  name="applicantAddressLine2"
                  value={formData.applicantAddressLine2 || ""}
                  onChange={(e) => handleInputChange(e, "applicant")}
                  placeholder="Address line 2"
                  required
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
                />

                {/* <input
                type="text"
                name="line3"
                value={formData.applicantAddress.line3}
                onChange={(e) => handleInputChange(e, "applicantAddress")}
                placeholder="Address line 3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 transition"
              /> */}
              </div>
            </div>

            <div className="col-span-2 space-y-3">
              <div className="w-full flex gap-4">
                {/* State */}
                <div className="w-full">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                    <Map className="w-4 h-4 text-blue-700" />
                    ರಾಜ್ಯ / State
                  </label>
                  <input
                    type="text"
                    name="applicantState"
                    value={formData.applicantState || ""}
                    onChange={(e) => handleInputChange(e, "applicant")}
                    placeholder="Enter state"
                    required
                    className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
                  />
                </div>

                {/* District */}
                <div className="w-full">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                    <MapPin className="w-4 h-4 text-blue-700" />
                    ಜಿಲ್ಲೆ / District
                  </label>
                  <input
                    type="text"
                    name="applicantDistrict"
                    value={formData.applicantDistrict || ""}
                    onChange={(e) => handleInputChange(e, "applicant")}
                    placeholder="Enter district"
                    required
                    className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
                  />
                </div>

                {/* Pincode */}
                <div className="w-full">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                    <Hash className="w-4 h-4 text-blue-700" />
                    ಪಿನ್ ಕೋಡ್ / Pincode
                  </label>
                  <input
                    type="number"
                    name="applicantPinCode"
                    value={formData.applicantPinCode || ""}
                    onChange={(e) => handleInputChange(e, "applicant")}
                    placeholder="Enter pincode"
                    required
                    maxLength={6}
                    className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
                  />
                </div>
              </div>
            </div>

            <div className="mt-1">
              <label className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                <Droplet className="w-4 h-4 text-blue-700" />
                ಅರ್ಜಿದಾರರ ರಕ್ತದ ಗುಂಪು / Applicant Blood Group
              </label>

              <input
                type="text"
                name="bloodGroup"
                value={userData.bloodGroup}
                disabled
                placeholder="blood group"
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition bg-gray-200"
              />

              {/* <select
              name="applicantBloodGroup"
              value={formData.applicantBloodGroup}
              onChange={(e) => handleInputChange(e, "applicant")}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="special">Special</option>
            </select> */}
            </div>

            <div className="mt-1">
              <label className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-700" />
                ಹುಟ್ಟಿದ ದಿನಾಂಕ / Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={userData.dob}
                disabled
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 bg-gray-200"
              />
            </div>

            <div>
              <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-blue-700" />
                ಆಧಾರ್ ಸಂಖ್ಯೆ / Aadhaar Number
              </label>
              <input
                type="number"
                name="applicantAadhaarNo"
                value={formData.applicantAadhaarNo}
                onChange={(e) => handleInputChange(e, "applicant")}
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
                placeholder="Enter Aadhaar number"
                maxLength={12}
                required
              />
            </div>

            {/* Image */}
            <ImageField
              label=" ಅರ್ಜಿದಾರರ ಆಧಾರ್ ಕಾರ್ಡ್ / Applicant Aadhaar card"
              name="applicantAadhaar"
              value={formData.applicantAadhaar}
              onChange={(e) => handleInputChange(e, "applicant")}
            />

            <div>
              <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-700" />
                ಪ್ಯಾನ್ ಸಂಖ್ಯೆ / PAN Number
              </label>
              <input
                type="text"
                name="applicantPanNo"
                value={formData.applicantPanNo}
                onChange={(e) => handleInputChange(e, "applicant")}
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
                placeholder="Enter PAN number"
                maxLength={10}
                required
              />
            </div>

            {/* Image */}
            <ImageField
              label="ಅರ್ಜಿದಾರರ ಪ್ಯಾನ್ ಕಾರ್ಡ್ / Applicant Pancard"
              name="applicantPan"
              value={formData.applicantPan}
              onChange={(e) => handleInputChange(e, "applicant")}
            />

            {/* Image */}
            <ImageField
              label="  ಅರ್ಜಿದಾರರ ವಿಳಾಸ ಪುರಾವೆ / Applicant Address-Proff"
              name="applicantAddressProof"
              value={formData.applicantAddressProof}
              onChange={(e) => handleInputChange(e, "applicant")}
            />

            <ImageField
              label="ಅರ್ಜಿದಾರರ ಇ ಸಹಿ / Applicant E-Signature"
              name="applicantSignature"
              value={formData.applicantSignature}
              onChange={(e) => handleInputChange(e, "applicant")}
            />

            <div>
              <label className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-700" />
                ಸಂಸ್ಥೆಯ ಹೆಸರು / Firm Name
              </label>

              <input
                type="text"
                name="applicantFirmName"
                value={formData.applicantFirmName}
                onChange={(e) => handleInputChange(e, "applicant")}
                placeholder="Enter firm name"
                required
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
              />
            </div>

            {/* Image */}
            <ImageField
              label="ಸಂಸ್ಥೆಯ ಮುದ್ರೆ / Firm Seal"
              name="firmSeal"
              value={formData.firmSeal}
              onChange={(e) => handleInputChange(e, "applicant")}
            />

            {/* Membership Category */}
            <div>
              <label className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-700" />
                ಕೋರಿರುವ ಸದಸ್ಯತ್ವದ ವರ್ಗ / Membership Category
              </label>
              <select
                name="applicantMembershipCategory"
                value={formData.applicantMembershipCategory}
                onChange={(e) => handleInputChange(e, "applicant")}
                required
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
              >
                <option value="">Select</option>
                <option value="PRODUCER">Producer</option>
                <option value="DISTRIBUTOR">Distributor</option>
                <option value="EXHIBITOR">Exhibitor</option>
                <option value="STUDIO_LAB_OUTDOOR">
                  Studio, Laboratory & Outdoor Unit
                </option>
                <option value="ASSOCIATE">Associated</option>
                <option value="HONORARY">Hony Member</option>
                <option value="TEMPORARY">Temporary Member</option>
              </select>
            </div>

            {/* Image */}
            <ImageField
              label="ಅರ್ಜಿದಾರರ ಚಿತ್ರ / Applicant Image"
              name="applicantPhoto"
              value={formData.applicantPhoto}
              onChange={(e) => handleInputChange(e, "applicant")}
            />

            {/* Ownership Type */}
            <div>
              <label className=" font-semibold text-gray-800 mb-1 flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-700" />
                ಮಾಲೀಕತ್ವವೇ / Ownership Type
              </label>
              <select
                name="applicantOwnershipType"
                value={formData.applicantOwnershipType}
                onChange={(e) => handleInputChange(e, "applicant")}
                required
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
              >
                <option value="">Select</option>
                <option value="PROPRIETOR">Proprietor</option>
                <option value="PARTNERSHIP">Partnership</option>
                <option value="LIMITED">Limited</option>
                <option value="COMPANY">Company</option>
                <option value="ASSOCIATION">Association</option>
              </select>
            </div>
          </div>

          {/* Partners Form */}

          {["PARTNERSHIP", "LIMITED", "COMPANY", "ASSOCIATION"].includes(
            formData.applicantOwnershipType,
          ) && (
            <div className="p-4 rounded space-y-4">
              {/* Header */}
              <div className="flex items-end gap-2">
                <h3 className="font-semibold text-lg">
                  ಪಾಲುದಾರರು / ನಿರ್ದೇಶಕರು / ಸದಸ್ಯರು / Partners / Directors /
                  Members
                </h3>
                <p>
                  ( You can add up to <span className="font-medium">6</span>{" "}
                  Partners / Directors / Members. )
                </p>
              </div>

              <h3 className="text-lg font-semibold text-blue-800">
                Organization Documents
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageField
                  label="ಪಾಲುದಾರಿಕೆ ಒಪ್ಪಂದ ಪತ್ರ / Partnership Deed"
                  name="partnershipDeed"
                                value={formData.partnershipDeed}
              onChange={(e) => handleInputChange(e, "applicant")}
                />
                <ImageField
                  label=" ಸಂಘದ ಜ್ಞಾಪಕ ಪತ್ರ / Memorandum of Association(moa)"
                  name="moa"
                                value={formData.moa}
              onChange={(e) => handleInputChange(e, "applicant")}
                />
                <ImageField
                  label=" ಸಂಘದ ಲೇಖನಗಳು / Articles of Association(aoa)"
                  name="aoa"
                  value={formData.aoa}
              onChange={(e) => handleInputChange(e, "applicant")}
                />
              </div>

              {/* Partner Cards */}
              {formData.partners.map((partner, idx) => (
                <div key={idx} className="p-4 rounded-lg space-y-3 ">
                  <h4 className=" font-semibold text-blue-700">
                    Partner {idx + 1}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {partnerField.map((field) => (
                      <div key={field.key}>
                        <label className="block font-semibold mb-1">
                          {field.labelKn} / {field.labelEn}
                        </label>

                        {field.type === "select" ? (
                          <select
                            name={field.key}
                            value={partner[field.key] || ""}
                            onChange={(e) =>
                              handleInputChange(e, "partners", idx)
                            }
                            maxLength={field.maxlength}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="">Select</option>
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div className="flex items-center gap-2">
                            <input
                              type={field.type}
                              name={field.key}
                              value={
                                field.type === "file"
                                  ? undefined
                                  : partner[field.key] || ""
                              }
                              onChange={(e) =>
                                handleInputChange(e, "partners", idx)
                              }
                              required
                              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-2 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px] cursor-pointer h-12"
                            />

                            {field.type === "file" && (
                              <div className="mt-2">
                                {partner[field.key] ? (
                                  <img
                                    src={
                                      typeof partner[field.key] === "string"
                                        ? `${import.meta.env.VITE_API_BASE_URL}/${partner[field.key].replace(/\\/g, "/")}`
                                        : URL.createObjectURL(
                                            partner[field.key],
                                          )
                                    }
                                    alt="Preview"
                                    className="w-20 h-20 object-contain"
                                  />
                                ) : (
                                  <p className="text-sm text-red-500 font-medium">
                                    File does not exist
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Remove Button */}
                  {formData.partners.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePartner(idx)}
                      className="text-red-600 underline cursor-pointer"
                    >
                      Remove Partner
                    </button>
                  )}
                </div>
              ))}

              {/* Add Partner Button (ONLY ONCE) */}
              {formData.partners.length < 6 && (
                <button
                  type="button"
                  onClick={addPartner}
                  className="flex gap-1 bg-blue-600  text-white px-4 py-2 rounded-lg cursor-pointer "
                >
                  <Plus size={24} />
                  Add Partner
                </button>
              )}
            </div>
          )}

          {/* Nominee Form */}
          <div className="p-4 space-y-2">
            <div className="flex items-end gap-2">
              <h3 className="text-lg font-semibold">
                ನಾಮಿನಿ ವಿವರಗಳು / Nominee Details
              </h3>
              <p>
                ( You can add up to <span className="font-medium">2</span>{" "}
                nominees )
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {formData.nominees.map((nominee, idx) => (
                <div key={idx} className=" rounded-xl p-4 space-y-3 ">
                  <h4 className="font-semibold text-blue-700">
                    Nominee {idx + 1}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {nomineeFields.map((field) => (
                      <div key={field.key}>
                        <label className="block font-semibold mb-1">
                          {field.labelKn} / {field.labelEn}
                        </label>

                        <input
                          type={field.type}
                          value={nominee[field.key] || ""}
                          onChange={(e) =>
                            handleNomineeChange(idx, field.key, e.target.value)
                          }
                          maxLength={field.maxlength}
                          required
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>

                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => removeNominee(idx)}
                      className="text-red-600 text-sm underline cursor-pointer"
                    >
                      Remove Nominee
                    </button>
                  )}
                </div>
              ))}
            </div>

            {formData.nominees.length < 2 && (
              <button
                type="button"
                onClick={addNominee}
                className="flex gap-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg mt-3 cursor-pointer hover:bg-blue-800 transition-all"
              >
                <Plus size={24} />
                Add Nominee
              </button>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded text-white font-semibold cursor-pointer bg-blue-500 hover:bg-blue-600`}
          >
            Submit Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditMembershipForm;
