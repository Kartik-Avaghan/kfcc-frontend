import React from 'react'
import { notify } from '../../Utils/notify';
import { useEffect, useState } from 'react';
import {
  Search,
  Film,
  Calendar,
  User,
  Languages,
  CheckCircle,
  CircleParking,
  FileText,
} from "lucide-react";
import ViewPublicityClearenceForm from '../../components/publicityClearenceFormView/ViewPublicityClearenceForm';

function StaffPublicityClearenceDashboard() {
    const [publicityClearances, setPublicityClearances] = useState([]);
      const [selectedApplicationId, setSelectedApplicationId] = useState(null);
      const [loading, setLoading] = useState(true);
      const [searchTerm, setSearchTerm] = useState("");



    useEffect(() => {
        const fetchPublicityClearances = async () => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/publicityClearance/pending/requests`,
              {
                method: "GET",
                headers: {
                  Authorization: `${localStorage.getItem("token")}`,
                },
              }
            );
    
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
            const data = await response.json();
    
            setPublicityClearances(
              data.filter((item) => item.publicityClearanceStatus === "SUBMITTED")
            );
          } catch (err) {
            notify(err.message || "Failed to load data", "error");
          } finally {
            setLoading(false);
          }
        };

        fetchPublicityClearances();
      }, [selectedApplicationId]);

    const filteredData = publicityClearances.filter((item) => {
  const term = searchTerm.toLowerCase();

  return (
    item.title?.title?.toLowerCase().includes(term) ||
    item.title?.director?.toLowerCase().includes(term) ||
    item.title?.leadActor?.toLowerCase().includes(term) ||
    item.title?.language?.toLowerCase().includes(term) ||
    item.publicityClearanceId?.toString().includes(term)
  );
});


  return (
    <div className="p-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">
          Applied Publicity Clearance Application
        </h1>
        <p className="text-sm text-gray-600 mt-1">
            Review and verify submitted publicity clearance requests
        </p>
      </div>

     {/* Search */}
         <div className="mt-6 mb-10 max-w-xl">
           <div className="flex items-center gap-2 mb-10 max-w-lg border-2 border-gray-300 rounded-xl p-3">
             <Search className="w-5 h-5 text-gray-600" />
             <input
               type="text"
               placeholder="Search by title, director, language..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full focus:outline-none"
             />
           </div>
    </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12 text-gray-500">Loading titles...</div>
      )}

      {/* Empty State */}
      {!loading && filteredData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                  <FileText className="w-12 h-12 mb-3 text-gray-400" />
                  <p className="text-lg font-medium">
                   No applications found
                  </p>
                </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredData.map((item) => (
          <div
            key={item.title.id}
            className="   shadow-md border-l-4 border-blue-400 rounded-2xl hover:shadow-lg transition"
          >
            {/* Card Header */}
            <div className={`px-6 py-4 bg-blue-50 rounded-t-2xl  border-b border-gray-200`}>
              <div className="flex  justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title.title}
                  </h3>

                  <div className=" flex flex-col  gap-2 text-sm text-gray-600">
                    <p>
                      Application No:{" "}
                      <span className="font-bold text-lg">
                        #{item.title.id}
                      </span>
                    </p>

                    <div className="flex items-center gap-6">
                      <p>
                        Director:{" "}
                        <span className="font-bold">
                          {item.title.director}
                        </span>
                      </p>

                      {item.title.acceptedDate && (
                        <p>
                          Accepted Date:{" "}
                          <span className="font-bold">
                            {new Date(
                              item.title.acceptedDate
                            ).toLocaleDateString()}
                          </span>
                        </p>
                      )}

                      <p>
                        Expiry Date:{" "}
                        <span className="font-mono font-bold">
                          {new Date(item.title.expireDate).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

               <button
               onClick={() => setSelectedApplicationId(item.publicityClearanceId)}
  type="button"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
             bg-blue-600 text-white font-medium
             hover:bg-blue-700 active:scale-95
             transition-all shadow-sm hover:cursor-pointer"
>
  {/* <CircleParking  className="w-5 h-5 text-white" /> */}
  View Details
</button>


              
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Director:</span>
                {item.title.director}
              </p>

              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Lead Actor:</span>
                {item.title.leadActor}
              </p>

              <p className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Language:</span>
                {item.title.language}
              </p>

              <p className="flex items-center gap-2">
                <Film className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Category:</span>
                {item.title.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      

      {selectedApplicationId && (
        <ViewPublicityClearenceForm
        applicationId = {selectedApplicationId}
        onClose={() => setSelectedApplicationId(null)} />
        )}
    </div>
  )
}

export default StaffPublicityClearenceDashboard