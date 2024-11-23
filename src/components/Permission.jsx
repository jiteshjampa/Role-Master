import React, { useEffect, useState } from "react";
import permissionsData from "../permissions.json"; // Import permissions.json
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { GiPreviousButton } from "react-icons/gi";
import { GiNextButton } from "react-icons/gi";
const Permission = () => {
  const [permissions, setPermissions] = useState([]);
  const [search, setSearch] = useState("");
  const [newPermission, setNewPermission] = useState("");
  const [editingPermission, setEditingPermission] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const rowsPerPage = 5; // Rows per page

  // Load permissions from localStorage or fallback to JSON file
  useEffect(() => {
    const storedPermissions = localStorage.getItem("permissions");
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    } else {
      setPermissions(permissionsData);
      localStorage.setItem("permissions", JSON.stringify(permissionsData));
    }
  }, []);

  // Add a new permission
  const handleAddPermission = () => {
    if (newPermission.trim() === "") {
      return toast.error("Permission name cannot be empty!");
    }
    const newId =
      permissions.length > 0 ? permissions[permissions.length - 1].id + 1 : 1;
    const updatedPermissions = [
      ...permissions,
      { id: newId, name: newPermission },
    ];
    setPermissions(updatedPermissions);
    localStorage.setItem("permissions", JSON.stringify(updatedPermissions));
    setNewPermission("");
    toast.success("Permission added successfully!");
  };

  // Edit an existing permission
  const handleEditPermission = (id, newName) => {
    setEditingPermission(id);
    setEditedName(newName);
  };

  // Save edited permission
  const handleSaveEdit = (id) => {
    if (editedName.trim() === "") {
      return toast.error("Permission name cannot be empty!");
    }
    const updatedPermissions = permissions.map((permission) =>
      permission.id === id ? { ...permission, name: editedName } : permission
    );
    setPermissions(updatedPermissions);
    localStorage.setItem("permissions", JSON.stringify(updatedPermissions));
    setEditingPermission(null);
    setEditedName("");
    toast.success("Permission updated successfully!");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingPermission(null);
    setEditedName("");
  };

  // Delete a permission
  const handleDeletePermission = (id) => {
    const updatedPermissions = permissions.filter(
      (permission) => permission.id !== id
    );
    setPermissions(updatedPermissions);
    localStorage.setItem("permissions", JSON.stringify(updatedPermissions));
    toast.success("Permission deleted successfully!");
  };

  // Filtered permissions based on search input
  const filteredPermissions = permissions.filter((permission) =>
    permission.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPermissions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPermissions = filteredPermissions.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="max-w-full mx-auto p-6">
      <h1 className="text-2xl resp:text-sm font-bold mb-4 text-center">
        Manage Permissions
      </h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search permissions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="flex resp:flex-col  items-center mb-4">
        <input
          type="text"
          placeholder="Add new permission"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300 mr-2"
        />
        <button
          onClick={handleAddPermission}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 resp:m-2"
        >
          <IoIosAddCircle className=" w-5 h-5 text-white" />
        </button>
      </div>

      {/* Table view for larger screens */}
      <div className="hidden lg:block overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left px-4 py-2">Permission Name</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPermissions.map((permission) => (
              <tr
                key={permission.id}
                className="hover:bg-gray-100 transition-all cursor-pointer"
              >
                <td className="px-4 py-2">
                  {editingPermission === permission.id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full p-1 focus:outline-none focus:ring focus:ring-blue-300 rounded-md"
                    />
                  ) : (
                    permission.name
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  {editingPermission === permission.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveEdit(permission.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        handleEditPermission(permission.id, permission.name)
                      }
                      className="m-2"
                    >
                      <MdModeEditOutline className="w-6 h-6 text-yellow-400" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeletePermission(permission.id)}
                    className="m-2"
                  >
                    <RiDeleteBin5Fill className="w-6 h-6 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
            {currentPermissions.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No permissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card view for smaller screens */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentPermissions.map((permission) => (
          <div
            key={permission.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">{permission.name}</div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    handleEditPermission(permission.id, permission.name)
                  }
                  className="text-yellow-500"
                >
                  <MdModeEditOutline className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleDeletePermission(permission.id)}
                  className="text-red-500"
                >
                  <RiDeleteBin5Fill className="w-6 h-6" />
                </button>
              </div>
            </div>
            {editingPermission === permission.id && (
              <div className="mt-2">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full p-1 focus:outline-none focus:ring focus:ring-blue-300 rounded-md"
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleSaveEdit(permission.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          <GiPreviousButton className=" w-5 h-5" />
        </button>
        <span className="text-xl  text-center">{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          <GiNextButton className="w-5 h-5" />
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Permission;
