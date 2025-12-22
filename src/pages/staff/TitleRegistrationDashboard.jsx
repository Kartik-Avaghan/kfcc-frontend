import React, { useEffect, useState } from "react";
// import RegisterViewDetails from "./RegisterViewDetails";
import { Eye, Calendar, Film, User, Building, Search, Filter } from 'lucide-react';


function TitleRegistrationDashboard() {
  const [registerDetails, setRegisterDetails] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
   const [searchTerm, setSearchTerm] = useState(""); 


  useEffect(() => {
    fetch(`http://localhost:8080/titleApplication/pending?userrole=STAFF`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const applications = data.map((item) => item.application);
        setRegisterDetails(applications);
      })
      .catch((error) => console.log("Fetching Error", error));
  }, [selectedDetail]);


    // Filter details by search term (title, producer, director, actor)
  const filteredDetails = registerDetails.filter((detail) => {
    const term = searchTerm.toLowerCase();
    return (
      detail.title?.toLowerCase().includes(term) ||
      detail.producer?.toLowerCase().includes(term) ||
      detail.director?.toLowerCase().includes(term) ||
      detail.actor?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex justify-center items-center  p-10">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-2xl text-blue-950 font-semibold">
          All Registered Details
        </h1>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mt-6 mb-2 w-full max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, producer, director, actor..."
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Search className="w-5 h-5 text-blue-600" />
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 gap-6 mt-6 w-full px-2 sm:px-4">
          {filteredDetails.map((detail) => (
            <div
                key={detail.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-blue-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-800">{detail.title}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                        <p><span className="font-medium">ID:</span> #{detail.id}</p>
                        <p><span className="font-medium">Language:</span> {detail.language}</p>
                        <p><span className="font-medium">Category:</span> {detail.category}</p>
                        <p><span className="font-medium">Submitted Date:</span> {new Date(detail.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    {/* View Details Button */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => setSelectedDetail(detail)}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Producer Info */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Producer</p>
                        <p className="text-gray-800 font-semibold">{detail.producer}</p>
                      </div>
                    </div>

                    {/* Director Info */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Director</p>
                        <p className="text-gray-800 font-semibold">{detail.director}</p>
                      </div>
                    </div>

                    {/* Actor Info */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Film className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Lead Actor</p>
                        <p className="text-gray-800 font-semibold">{detail.actor}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status Display (Simple) */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 font-medium">Current Status:</span>
                      <span className="text-sm text-gray-800 font-semibold bg-gray-100 px-2 py-1 rounded">
                        {detail.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>

      {/* ✅ Modal should be OUTSIDE map */}
      {/* <RegisterViewDetails
        detail={selectedDetail}
        onClose={() => setSelectedDetail(null)}
      /> */}
    </div>
  );
}

export default TitleRegistrationDashboard;
