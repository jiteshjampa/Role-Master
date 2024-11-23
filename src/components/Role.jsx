import React, { useState, useEffect } from "react";
import rolesData from "../roles.json";
import permissionsData from "../permissions.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircle } from "react-icons/io";
import RoleTable from "./RoleTable";
import Pagination from "./Pagination";
import RoleModal from "./RoleModal";
const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(5); // Number of roles to display per page
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState({ name: "", permissions: [] });

  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem("roles")) || rolesData;
    const savedPermissions =
      JSON.parse(localStorage.getItem("permissions")) || permissionsData;

    setRoles(savedRoles);
    setPermissions(savedPermissions);

    localStorage.setItem("roles", JSON.stringify(savedRoles));
    localStorage.setItem("permissions", JSON.stringify(savedPermissions));
  }, []);

  const handleSaveRole = () => {
    if (!modalRole.name.trim()) {
      toast.error("Role name is required!");
      return;
    }

    if (modalRole.permissions.length === 0) {
      toast.error("At least one permission is required!");
      return;
    }

    const existingRole = roles.find(
      (role) => role.name.toLowerCase() === modalRole.name.toLowerCase()
    );

    if (existingRole && !modalRole.id) {
      toast.error("Role already exists. Please enter a new role.");
      return;
    }

    if (modalRole.id) {
      const updatedRoles = roles.map((role) =>
        role.id === modalRole.id
          ? {
              ...role,
              name: modalRole.name,
              permissions: modalRole.permissions,
            }
          : role
      );
      setRoles(updatedRoles);
      localStorage.setItem("roles", JSON.stringify(updatedRoles));
    } else {
      const newRole = {
        id: Date.now(),
        name: modalRole.name,
        permissions: modalRole.permissions,
      };
      setRoles([...roles, newRole]);
      localStorage.setItem("roles", JSON.stringify([...roles, newRole]));
      toast.success("Role added successfully!");
    }

    setIsModalOpen(false);
    setModalRole({ name: "", permissions: [] });
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the roles to be displayed on the current page
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Delete Role (fixed)
  const handleDeleteRole = (id) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    setRoles(updatedRoles); // Update the roles state directly
    localStorage.setItem("roles", JSON.stringify(updatedRoles)); // Store updated roles in localStorage
    toast.success("Role deleted successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>

      <div className="flex mb-4">
        <input
          type="text"
          className="mb-2 mr-2 border rounded w-full"
          placeholder="Search by role name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="mb-2 px-4 py-2"
          onClick={() => {
            setModalRole({ name: "", permissions: [] });
            setIsModalOpen(true);
          }}
        >
          <IoIosAddCircle className="w-6 h-6 text-green-500" />
        </button>
      </div>

      <RoleTable
        roles={currentRoles}
        setModalRole={setModalRole}
        setIsModalOpen={setIsModalOpen}
        handleDeleteRole={handleDeleteRole} // Pass the delete handler to RoleTable
      />

      {/* Pagination */}
      <Pagination
        rolesPerPage={rolesPerPage}
        totalRoles={filteredRoles.length}
        paginate={paginate}
      />

      {isModalOpen && (
        <RoleModal
          modalRole={modalRole}
          setModalRole={setModalRole}
          permissions={permissions}
          handleSaveRole={handleSaveRole}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      <ToastContainer />
    </div>
  );
};
export default RoleManagement;
