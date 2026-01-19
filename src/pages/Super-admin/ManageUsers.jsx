import { Search, SquarePen, Trash, UserPlus, UserX } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddUser from "../../components/super-admin/AddUser";
import { notify } from "../../Utils/notify";

function ManageUsers() {
  const { role } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  const fetchusers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/${role == "all" ? `all?page=${page}` : `role?role=${role}&page=${page}`} `,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }
      setUsers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };

  useEffect(() => {
    fetchusers();
  }, [role , page]);

  const handleDelete = async (userId , role) => {
    const request = {
      "userID" : userId,
      "role" : role
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/remove/role`, {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(request)
        },
      );
      
      if (!response.ok) {
        notify(data.message, "error");
        return;
      }
      
      const data = response.ok ? await response.text() : await response.json();
      
      notify("User Deleted Sucessfully" , "success");
    
      fetchusers();

    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  }
  

  const roleStyles = {
    SUPER_ADMIN: "bg-orange-100 text-orange-700 border border-red-300",
    PRESIDENT: "bg-purple-100 text-purple-700 border border-purple-300",
    SECRETARY: "bg-blue-100 text-blue-700 border border-blue-300",
    MANAGER: "bg-emerald-100 text-emerald-700 border border-emerald-300",
    STAFF: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    EC_MEMBER: "bg-lime-100 text-lime-700 border border-lime-300",

    VP_PRODUCER: "bg-indigo-100 text-indigo-700 border border-indigo-300",
    VP_EXHIBITOR: "bg-indigo-100 text-indigo-700 border border-indigo-300",
    VP_DISTRIBUTOR: "bg-indigo-100 text-indigo-700 border border-indigo-300",

    ONM_COMMITTEE: "bg-pink-100 text-pink-700 border border-pink-300",
    ONM_COMMITTEE_VOTER: "bg-pink-100 text-pink-700 border border-pink-300",
    ONM_COMMITTEE_LEADER: "bg-pink-200 text-pink-800 border border-pink-400",

    TITLE_COMMITTEE: "bg-teal-100 text-teal-700 border border-teal-300",
    TITLE_COMMITTEE_VOTER: "bg-teal-100 text-teal-700 border border-teal-300",
    TITLE_COMMITTEE_LEADER: "bg-teal-200 text-teal-800 border border-teal-400",

    PRODUCER: "bg-teal-100 text-teal-700 border border-teal-300",
    DISTRIBUTOR: "bg-teal-100 text-teal-700 border border-teal-300",
    EXHIBITOR: "bg-teal-100 text-teal-700 border border-teal-300",
    STUDIO: "bg-teal-100 text-teal-700 border border-teal-300",

    HONORARY_MEMBER: "bg-gray-100 text-gray-700 border border-gray-300",
    TEMPORARY_MEMBER: "bg-gray-100 text-gray-700 border border-gray-300",

    USER: "bg-gray-100 text-gray-700 border border-gray-300",
  };

  return (
    <div className="px-14 py-8 max-w-8xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold capitalize mb-0">
            {role.replaceAll("_", " ")}
          </h1>
          <h4 className="text-gray-600">
            Manage users with the {role.replaceAll("_", " ")} Role.
          </h4>
        </div>

        <button
          type="button"
          className="bg-blue-600 text-white flex items-center px-5 py-3 rounded-lg gap-2 hover:bg-blue-700 transition-all cursor-pointer"
          onClick={() => setAddUser(true)}
        >
          <UserPlus size={18} /> Add User
        </button>
      </div>

      <div className="flex items-center gap-2 mb-10 max-w-md border-2 border-gray-300 rounded-xl p-2">
        <Search className="w-5 h-5 text-gray-600" />
        <input
          type="text"
          placeholder="Search by name."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full focus:outline-none"
        />
      </div>

      {users.length > 0 ? (
        <div className="rounded-xl overflow-hidden ">
          <table className="w-full background-white border-collapse ">
            <thead>
              <tr className="bg-gray-50 text-gray-600 border-b border-slate-200">
                <th className="px-6 py-4 text-left ">Name</th>
                <th className="px-6 py-4 text-left ">Role</th>
                <th className="px-6 py-4 text-left ">Email</th>
                <th className="px-6 py-4 text-left ">Mobile No</th>
                <th className="px-6 py-4 text-left ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="divide-slate-200 divide-y">
                  <td className=" px-6 py-4">
                    {user.firstName +
                      " " +
                      user.middleName +
                      " " +
                      user.lastName}
                  </td>
                  <td className=" px-6 py-4">
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className={`px-3 py-1 text-xs font-semibold gap-2 rounded-full m-1 ${
                          roleStyles[role] ?? "bg-gray-100 text-gray-700 "
                        }`}
                      >
                        {role}
                      </span>
                    ))}
                  </td>
                  <td className=" px-6 py-4">{user.email}</td>
                  <td className=" px-6 py-4">+91 {user.mobileNo} </td>
                  <td className="flex items-center p-2 ">
                    <button className="text-blue-500 hover:underline cursor-pointer  hover:bg-blue-600 hover:text-white rounded-full p-3 w-11 h-11 flex items-center">
                      <SquarePen className="" size={20} />
                    </button>
                    <button className="text-red-500 hover:underline ml-4 cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-3 w-11 h-11 flex items-center"
                      onClick={ () => handleDelete(user.id , role)}
                    >
                      <Trash className="" size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-end gap-2 mt-10 w-full">
              <div className="flex gap-2 ">
                {/* Previous */}
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                  className={`px-3 py-1 rounded border text-sm
            ${
              page === 0
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-white hover:bg-gray-100 cursor-pointer"
            }`}
                >
                  Prev
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-3 py-1 rounded border text-sm
              ${
                page === i
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-gray-100 cursor-pointer"
              }`}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages - 1))
                  }
                  disabled={page === totalPages - 1}
                  className={`px-3 py-1 rounded border text-sm
            ${
              page === totalPages - 1
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-white hover:bg-gray-100"
            }`}
                >
                  Next
                </button>
              </div>
              <p className="text-gray-600">
                showing {page + 1} out of {totalPages} pages
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="h-100 w-full flex items-center flex-col justify-center">
          <UserX className="text-gray-500" size={80} />
          <h2 className="text-center text-gray-600 text-2xl mt-6">
            No {role} found.
          </h2>
        </div>
      )}

      {addUser && <AddUser setAddUser={setAddUser} fetchusers={fetchusers} />}
    </div>
  );
}

export default ManageUsers;
