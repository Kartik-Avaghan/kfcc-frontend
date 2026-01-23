import { X, CreditCard, RefreshCcw, Calendar, ArrowRight, User } from "lucide-react";
import { notify } from "../../Utils/notify";

export default function RenewalMembership({
  applicationData,
  onCloseRenew,
  onActionSuccess,
}) {
  const renewalFee = 2500;

  //  DATE CALCULATION 
 const today = new Date();
const expiryDate = new Date(applicationData.expiryDate);

const renewalStartDate =
  expiryDate > today ? expiryDate : today;

// Renewal ends after 1 year from start date
const renewalEndDate = new Date(renewalStartDate);
renewalEndDate.setFullYear(renewalEndDate.getFullYear() + 1);




 const handleRenew = async () => {
   try {
     const id = applicationData.applicationId;
     
 
     const response = await fetch(
       `${import.meta.env.VITE_API_BASE_URL}/membership/renew/${id}`,
       {
         method: "POST",
         headers: {
           Authorization: `${localStorage.getItem("token")}`,
         },
       }
     );
 
     if (!response.ok) {
       throw new Error("Failed to renew title");
     }
 
     const message = await response.text(); // backend sends String
 
     console.log(message);
     notify("Membership Renewal success", "success");
 
     onActionSuccess();
     onCloseRenew();
   } catch (error) {
     console.error("Renew error:", error);
     notify("error", error.message || "Something went wrong");
   }
 };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
  <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden">

    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-linear-to-r from-amber-200 to-white">
      <div className="flex items-center gap-2 py-2">
        <RefreshCcw size={18} className="text-black" />
        <h2 className="text-lg font-bold text-black">
          Renew Membership
        </h2>
      </div>

      <button
        onClick={onCloseRenew}
        className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
      >
        <X size={18} className="text-gray-600" />
      </button>
    </div>

    {/* Body */}
    <div className="p-6 space-y-6">

      {/* Membership + Renewal Period */}
      <div className="rounded-t-2xl bg-gray-50 p-5">

        {/* Membership Info */}
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex items-center gap-2 text-yellow-800 font-semibold">
            <User size={18} />
            <span>Membership Category</span>
          </div>

          <p className="text-lg font-semibold text-gray-900">
            {applicationData.membershipCategory}
          </p>
        </div>

        {/* Renewal Period */}
        <div className="flex items-center gap-2 mb-4 text-yellow-800 font-semibold">
          <Calendar size={16} />
          <span>Renewal Period</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-xs text-gray-500">From</p>
            <p className="font-semibold text-gray-900">
              {renewalStartDate.toLocaleDateString("en-IN")}
            </p>
          </div>

          <div className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700">
            <ArrowRight size={18} />
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">To</p>
            <p className="font-semibold text-gray-900">
              {renewalEndDate.toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="rounded-b-2xl bg-yellow-50 p-5">
        <div className="flex items-center gap-2 mb-4 font-semibold text-yellow-800">
          <CreditCard size={16} />
          <span>Payment Summary</span>
        </div>

        <div className="flex justify-between text-sm text-gray-800 mb-2">
          <span>Renewal Fee</span>
          <span>₹ {renewalFee}</span>
        </div>

        <div className="flex justify-between items-center border-t border-gray-300 pt-3 mt-3 text-lg font-bold text-gray-900">
          <span>Total Payable</span>
          <span className="text-yellow-700">₹ {renewalFee}</span>
        </div>
      </div>
    </div>

    {/* Footer Actions */}
    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-300 bg-gray-50">
      <button
        onClick={onCloseRenew}
        className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-200 transition cursor-pointer"
      >
        Cancel
      </button>

      <button
        onClick={handleRenew}
        className="px-6 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-700 text-white font-semibold flex items-center gap-2 shadow-md transition cursor-pointer"
      >
        <RefreshCcw size={16} />
        Pay & Renew
      </button>
    </div>

  </div>
</div>


  );
}
