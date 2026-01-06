import React, { useEffect, useState } from "react";
import {
  Search,
  Film,
  Calendar,
  User,
  Languages,
  CheckCircle,
  CircleParking,
} from "lucide-react";
import { notify } from "../../Utils/notify";
import PublicityClearenceForm from "../../components/users/PublicityClearenceForm";

function PublicityClearenceDashboard() {
  const [titleRegisteredData, setTitleRegisteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTitleId, setSelectedTitleId] = useState(null);

  const fetchTitleRegisteredData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/publicityClearance/producer/titles/publicity-status`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch title registered data");
      }

      const data = await response.json();
      console.log(data);

      setTitleRegisteredData(data);
    } catch (err) {
      notify(err.message || "Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTitleRegisteredData();
  }, []);

  /* ---------------- Filter ---------------- */
  const filteredData = titleRegisteredData.filter((item) =>
    [
      item.title,
      item.titleInKannada,
      item.director,
      item.leadActor,
      item.language,
      item.category,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">
          Apply for Publicity Clearance
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Select a registered title to apply for publicity clearance
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, director, actor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12 text-gray-500">Loading titles...</div>
      )}

      {/* Empty State */}
      {!loading && filteredData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Film className="w-14 h-14 mb-4 text-blue-300" />
          <p className="text-lg font-medium">No titles found</p>
          <p className="text-sm">Try adjusting your search</p>
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
               onClick={() => setSelectedTitleId(item.title.id)}
  type="button"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
             bg-blue-600 text-white font-medium
             hover:bg-blue-700 active:scale-95
             transition-all shadow-sm hover:cursor-pointer"
>
  {/* <CircleParking  className="w-5 h-5 text-white" /> */}
  Apply Publicity Clearance
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

      {selectedTitleId && (
        <PublicityClearenceForm 
        titleId ={selectedTitleId}
        onClose={() => setSelectedTitleId(null)} />
      )}
    </div>
  );
}

export default PublicityClearenceDashboard;
