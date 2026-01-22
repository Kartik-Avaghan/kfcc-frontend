import {
  Search,
  SquarePen,
  Trash,
  UserPlus,
  UserX,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddUser from "../../components/super-admin/AddUser";
import { notify } from "../../Utils/notify";
import EditUser from "../../components/super-admin/EditUser";
import { ROLE_STYLE as roleStyles } from "../../components/super-admin/RolesStyle";

function ManageUsers() {
  const { role } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [editUserDetails, setEditUserDetails] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

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
  }, [role, page]);

  const handleDelete = async (userId, role) => {
    const request = {
      userID: userId,
      role: role,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/remove/role`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(request),
        },
      );

      const data = response.ok ? await response.text() : await response.json();

      if (!response.ok) {
        notify(data.message || "Failed to delete user", "error");
        return;
      }

      notify("User Deleted Sucessfully", "success");

      fetchusers();
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };

  return (
    <div className="px-14 py-8 max-w-8xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-900 capitalize mb-0">
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
                <th className="px-4 py-4 text-left ">Name</th>
                <th className="px-6 py-4 text-left ">Role</th>
                <th className="px-6 py-4 text-left ">Email</th>
                <th className="px-6 py-4 text-left ">Mobile No</th>
                <th className="px-6 py-4 text-left ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="divide-slate-200 divide-y">
                  <td className=" px-2 py-4">
                    {user.firstName +
                      " " +
                      user.middleName +
                      " " +
                      user.lastName}
                  </td>
                  <td className="px-2 py-4 ">
                    <div className="flex flex-wrap">
                      {user.roles.map((role) => (
                        <span
                          key={role}
                          className={`px-3 py-1 text-xs font-semibold gap-2 rounded-full m-1 ${
                            roleStyles[role] ?? "bg-gray-100 text-gray-700 "
                          }`}
                        >
                          {role}
                        </span>
                      ))}{" "}
                    </div>
                  </td>
                  <td className=" px-2 py-4">{user.email}</td>
                  <td className=" px-2 py-4">+91 {user.mobileNo} </td>
                  <td className="flex items-center p-2 ">
                    <button
                      onClick={() => setEditUserDetails(user)}
                      className="text-blue-500 hover:underline cursor-pointer  hover:bg-blue-600 hover:text-white rounded-full p-3 w-11 h-11 flex items-center"
                    >
                      <SquarePen className="" size={20} />
                    </button>
                    {role !== "all" && (
                      <button
                        onClick={() => setDeleteUser(user)}
                        className="text-red-500 hover:underline ml-4 cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-3 w-11 h-11 flex items-center"
                        // onClick={ () => handleDelete(user.id , role)}
                      >
                        <Trash className="" size={20} />
                      </button>
                    )}
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

      {editUserDetails && (
        <EditUser
          userData={editUserDetails}
          onCloseEdit={() => setEditUserDetails(null)}
          onActionSuccess={fetchusers}
        />
      )}

      {deleteUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            {/* Close */}
            <button
              onClick={() => setDeleteUser(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Icon */}
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 text-red-600 p-4 rounded-full">
                <AlertTriangle size={32} />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-xl font-semibold text-center text-gray-800">
              Delete User?
            </h2>

            <p className="text-center text-gray-600 mt-2">
              Are you sure you want to delete
              <span className="font-semibold text-gray-800">
                {" "}
                {deleteUser.firstName} {deleteUser.lastName}
              </span>
              ?
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setDeleteUser(null)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDelete(deleteUser.id, role);
                  setDeleteUser(null);
                }}
                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 cursor-pointer"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
