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
  ChevronLeft,
  Check,
  Send,
  Calendar,
  CreditCard,
  Fingerprint,
} from "lucide-react";
import { notify } from "../../Utils/notify";

const MembershipForm = ({ setOpenModal, onActionSuccess }) => {
  const BASE_MEMBERSHIP_FEE = 59000;
  const KALYAN_NIDHI_FEE = 22500;

  const OTP_DURATION = 60;
  const [endoresmentOtpSent, setEndoresmentOtpSent] = useState({
    PROPOSER: {
      sent: false,
      timeleft: 0,
      verified: false,
    },
    SECONDER: {
      sent: false,
      timeleft: 0,
      verified: false,
    },
  });
  const [endoresmentOtp, setEndoresmentOtp] = useState({
    PROPOSER: "",
    SECONDER: "",
  });

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
  });

  // useEffect(() => {
  //   if (formData.applicantOwnershipType === "PROPRIETOR") {
  //     setFormData((prev) => ({
  //       ...prev,
  //       partners: [],
  //     }));
  //   }
  // }, [formData.applicantOwnershipType]);

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
      maxLength:"10",
    },
    {
      key: "partnerAadhaarNo",
      type: "text",
      labelEn: "Aadhaar Number",
      labelKn: "ಆಧಾರ್ ಸಂಖ್ಯೆ",
      maxLength:"12",
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
    // {
    //   key: "partnershipDeed",
    //   type: "file",
    //   labelEn: "Partnership Deed",
    //   labelKn: "ಪಾಲುದಾರಿಕೆ ಒಪ್ಪಂದ ಪತ್ರ",
    // },
    // {
    //   key: "moa",
    //   type: "file",
    //   labelEn: "Memorandum of Association(moa)",
    //   labelKn: "ಸಂಘದ ಜ್ಞಾಪಕ ಪತ್ರ",
    // },
    // {
    //   key: "aoa",
    //   type: "file",
    //   labelEn: "Articles of Association(aoa)",
    //   labelKn: "ಸಂಘದ ಲೇಖನಗಳು",
    // },
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
      maxLength:"10"
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
    }
    // else if (section === "applicant") {
    //   setFormData((prev) => ({
    //     ...prev,
    //     [name]: files ? files[0] : value,
    //   }));
    // }
    else if (section === "applicant") {
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

  const handleEndorsementSendOtp = async (type) => {
    // Implement OTP sending logic here
    const membershipId =
      type === "PROPOSER"
        ? formData.proposer.proposerMembershipId
        : formData.seconder.seconderMembershipId;

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/membership/endorsement/send-otp/${membershipId}/${type}
        `,
        {
          method: "POST",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.ok ? await response.text() : await response.json();

      if (!response.ok) {
        notify(data.message, "error");
        return;
      }

      notify(data, "success");
      setEndoresmentOtpSent((prev) => ({
        ...prev,
        [type]: {
          sent: true,
          timeleft: OTP_DURATION,
          verified: false,
        },
      }));
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const handleEndorsementVerification = async (type) => {
    const endorsementMembershipId =
      type === "PROPOSER"
        ? formData.proposer.proposerMembershipId
        : formData.seconder.seconderMembershipId;

    try {
      const payload = {
        proposerMembershipId: endorsementMembershipId,
        otp: endoresmentOtp[type],
        type: type,
      };

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/membership/endorsement/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        notify(data.message, "error");
        return;
      }

      setEndoresmentOtpSent((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          verified: true,
          timeleft: 0,
        },
      }));

      setFormData((prev) => ({
        ...prev,
        [type.toLowerCase()]: {
          ...prev[type.toLowerCase()],
          [`${type.toLowerCase()}Name`]: [
            data.firstName,
            data.middleName,
            data.lastName,
          ]
            .filter(Boolean)
            .join(" "),
          [`${type.toLowerCase()}Address`]: data.address,
          [`${type.toLowerCase()}Designation`]: data.designation,
          [`${type.toLowerCase()}MobileNo`]: data.mobile,
        },
      }));

      notify(`${type.toLowerCase()} Verified`, "success");
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const maskMobile = (mobile) => {
    if (!mobile) return "";
    const str = mobile.toString();
    return "XXXXXXX" + str.slice(-3);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEndoresmentOtpSent((prev) => {
        const updated = { ...prev };

        ["PROPOSER", "SECONDER"].forEach((type) => {
          if (updated[type].timeleft > 0) {
            updated[type].timeleft -= 1;
          }
        });

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();

    const payload = {
      ...formData,
      membershipFee: formData.membershipFee,
      kalyanNidhi: formData.kalyanNidhi ? 1 : 0,
      totalAmountToPay: formData.totalAmountToPay,

      partners:
        formData.applicantOwnershipType === "PROPRIETOR"
          ? []
          : formData.partners,
    };

    // 1 JSON payload (CORRECT)
    form.append(
      "request",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
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

    // proprietor
    if (formData.proprietor.proprietorPan)
      form.append("proprietorPan", formData.proprietor.proprietorPan);

    if (formData.proprietor.proprietorAadhaar)
      form.append("proprietorAadhaar", formData.proprietor.proprietorAadhaar);

    if (formData.proprietor.proprietorESignature)
      form.append(
        "proprietorESignature",
        formData.proprietor.proprietorESignature
      );

    // formData.partners.forEach((p) => {
    //   if (p.partnerPan) {
    //     form.append("partnerPan", p.partnerPan);
    //   }

    //   if (p.partnerAadhaar) {
    //     form.append("partnerAadhaar", p.partnerAadhaar);
    //   }

    //   if (p.partnerSignature) {
    //     form.append("partnerSignature", p.partnerSignature);
    //   }
    // });

    if (formData.applicantOwnershipType !== "PROPRIETOR") {
      formData.partners.forEach((p) => {
        if (p.partnerPan) form.append("partnerPan", p.partnerPan);
        if (p.partnerAadhaar) form.append("partnerAadhaar", p.partnerAadhaar);
        if (p.partnerSignature)
          form.append("partnerSignature", p.partnerSignature);
      });
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/membership/apply`, {
      method: "POST",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: form,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        setFormData(data);
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

          proposer: {
            proposerMembershipId: "", // MUST be number or null
            proposerName: "",
            proposerAddress: "",
            proposerMobileNo: "",
            proposerDesignation: "",
          },

          seconder: {
            seconderMembershipId: "",
            seconderName: "",
            seconderAddress: "",
            seconderMobileNo: "",
            seconderDesignation: "",
          },
          totalAmountToPay: 59000,
        });

        setEndoresmentOtpSent({
          PROPOSER: { sent: false, timeleft: 0, verified: false },
          SECONDER: { sent: false, timeleft: 0, verified: false },
        });

        setEndoresmentOtp({
          PROPOSER: "",
          SECONDER: "",
        });

        //  Reset terms checkbox as well
        setTermsChecked(false);

        onActionSuccess();
        setOpenModal(false);
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
          `${import.meta.env.VITE_API_BASE_URL}/user/userDetails`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: ` ${localStorage.getItem("token")}`,
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

  // const handleUserData = (e) => {
  //   const { name, value } = e.target;
  //   setUserData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  return (
    <>
      <div className=" max-w-6xl mx-auto p-8 bg-white  space-y-6 mt-6">
        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="flex items-center text-lg justify-center  text-gray-900  hover:text-gray-600 transition cursor-pointer"
          >
            <ChevronLeft size={18}  /> Back
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
                  placeholder="middle name"
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition bg-gray-200"
                />

                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  placeholder="last name"
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 transition bg-gray-200"
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
                type="text"
                name="proprietorAadhaarNo"
                value={formData.proprietor.proprietorAadhaarNo}
                onChange={(e) => handleInputChange(e, "proprietor")}
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
                placeholder="Enter Aadhaar number"
                maxLength={12}
                required
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
                required
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
              />
            </div>

            <div>
              <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-700" />
                ಪ್ಯಾನ್ ಸಂಖ್ಯೆ / PAN Number
              </label>
              <input
                type="text"
                name="proprietorPanNo"
                value={formData.proprietor.proprietorPanNo}
                onChange={(e) => handleInputChange(e, "proprietor")}
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2"
                placeholder="Enter PAN number"
                maxLength={10}
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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

            {/* Image */}
            <div>
              <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-700" />
                ಅರ್ಜಿದಾರರ ಚಿತ್ರ / Applicant Image
              </label>
              <input
                type="file"
                name="applicantPhoto"
                onChange={(e) => handleInputChange(e, "applicant")}
                required
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
              />
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

          {/* Proprietor Form */}
          {/* {formData.applicantOwnershipType === "PROPRIETOR" && (
              <div className="rounded-lg p-4 mt-1">
                <h2 className="text-lg font-semibold mb-3">
                  ಮಾಲೀಕರ ವಿವರಗಳು / Proprietor Details
                </h2>

                <div className="grid grid-cols-2 gap-4"> */}
          {/* Proprietor Name */}
          {/* <div>
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
                  </div> */}

          {/* Proprietor Address */}
          {/* <div>
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
                  </div> */}

          {/* Date of Birth */}

          {/* Blood Group */}
          {/* <div>
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
                  </div> */}

          {/* PAN Number */}
          {/* <div>
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
                  </div> */}

          {/* Aadhaar Number */}
          {/* <div>
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
                  </div> */}
          {/* </div> */}

          {/* File Uploads */}
          {/* <div className="grid grid-cols-3 gap-4 mt-4">
              
              <div>
                <label className="block text-sm font-semibold mb-1">
                  ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಚಿತ್ರ / PAN Card Image
                </label>
                <input
                  type="file"
                  name="proprietorPan"
                  accept="image/*"
                  onChange={(e) => handleInputChange(e, "proprietor")}
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px] cursor-pointer file:cursor-pointer"
                />
                {formData.proprietor.proprietorPan && (
                  <img
                    src={URL.createObjectURL(
                      formData.proprietor.proprietorPan
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
                  name="proprietorAadhaar"
                  accept="image/*"
                  onChange={(e) => handleInputChange(e, "proprietor")}
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px] cursor-pointer file:cursor-pointer"
                />
                {formData.proprietor.proprietorAadhaar && (
                  <img
                    src={URL.createObjectURL(
                      formData.proprietor.proprietorAadhaar
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
          {/* </div> */}
          {/* )} */}

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

              <h3 className="text-lg font-semibold text-blue-800">
                Organization Documents
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    {/* <ImageIcon className="w-4 h-4 text-blue-700" /> */}
                    ಪಾಲುದಾರಿಕೆ ಒಪ್ಪಂದ ಪತ್ರ / Partnership Deed
                  </label>
                  <input
                    type="file"
                    name="partnershipDeed"
                    onChange={(e) => handleInputChange(e, "applicant")}
                    required
                    className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
                  />
                </div>

                <div>
                  <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    {/* <ImageIcon className="w-4 h-4 text-blue-700" /> */}
                    ಸಂಘದ ಜ್ಞಾಪಕ ಪತ್ರ / Memorandum of Association(moa)
                  </label>
                  <input
                    type="file"
                    name="moa"
                    onChange={(e) => handleInputChange(e, "applicant")}
                    required
                    className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
                  />
                </div>

                <div>
                  <label className=" font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    {/* <ImageIcon className="w-4 h-4 text-blue-700" /> */}
                    ಸಂಘದ ಲೇಖನಗಳು / Articles of Association(aoa)
                  </label>
                  <input
                    type="file"
                    name="aoa"
                    onChange={(e) => handleInputChange(e, "applicant")}
                    required
                    className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-1 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition file:text-[12px]"
                  />
                </div>
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
                            maxLength={field.maxLength}
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
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 py-2
      file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0
      file:bg-blue-600 file:text-white hover:file:bg-blue-700
      transition file:text-[12px] cursor-pointer"
                          />
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
                          maxLength={field.maxLength}
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

          {/* Proposer Form */}
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">
              ಪ್ರತಿಪಾದಕ ವಿವರಗಳು / Proposer Details
            </h3>

            <div className="grid grid-cols-12 gap-4">
              {/* Membership ID */}
              <div className="col-span-12 md:col-span-6">
                <label className="block font-semibold mb-2">
                  ಪ್ರತಿಪಾದಕ ಸದಸ್ಯತ್ವ ಸಂಖ್ಯೆ / Proposer Membership ID
                </label>
                <input
                  type="number"
                  name="proposerMembershipId"
                  value={formData.proposer.proposerMembershipId}
                  onChange={(e) => handleInputChange(e, "proposer")}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Send / Resend Button */}
              <div className="col-span-12 md:col-span-2 flex items-end">
                {!endoresmentOtpSent.PROPOSER.sent && (
                  <button
                    type="button"
                    onClick={() => handleEndorsementSendOtp("PROPOSER")}
                    className="w-full bg-blue-600 flex items-center cursor-pointer justify-center gap-2 py-2.5 rounded-md text-white hover:bg-blue-800"
                  >
                    <Send size={16} /> Send OTP
                  </button>
                )}

                {endoresmentOtpSent.PROPOSER.sent &&
                  endoresmentOtpSent.PROPOSER.timeleft === 0 &&
                  !endoresmentOtpSent.PROPOSER.verified && (
                    <button
                      type="button"
                      onClick={() => handleEndorsementSendOtp("PROPOSER")}
                      className="w-full bg-blue-600 flex items-center justify-center gap-2 py-2.5 rounded-md text-white hover:bg-blue-800 cursor-pointer"
                    >
                      <Send size={16} /> Resend OTP
                    </button>
                  )}
              </div>

              {/* OTP Section */}
              {endoresmentOtpSent.PROPOSER.sent &&
                !endoresmentOtpSent.PROPOSER.verified && (
                  <>
                    <div className="col-span-12 md:col-span-6">
                      <label className="flex items-center gap-3 font-semibold mb-2">
                        ಒಟಿಪಿ ನಮೂದಿಸಿ / Enter OTP
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                          {endoresmentOtpSent.PROPOSER.timeleft}s
                        </span>
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="XXXXXX"
                        disabled={endoresmentOtpSent.PROPOSER.timeleft === 0}
                        onChange={(e) =>
                          setEndoresmentOtp((prev) => ({
                            ...prev,
                            PROPOSER: e.target.value,
                          }))
                        }
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-2 flex items-end">
                      <button
                        type="button"
                        disabled={endoresmentOtpSent.PROPOSER.timeleft === 0}
                        onClick={() =>
                          handleEndorsementVerification("PROPOSER")
                        }
                        className="w-full cursor-pointer bg-green-600 flex items-center justify-center gap-2 py-2.5 rounded-md text-white disabled:bg-gray-400"
                      >
                        <Check size={18} /> Verify
                      </button>
                    </div>
                  </>
                )}

              <div className="col-span-12 md:col-span-6">
                <label className="block font-semibold mb-2">
                  ಪ್ರತಿಪಾದಕ ಹೆಸರು / Proposer Name
                </label>
                <input
                  type="text"
                  name="proposerName"
                  value={formData.proposer.proposerName}
                  disabled
                  className="w-full border border-gray-300  px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-200"
                />
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block font-semibold mb-2">
                  ಪ್ರತಿಪಾದಕ ವಿಳಾಸ / Proposer Address
                </label>
                <input
                  type="text"
                  name="proposerAddress"
                  value={formData.proposer.proposerAddress}
                  disabled
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 bg-gray-200"
                />
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block font-semibold mb-2">
                  ಮೊಬೈಲ್ ಸಂಖ್ಯೆ / Mobile Number
                </label>
                <input
                  type="tel"
                  name="proposerMobileNo"
                  value={maskMobile(formData.proposer.proposerMobileNo)}
                  disabled
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 bg-gray-200"
                />
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block font-semibold mb-2">
                  ಹುದ್ದೆ / Designation
                </label>
                <input
                  type="text"
                  name="proposerDesignation"
                  value={formData.proposer.proposerDesignation}
                  disabled
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 bg-gray-200"
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

          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">
              ಸೇಕಂಡರ್ ವಿವರಗಳು / Seconder Details
            </h3>

            <div className="grid grid-cols-12 gap-4">
              {/* Membership ID */}
              <div className="col-span-12 md:col-span-6">
                <label className="block font-semibold mb-2">
                  ಸೇಕಂಡರ್ ಸದಸ್ಯತ್ವ ಸಂಖ್ಯೆ / Seconder Membership ID
                </label>
                <input
                  type="number"
                  name="seconderMembershipId"
                  value={formData.seconder.seconderMembershipId}
                  onChange={(e) => handleInputChange(e, "seconder")}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-12 md:col-span-2 flex items-end">
                {!endoresmentOtpSent.SECONDER.sent && (
                  <button
                    type="button"
                    onClick={() => handleEndorsementSendOtp("SECONDER")}
                    className="w-full bg-blue-600 flex items-center cursor-pointer justify-center gap-2 py-2.5 rounded-md text-white hover:bg-blue-800"
                  >
                    <Send size={16} /> Send OTP
                  </button>
                )}

                {endoresmentOtpSent.SECONDER.sent &&
                  endoresmentOtpSent.SECONDER.timeleft === 0 &&
                  !endoresmentOtpSent.SECONDER.verified && (
                    <button
                      type="button"
                      onClick={() => handleEndorsementSendOtp("SECONDER")}
                      className="w-full bg-blue-600 flex items-center justify-center gap-2 py-2.5 rounded-md text-white hover:bg-blue-800 cursor-pointer"
                    >
                      <Send size={16} /> Resend OTP
                    </button>
                  )}
              </div>

              {/* OTP Section */}
              {endoresmentOtpSent.SECONDER.sent &&
                !endoresmentOtpSent.SECONDER.verified && (
                  <>
                    <div className="col-span-12 md:col-span-6">
                      <label className="flex items-center gap-3 font-semibold mb-2">
                        ಒಟಿಪಿ ನಮೂದಿಸಿ / Enter OTP
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                          {endoresmentOtpSent.SECONDER.timeleft}s
                        </span>
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="XXXXXX"
                        disabled={endoresmentOtpSent.SECONDER.timeleft === 0}
                        onChange={(e) =>
                          setEndoresmentOtp((prev) => ({
                            ...prev,
                            SECONDER: e.target.value,
                          }))
                        }
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-2 flex items-end">
                      <button
                        type="button"
                        disabled={endoresmentOtpSent.SECONDER.timeleft === 0}
                        onClick={() =>
                          handleEndorsementVerification("SECONDER")
                        }
                        className="w-full cursor-pointer bg-green-600 flex items-center justify-center gap-2 py-2.5 rounded-md text-white disabled:bg-gray-400"
                      >
                        <Check size={18} /> Verify
                      </button>
                    </div>
                  </>
                )}

              <div className="col-span-12 md:col-span-6">
                <label className="block font-semibold mb-2">
                  ಸೇಕಂಡರ್ ಹೆಸರು / seconder Name
                </label>
                <input
                  type="text"
                  name="seconderName"
                  value={formData.seconder.seconderName}
                  disabled
                  className="w-full border border-gray-300  px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-200"
                />
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block font-semibold mb-2">
                  ಸೇಕಂಡರ್ ವಿಳಾಸ / seconder Address
                </label>
                <input
                  type="text"
                  name="seconderAddress"
                  value={formData.seconder.seconderAddress}
                  disabled
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 bg-gray-200"
                />
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block font-semibold mb-2">
                  ಮೊಬೈಲ್ ಸಂಖ್ಯೆ / Mobile Number
                </label>
                <input
                  type="tel"
                  name="seconderMobileNo"
                  value={maskMobile(formData.seconder.seconderMobileNo)}
                  disabled
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 bg-gray-200"
                />
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="block font-semibold mb-2">
                  ಹುದ್ದೆ / Designation
                </label>
                <input
                  type="text"
                  name="seconderDesignation"
                  value={formData.seconder.seconderDesignation}
                  disabled
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 py-2 bg-gray-200"
                />
              </div>
            </div>
          </div>

          {/* secondary */}
          {/* <div className="p-4 space-y-3">
              <h3 className="text-lg font-semibold mb-3">
                ಸೇಕಂಡರ್ ವಿವರಗಳು / Seconder Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
          {/* Seconder Membership ID */}
          {/* <div>
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
                </div> */}

          {/* Seconder Name */}
          {/* <div>
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
                </div> */}

          {/* Seconder Address */}
          {/* <div>
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
                </div> */}

          {/* Mobile Number */}
          {/* <div>
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
                </div> */}

          {/* Designation */}
          {/* <div>
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
            </div> */}

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
                <span className="font-semibold text-blue-900 ml-1">
                  ₹22,500
                </span>
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
      {/* )} */}

      {/* {!openModal && <MembershipCard setOpenModal={setOpenModal} />} */}

      {/* {!openModal && <UserMembershipDasboard setOpenModal={setOpenModal}/>} */}
    </>
  );
};

export default MembershipForm;
