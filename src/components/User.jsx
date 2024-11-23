import React, { useState, useEffect } from "react";
import usersJson from "../users.json"; // Import the users.json file
import rolesJson from "../roles.json"; // Import the roles.json file
import permissionsJson from "../permissions.json"; // Import the permissions.json file
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { GiPreviousButton } from "react-icons/gi";
import { GiNextButton } from "react-icons/gi";
import { TiArrowUnsorted } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setusersperpage] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const storedRoles = JSON.parse(localStorage.getItem("roles"));
    const storedPermissions = JSON.parse(localStorage.getItem("permissions"));

    if (!storedUsers || storedUsers.length === 0) {
      localStorage.setItem("users", JSON.stringify(usersJson));
      setUsers(usersJson);
    } else {
      setUsers(storedUsers);
    }

    if (!storedRoles || storedRoles.length === 0) {
      localStorage.setItem("roles", JSON.stringify(rolesJson));
      setRoles(rolesJson);
    } else {
      setRoles(storedRoles);
    }

    if (!storedPermissions || storedPermissions.length === 0) {
      localStorage.setItem("permissions", JSON.stringify(permissionsJson));
      setPermissions(permissionsJson);
    } else {
      setPermissions(storedPermissions);
    }
  }, []);

  const handleAddOrEditUser = (user) => {
    if (currentUser) {
      const updatedUsers = users.map((u) =>
        u.id === currentUser.id ? { ...u, ...user } : u
      );
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("User updated successfully!");
    } else {
      const newUser = { ...user, id: Date.now() };
      setUsers([...users, newUser]);
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      toast.success("User added successfully!");
    }
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    toast.error("User deleted successfully!");
  };

  const handleSort = (key) => {
    const isAscending = sortKey?.key === key && sortKey.direction === "asc";
    const sortedUsers = [...users].sort((a, b) => {
      if (a[key].toLowerCase() < b[key].toLowerCase())
        return isAscending ? 1 : -1;
      if (a[key].toLowerCase() > b[key].toLowerCase())
        return isAscending ? -1 : 1;
      return 0;
    });
    setUsers(sortedUsers);
    setSortKey({ key, direction: isAscending ? "desc" : "asc" });
  };

  const handleSearch = (event) =>
    setSearchTerm(event.target.value.toLowerCase());

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm) ||
      user.status.toLowerCase().includes(searchTerm)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const getStatusColor = (status) =>
    status === "active"
      ? "bg-green-400 text-green-800"
      : "bg-blue-400 text-blue-800";

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-400 text-red-800";
      case "user":
        return "bg-green-400 text-green-700";
      case "manager":
        return "bg-yellow-400 text-yellow-800";
      case "guest":
        return "bg-orange-400 text-orange-800";
      case "viewer":
        return "bg-blue-400 text-blue-800";
      default:
        return "bg-gray-400 text-slate-600";
    }
  };

  return (
    <div className="container mx-auto p-4 overflow-x-hidden">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border rounded w-full p-2"
          placeholder="Search by name, email, role, or status..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <IoIosAddCircle className="w-7 h-7" />
        </button>
      </div>

      {/* Table for larger screens */}
      <div className="hidden md:block">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              {["name", "email", "role", "status"].map((key) => (
                <th key={key} className="px-4 py-2 border-b text-left">
                  <button
                    onClick={() => handleSort(key)}
                    className="flex items-center"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortKey?.key === key
                      ? sortKey.direction === "asc"
                        ? " 🔼"
                        : " 🔽"
                      : null}{" "}
                    <TiArrowUnsorted className="w-5 h-5 " />
                  </button>
                </th>
              ))}
              <th className="px-4 py-2 border-b">Edit</th>
              <th className="px-4 py-2 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b ">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 text-[11px] font-bold rounded-full ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 text-[12px] font-semibold rounded-full ${getStatusColor(
                      user.status.toLowerCase()
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setCurrentUser(user);
                      setIsModalOpen(true);
                    }}
                  >
                    <MdModeEditOutline className="w-6 h-6 text-yellow-500" />
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDeleteUser(user.id)}>
                    <RiDeleteBin5Fill className="w-6 h-6 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded shadow-lg resp:text-sm resp:space-y-2"
          >
            <h3 className="font-semibold text-lg ">{user.name}</h3>
            <p>{user.email}</p>
            <p
              className={`px-2 py-1 text-[12px] font-bold rounded-full ${getRoleColor(
                user.role
              )}`}
            >
              {user.role}
            </p>
            <p
              className={`px-2 py-1 text-[12px] font-semibold rounded-full ${getStatusColor(
                user.status.toLowerCase()
              )}`}
            >
              {user.status}
            </p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => {
                  setCurrentUser(user);
                  setIsModalOpen(true);
                }}
              >
                <MdModeEditOutline className="w-6 h-6 text-yellow-500" />
              </button>
              <button onClick={() => handleDeleteUser(user.id)}>
                <RiDeleteBin5Fill className="w-6 h-6 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-l"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <GiPreviousButton className="w-5 h-5" />
        </button>
        <span className="px-4 py-2 bg-gray-200">{currentPage}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded-r"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <GiNextButton className="w-5 h-5" />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {currentUser ? "Edit User" : "Add User"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddOrEditUser({
                  name: e.target.name.value,
                  email: e.target.email.value,
                  role: e.target.role.value,
                  status: e.target.status.value,
                });
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  name="name"
                  className="w-full p-2 border rounded"
                  defaultValue={currentUser?.name || ""}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  name="email"
                  className="w-full p-2 border rounded"
                  defaultValue={currentUser?.email || ""}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  name="role"
                  className="w-full p-2 border rounded"
                  defaultValue={currentUser?.role || ""}
                  required
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  className="w-full p-2 border rounded"
                  defaultValue={currentUser?.status || ""}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-xl text-gray-500"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
