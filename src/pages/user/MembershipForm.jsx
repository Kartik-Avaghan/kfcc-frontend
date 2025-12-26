import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { notify } from "../../Utils/notify";

const MembershipForm = () => {
  const today = new Date();

  const BASE_MEMBERSHIP_FEE = 59000;
  const KALYAN_NIDHI_FEE = 22500;

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

    // -------- DOCUMENT FILES --------
    applicantImage: null,
    applicantPan: null,
    applicantAadhaar: null,
    applicantAddressProof: null,
    applicantSignature: null,
    firmSeal: null,

    proprietor: {
      proprietorName: "",
      proprietorAddress: "",
      proprietorDob: "", // yyyy-MM-dd
      proprietorBloodGroup: "",

      proprietorPanNo: "",
      proprietorAadhaarNo: "",

      proprietorPanImg: null, // FILE
      proprietorAadhaarImg: null, // FILE
      proprietorESignature: null, // FILE
    },

    partners: [
      {
        partnerName: "",
        partnerAddress: "",
        partnerDob: "", // yyyy-MM-dd
        partnerBloodGroup: "",

        partnerPanNo: "",
        partnerAadhaarNo: "",

        partnerPanImg: null, // FILE
        partnerAadhaarImg: null, // FILE
        partnerESignature: null, // FILE

        partnershipDeed: null,
        moa: null,
        aoa: null,
      },
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

    proposer: {
      proposerMembershipId: null, // MUST be number or null
      proposerName: "",
      proposerAddress: "",
      proposerMobileNo: "",
      proposerDesignation: "",
    },

    seconder: {
      seconderMembershipId: null,
      seconderName: "",
      seconderAddress: "",
      seconderMobileNo: "",
      seconderDesignation: "",
    },

    membershipFee: BASE_MEMBERSHIP_FEE,
    kalyanNidhi: false,
    totalAmountToPay: BASE_MEMBERSHIP_FEE,
    // totalAmountToPay: 59000,
  });

  useEffect(() => {
    if (formData.applicantOwnershipType === "PROPRIETOR") {
      setFormData((prev) => ({
        ...prev,
        partners: [],
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
      type: "text",
      labelEn: "Blood Group",
      labelKn: "ರಕ್ತದ ಗುಂಪು",
    },
    {
      key: "partnerPanNo",
      type: "text",
      labelEn: "PAN Number",
      labelKn: "ಪ್ಯಾನ್ ಸಂಖ್ಯೆ",
    },
    {
      key: "partnerAadhaarNo",
      type: "text",
      labelEn: "Aadhaar Number",
      labelKn: "ಆಧಾರ್ ಸಂಖ್ಯೆ",
    },
    {
      key: "partnerPanImg",
      type: "file",
      labelEn: "PAN Card",
      labelKn: "ಪ್ಯಾನ್ ಕಾರ್ಡ್",
    },
    {
      key: "partnerAadhaarImg",
      type: "file",
      labelEn: "Aadhaar Card",
      labelKn: "ಆಧಾರ್ ಕಾರ್ಡ್",
    },
    {
      key: "partnerESignature",
      type: "file",
      labelEn: "E-Signature",
      labelKn: "ಇ-ಸಹಿ",
    },
    {
      key: "partnerShipDeed",
      type: "file",
      labelEn: "Partnership Deed",
      labelKn: "ಪಾಲುದಾರಿಕೆ ಒಪ್ಪಂದ ಪತ್ರ",
    },
    {
      key: "moa",
      type: "file",
      labelEn: "Memorandum of Association(moa)",
      labelKn: "ಸಂಘದ ಜ್ಞಾಪಕ ಪತ್ರ",
    },
    {
      key: "aoa",
      type: "file",
      labelEn: "Articles of Association(aoa)",
      labelKn: "ಸಂಘದ ಲೇಖನಗಳು",
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

  const [termsChecked, setTermsChecked] = useState(false);

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
        [name]: files ? files[0] : value,
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

  // const handleCheckboxChange = (key, value) => {
  //   setFormData((prev) => {
  //     let total = prev.totalAmountToPay;
  //     if (key === "kalyanNidhi") total = value ? total + 22500 : total - 22500;
  //     return { ...prev, [key]: value, totalAmountToPay: total };
  //   });
  // };

  const handleCheckboxChange = (key, checked) => {
    setFormData((prev) => {
      const baseFee = prev.membershipFee;
      const kalyanFee = 22500;

      return {
        ...prev,
        kalyanNidhi: checked,
        totalAmountToPay: checked ? baseFee + kalyanFee : baseFee,
      };
    });
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

            partnerPanImg: null, // FILE
            partnerAadhaarImg: null, // FILE
            partnerESignature: null,
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

  // const addProposer = () => {
  //   if (formData.proposer.length < 2) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       proposer: [
  //         ...prev.proposer,
  //         {
  //           proposerReferenceId: "",
  //           proposerDate: today.toISOString().split("T")[0],
  //           proposerName: "",
  //           proposerAddress: "",
  //           proposerPhNo: "",
  //           proposerDesignation: "",
  //         },
  //       ],
  //     }));
  //   }
  // };

  // const removeProposer = (idx) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     proposer: prev.proposer.filter((_, i) => i !== idx),
  //   }));
  // };

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  // console.log(decodedToken);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();

    // form.append("request",JSON.stringify(formData));
    const payload = {
      ...formData,
      userId: decodedToken.userid,
      membershipFee: formData.membershipFee,
      kalyanNidhi: formData.kalyanNidhi ? 1 : 0,
      totalAmountToPay: formData.totalAmountToPay,
    };

    // 1 JSON payload (CORRECT)
    form.append(
      "request",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    // applicant
    if (formData.applicantImage)
      form.append("applicantImage", formData.applicantImage);
    if (formData.applicantPan)
      form.append("applicantPan", formData.applicantPan);
    if (formData.applicantAadhaar)
      form.append("applicantAadhaar", formData.applicantAadhaar);
    if (formData.applicantAddressProof)
      form.append("applicantAddressProof", formData.applicantAddressProof);
    if (formData.applicantSignature)
      form.append("applicantSignature", formData.applicantSignature);
    if (formData.firmSeal) form.append("firmSeal", formData.firmSeal);

    // proprietor
    if (formData.proprietor.proprietorPanImg)
      form.append("proprietorPanImg", formData.proprietor.proprietorPanImg);

    if (formData.proprietor.proprietorAadhaarImg)
      form.append(
        "proprietorAadhaarImg",
        formData.proprietor.proprietorAadhaarImg
      );

    if (formData.proprietor.proprietorESignature)
      form.append(
        "proprietorESignature",
        formData.proprietor.proprietorESignature
      );

    formData.partners.forEach((p, i) => {
      if (p.partnerPanImg)
        // form.append("partnerPanImg[]", p.partnerPanImg);
        form.append(`partnerPanImg_${i}`, p.partnerPanImg);

      if (p.partnerAadhaarImg)
        // form.append("partnerAadhaarImg[]", p.partnerAadhaarImg);
        form.append(`partnerAadhaarImg_${i}`, p.partnerAadhaarImg);

      if (p.partnerESignature)
        // form.append("partnerESignature[]", p.partnerESignature);
        form.append(`partnerESignature_${i}`, p.partnerESignature);
    });

    fetch(`${import.meta.env.VITE_API_BASE_URL}/membership/apply`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: form,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", setFormData(data));

        alert("membership form is successfully submited");

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
          applicantImage: null,
          applicantPan: null,
          applicantAadhaar: null,
          applicantAddressProof: null,
          applicantSignature: null,
          firmSeal: null,
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

            proprietorPanImg: null, // FILE
            proprietorAadhaarImg: null, // FILE
            proprietorESignature: null, // FILE
          },

          partners: [
            {
              partnerName: "",
              partnerAddress: "",
              partnerDob: "", // yyyy-MM-dd
              partnerBloodGroup: "",

              partnerPanNo: "",
              partnerAadhaarNo: "",

              partnerPanImg: null, // FILE
              partnerAadhaarImg: null, // FILE
              partnerESignature: null, // FILE
            },
          ],

          // partnerShipDeed: null,
          //     moa: null,
          //     aoa: null,

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

          proposer: {
            proposerMembershipId: null, // MUST be number or null
            proposerName: "",
            proposerAddress: "",
            proposerMobileNo: "",
            proposerDesignation: "",
          },

          seconder: {
            seconderMembershipId: null,
            seconderName: "",
            seconderAddress: "",
            seconderMobileNo: "",
            seconderDesignation: "",
          },
          totalAmountToPay: 59000,
        });

        //  Reset terms checkbox as well
        setTermsChecked(false);
      })
      .catch((error) => {
        notify(error.message, "error");
      });
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
          `${import.meta.env.VITE_API_BASE_URL}/user/getDetail`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
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

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg space-y-6">
      <div className="text-center space-y-2">
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
              ಸದಸ್ಯತ್ವದ ರಿಜಿಸ್ಟರ್‌ನಲ್ಲಿ ನಮೂದಿಸಬೇಕಾದ ಅರ್ಜಿದಾರರ ಅಥವಾ ಸಂಸ್ಥೆಯ ಹೆಸರು
              / Name of Applicant
            </label>

            <div className="w-full flex gap-4">
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleUserData}
                placeholder="first name"
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
              />

              <input
                type="text"
                name="middleName"
                value={userData.middleName}
                onChange={handleUserData}
                placeholder="middle name"
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
              />

              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleUserData}
                placeholder="last name"
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
              />
            </div>
          </div>

          {/* Date */}
          {/* <div>
            <label className=" font-semibold text-gray-800 mb-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-700" />
              ದಿನಾಂಕ / Date
            </label>
            <input
              type="text"
              value={formData.date}
              readOnly
              className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div> */}

          {/* Address */}
          <div className="col-span-2">
            <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2 ">
              <MapPin className="size-4 text-blue-700" />
              ಸದಸ್ಯತ್ವದ ರಿಜಿಸ್ಟರ್‌ನಲ್ಲಿ ನಮೂದಿಸಬೇಕಾದ ಅರ್ಜಿದಾರರ ಅಥವಾ ಸಂಸ್ಥೆಯ ವಿಳಾಸ
              / Address
            </label>

            <div className="w-full flex gap-4">
              <input
                type="text"
                name="applicantAddressLine1"
                value={formData.applicantAddressLine1 || ""}
                onChange={(e) => handleInputChange(e, "applicant")}
                placeholder="Address line 1"
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
              />

              <input
                type="text"
                name="applicantAddressLine2"
                value={formData.applicantAddressLine2 || ""}
                onChange={(e) => handleInputChange(e, "applicant")}
                placeholder="Address line 2"
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
                  type="text"
                  name="applicantPinCode"
                  value={formData.applicantPinCode || ""}
                  onChange={(e) => handleInputChange(e, "applicant")}
                  placeholder="Enter pincode"
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
              onChange={handleUserData}
              placeholder="blood group"
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
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

          {/* <div className="mt-1">
            <label className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-blue-700" />
              ಅರ್ಜಿದಾರರ ರಕ್ತದ ಗುಂಪು / Applicant Blood Group
            </label>
            <select
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
            </select>
          </div> */}

          {/* Image */}
          <div>
            <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-700" />
              ಅರ್ಜಿದಾರರ ಚಿತ್ರ / Applicant Image
            </label>
            <input
              type="file"
              name="applicantImage"
              onChange={(e) => handleInputChange(e, "applicant")}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
            />
          </div>

          {/* Image */}
          <div>
            <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-700" />
              ಅರ್ಜಿದಾರರ ಆಧಾರ್ ಕಾರ್ಡ್ / Applicant Aadhaar card
            </label>
            <input
              type="file"
              name="applicantAadhaar"
              onChange={(e) => handleInputChange(e, "applicant")}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
            />
          </div>

          {/* Image */}
          <div>
            <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-700" />
              ಅರ್ಜಿದಾರರ ಪ್ಯಾನ್ ಕಾರ್ಡ್ / Applicant Pancard
            </label>
            <input
              type="file"
              name="applicantPan"
              onChange={(e) => handleInputChange(e, "applicant")}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
            />
          </div>

          {/* Image */}
          <div>
            <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-700" />
              ಅರ್ಜಿದಾರರ ವಿಳಾಸ ಪುರಾವೆ / Applicant Address-Proff
            </label>
            <input
              type="file"
              name="applicantAddressProof"
              onChange={(e) => handleInputChange(e, "applicant")}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
            />
          </div>

          {/* Image */}
          <div>
            <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-700" />
              ಅರ್ಜಿದಾರರ ಇ ಸಹಿ / Applicant E-Signature
            </label>
            <input
              type="file"
              name="applicantSignature"
              onChange={(e) => handleInputChange(e, "applicant")}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
            />
          </div>

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
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
            />
          </div>

          {/* Image */}
          <div>
            <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-700" />
              ಸಂಸ್ಥೆಯ ಮುದ್ರೆ / Firm Seal
            </label>
            <input
              type="file"
              name="firmSeal"
              onChange={(e) => handleInputChange(e, "applicant")}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
            />
          </div>

          {/* <div>
            <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-700" />
              ಪಾಲುದಾರಿಕೆ ಒಪ್ಪಂದ ಪತ್ರ / Partnership Deed
            </label>
            <input
              type="file"
              name="partnershipDeed"
              onChange={(e) => handleInputChange(e, "applicant")}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
            />
          </div>

          <div>
            <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-700" />
              ಸಂಘದ ಜ್ಞಾಪಕ ಪತ್ರ / Memorandum of Association(moa)
            </label>
            <input
              type="file"
              name="moa"
              onChange={(e) => handleInputChange(e, "applicant")}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
            />
          </div>

          <div>
            <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-700" />
              ಸಂಘದ ಲೇಖನಗಳು / Articles of Association(aoa)
            </label>
            <input
              type="file"
              name="aoa"
              onChange={(e) => handleInputChange(e, "applicant")}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
            />
          </div> */}

          {/* Phone Number */}
          {/* <div>
            <label className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-700" />
              ದೂರವಾಣಿ ಸಂಖ್ಯೆ / Mobile No.
            </label>
            <input
              type="text"
              name="applicantPhNo"
              value={formData.applicantPhNo}
              onChange={handleInputChange}
              placeholder="+91"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 transition"
            />
          </div>

     
          <div>
            <label className=" font-semibold text-gray-800 mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-700" />
              ಇ-ಮೇಲ್ ಐಡಿ / E-mail ID
            </label>
            <input
              type="email"
              name="applicantEmail"
              value={formData.applicantEmail}
              placeholder="example@mail.com"
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2  transition"
            />
          </div> */}

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
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
            >
              <option value="">Select</option>
              <option value="PRODUCER">Producer</option>
              <option value="DISTRIBUTER">Distributer</option>
              <option value="EXHIBITOR">Exhibitor</option>
              <option value="STUDIO_LAB_OUTDOOR">
                Studio, Laboratory & Outdoor Unit
              </option>
              <option value="ASSOCIATE">Associated</option>
              <option value="HONORARY">Hony Member</option>
              <option value="TEMPORARY">Temporary Member</option>
            </select>
          </div>

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

        {/* Proprietor Form */}
        {formData.applicantOwnershipType === "PROPRIETOR" && (
          <div className="rounded-lg p-4 mt-1">
            <h2 className="text-lg font-semibold mb-3">
              ಮಾಲೀಕರ ವಿವರಗಳು / Proprietor Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Proprietor Name */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  ಮಾಲೀಕರ ಹೆಸರು / Proprietor Name
                </label>
                <input
                  type="text"
                  name="proprietorName"
                  value={formData.proprietor.proprietorName}
                  onChange={(e) => handleInputChange(e, "proprietor")}
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
                  placeholder="Enter proprietor name"
                />
              </div>

              {/* Proprietor Address */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  ವಿಳಾಸ / Address
                </label>
                <input
                  type="text"
                  name="proprietorAddress"
                  value={formData.proprietor.proprietorAddress}
                  onChange={(e) => handleInputChange(e, "proprietor")}
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
                  placeholder="Enter address"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  ಹುಟ್ಟಿದ ದಿನಾಂಕ / Date of Birth
                </label>
                <input
                  type="date"
                  name="proprietorDob"
                  value={formData.proprietor.proprietorDob}
                  onChange={(e) => handleInputChange(e, "proprietor")}
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  ರಕ್ತದ ಗುಂಪು / Blood Group
                </label>
                <select
                  name="proprietorBloodGroup"
                  value={formData.proprietor.proprietorBloodGroup}
                  onChange={(e) => handleInputChange(e, "proprietor")}
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="special">Special</option>
                </select>
              </div>

              {/* PAN Number */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  ಪ್ಯಾನ್ ಸಂಖ್ಯೆ / PAN Number
                </label>
                <input
                  type="text"
                  name="proprietorPanNo"
                  value={formData.proprietor.proprietorPanNo}
                  onChange={(e) => handleInputChange(e, "proprietor")}
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
                  placeholder="Enter PAN number"
                />
              </div>

              {/* Aadhaar Number */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  ಆಧಾರ್ ಸಂಖ್ಯೆ / Aadhaar Number
                </label>
                <input
                  type="number"
                  name="proprietorAadhaarNo"
                  value={formData.proprietor.proprietorAadhaarNo}
                  onChange={(e) => handleInputChange(e, "proprietor")}
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
                  placeholder="Enter Aadhaar number"
                />
              </div>
            </div>

            {/* File Uploads */}
            {/* <div className="grid grid-cols-3 gap-4 mt-4">
              
              <div>
                <label className="block text-sm font-semibold mb-1">
                  ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಚಿತ್ರ / PAN Card Image
                </label>
                <input
                  type="file"
                  name="proprietorPanImg"
                  accept="image/*"
                  onChange={(e) => handleInputChange(e, "proprietor")}
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px] cursor-pointer file:cursor-pointer"
                />
                {formData.proprietor.proprietorPanImg && (
                  <img
                    src={URL.createObjectURL(
                      formData.proprietor.proprietorPanImg
                    )}
                    alt="PAN Preview"
                    className="mt-2 h-24 rounded border"
                  />
                )}
              </div> */}

            {/* Aadhaar Image */}
            {/* <div>
                <label className="block text-sm font-semibold mb-1">
                  ಆಧಾರ್ ಕಾರ್ಡ್ ಚಿತ್ರ / Aadhaar Card Image
                </label>
                <input
                  type="file"
                  name="proprietorAadhaarImg"
                  accept="image/*"
                  onChange={(e) => handleInputChange(e, "proprietor")}
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px] cursor-pointer file:cursor-pointer"
                />
                {formData.proprietor.proprietorAadhaarImg && (
                  <img
                    src={URL.createObjectURL(
                      formData.proprietor.proprietorAadhaarImg
                    )}
                    alt="Aadhaar Preview"
                    className="mt-2 h-24 rounded border"
                  />
                )}
              </div> */}

            {/* E-Signature */}
            {/* <div>
                <label className="block text-sm font-semibold mb-1">
                  ಇ-ಸಹಿ / E-Signature
                </label>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    name="proprietorESignature"
                    accept="image/*"
                    onChange={(e) => handleInputChange(e, "proprietor")}
                    className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px] cursor-pointer file:cursor-pointer"
                  />
                  
                </div>

                {formData.proprietor.proprietorESignature && (
                  <img
                    src={URL.createObjectURL(
                      formData.proprietor.proprietorESignature
                    )}
                    alt="E-Signature Preview"
                    className="mt-2 h-24 rounded border"
                  />
                )}
              </div>
            </div> */}
          </div>
        )}

        {/* Partners Form */}

        {["PARTNERSHIP", "LIMITED", "COMPANY", "ASSOCIATION"].includes(
          formData.applicantOwnershipType
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

                      <input
                        type={field.type}
                        name={field.key}
                        value={
                          field.type === "file"
                            ? undefined
                            : partner[field.key] || ""
                        }
                        onChange={(e) => handleInputChange(e, "partners", idx)}
                        className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-2
                  file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0
                  file:bg-blue-600 file:text-white hover:file:bg-blue-700
                  transition file:text-[12px] cursor-pointer"
                      />
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
                className="flex gap-1 bg-blue-600  text-white px-4 py-2 rounded-lg cursor-pointer"
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>

                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() => removeNominee(idx)}
                    className="text-red-600 text-sm underline"
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
              className="flex gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg mt-3"
            >
              <Plus size={24} />
              Add Nominee
            </button>
          )}
        </div>

        {/* Proposer Form */}
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold mb-3 ">
            ಪ್ರತಿಪಾದಕ ವಿವರಗಳು / Proposer Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2 ">
                ಪ್ರತಿಪಾದಕ ಸದಸ್ಯತ್ವ ಸಂಖ್ಯೆ / Proposer Membership ID
              </label>
              <input
                type="number"
                value={formData.proposer.proposerMembershipId}
                onChange={(e) => handleInputChange(e, "proposer")}
                name="proposerMembershipId"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                ಪ್ರತಿಪಾದಕ ಹೆಸರು / Proposer Name
              </label>
              <input
                type="text"
                name="proposerName"
                value={formData.proposer.proposerName}
                onChange={(e) => handleInputChange(e, "proposer")}
                className="w-full border border-gray-300  px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                ಪ್ರತಿಪಾದಕ ವಿಳಾಸ / Proposer Address
              </label>
              <input
                type="text"
                name="proposerAddress"
                value={formData.proposer.proposerAddress}
                onChange={(e) => handleInputChange(e, "proposer")}
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                ಮೊಬೈಲ್ ಸಂಖ್ಯೆ / Mobile Number
              </label>
              <input
                type="tel"
                name="proposerMobileNo"
                value={formData.proposer.proposerMobileNo}
                onChange={(e) => handleInputChange(e, "proposer")}
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                ಹುದ್ದೆ / Designation
              </label>
              <input
                type="text"
                name="proposerDesignation"
                value={formData.proposer.proposerDesignation}
                onChange={(e) => handleInputChange(e, "proposer")}
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* <div className=" p-4  space-y-3">
          <h3 className="font-semibold">Proposer Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.proposer.map((prop, idx) => (
              <div key={idx} className=" p-2 space-y-2">
                <h4>Proposer {idx + 1}</h4>
                {Object.keys(prop).map((key) => (
                  <div key={key}>
                    <label className="block font-semibold mb-2">{key}</label>
                    <input
                      type={key === "proposerDate" ? "date" : "text"}
                      value={prop[key]}
                      onChange={(e) =>
                        handleProposerChange(idx, key, e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                ))}
                {formData.proposer.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProposer(idx)}
                    className="text-white bg-red-500 px-3 py-2 rounded-md mt-1 cursor-pointer"
                  >
                    Remove Proposer
                  </button>
                )}
              </div>
            ))}
          </div>
          {formData.proposer.length < 2 && (
            <button
              type="button"
              onClick={addProposer}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              Add Proposer
            </button>
          )}
        </div> */}

        {/* secondary */}
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold mb-3">
            ಸೇಕಂಡರ್ ವಿವರಗಳು / Seconder Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Seconder Membership ID */}
            <div>
              <label className="block font-semibold mb-2">
                ಸೇಕಂಡರ್ ಸದಸ್ಯತ್ವ ಸಂಖ್ಯೆ / Seconder Membership ID
              </label>
              <input
                type="number"
                name="seconderMembershipId"
                value={formData.seconder.seconderMembershipId}
                onChange={(e) => handleInputChange(e, "seconder")}
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
              />
            </div>

            {/* Seconder Name */}
            <div>
              <label className="block font-semibold mb-2">
                ಸೇಕಂಡರ್ ಹೆಸರು / Seconder Name
              </label>
              <input
                type="text"
                name="seconderName"
                value={formData.seconder.seconderName}
                onChange={(e) => handleInputChange(e, "seconder")}
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
              />
            </div>

            {/* Seconder Address */}
            <div>
              <label className="block font-semibold mb-2">
                ಸೇಕಂಡರ್ ವಿಳಾಸ / Seconder Address
              </label>
              <input
                type="text"
                name="seconderAddress"
                value={formData.seconder.seconderAddress}
                onChange={(e) => handleInputChange(e, "seconder")}
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block font-semibold mb-2">
                ಮೊಬೈಲ್ ಸಂಖ್ಯೆ / Mobile Number
              </label>
              <input
                type="tel"
                name="seconderMobileNo"
                value={formData.seconder.seconderMobileNo}
                onChange={(e) => handleInputChange(e, "seconder")}
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block font-semibold mb-2">
                ಹುದ್ದೆ / Designation
              </label>
              <input
                type="text"
                name="seconderDesignation"
                value={formData.seconder.seconderDesignation}
                onChange={(e) => handleInputChange(e, "seconder")}
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Fees */}
        <div className="border border-gray-200 p-6 rounded-xl space-y-4 bg-gradient-to-bl from-blue-50 via-white to-blue-100 shadow-md transition-all hover:shadow-lg  duration-200">
          {/* Membership Fee Section */}
          <div className="flex items-center gap-3 text-blue-900">
            <Wallet className="w-5 h-5 text-blue-700" />
            <label className="text-lg font-medium">
              Membership Form Application Fee
              <span className="block text-gray-600 text-base mt-0.5">
                ₹50,000 + GST ={" "}
                <span className="font-semibold text-blue-900">₹59,000</span>
              </span>
            </label>
          </div>

          {/* Kalyan Nidhi Checkbox */}
          <label className="flex items-center gap-3 text-lg cursor-pointer hover:text-blue-700 transition-colors">
            <input
              type="checkbox"
              checked={formData.kalyanNidhi}
              onChange={(e) =>
                handleCheckboxChange("kalyanNidhi", e.target.checked)
              }
              className="w-4.5 h-4.5 accent-blue-700 cursor-pointer"
            />

            <span>
              Apply for <span className="font-semibold">Kalyan Nidhi</span>{" "}
              <span className="font-semibold text-blue-900 ml-1">₹22,500</span>
            </span>
          </label>

          {/* Total Display */}
          <div className="flex items-center justify-between mt-4 border-t pt-3">
            <span className="font-semibold text-xl text-gray-800 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-blue-700 mt-1" />
              Total:
            </span>
            <span className="font-bold text-2xl text-blue-700">
              ₹{formData.totalAmountToPay.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Terms & Submit */}
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={termsChecked}
            onChange={(e) => setTermsChecked(e.target.checked)}
            className="form-checkbox w-4 h-4"
          />
          <span>
            ನಾನು/ನಾವು ನೀಡಿರುವ{" "}
            <a href="" target="_blank" className="text-blue-600 underline">
              ನೀತಿ, ನಿಯಮಗಳನ್ನು
            </a>{" "}
            ಓದಿ ಒಪ್ಪಿಕೊಂಡಿರುತ್ತೇನೆ / I have read and agree to the Terms and
            Conditions
          </span>
        </label>

        <button
          type="submit"
          disabled={!termsChecked}
          className={`w-full py-3 rounded text-white font-semibold cursor-pointer ${
            termsChecked
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MembershipForm;
