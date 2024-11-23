import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const RoleTable = ({
  roles,
  setModalRole,
  setIsModalOpen,
  handleDeleteRole,
}) => {
  return (
    <div className="flex flex-col sm:block">
      {/* Table for larger screens */}
      <table className="min-w-full table-auto sm:block hidden">
        <thead>
          <tr className="bg-gray-200 text-left text-gray-600">
            <th className="px-4 py-3">Role Name</th>
            <th className="px-4 py-3">Permissions</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <tr
                key={role.id}
                className="bg-white shadow-md rounded-lg mb-2 transition duration-200 hover:scale-105"
              >
                <td className="px-4 py-4">
                  <span className="font-medium">{role.name}</span>
                </td>
                <td className="px-4 py-4">
                  {role.permissions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((perm, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-full text-white text-sm"
                          style={{
                            backgroundColor: `hsl(${
                              (index * 40) % 360
                            }, 70%, 50%)`,
                          }}
                        >
                          {perm.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="italic text-gray-500">No permissions</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <button
                    className="px-2 py-1 mr-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                    onClick={() => {
                      setModalRole(role);
                      setIsModalOpen(true);
                    }}
                  >
                    <MdModeEditOutline className="w-6 h-6" />
                  </button>
                  <button
                    className="px-2 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    <RiDeleteBin5Fill className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center px-4 py-4 text-gray-500 italic bg-gray-100 shadow-md"
              >
                No roles found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Card layout for smaller screens */}
      <div className="sm:hidden grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.length > 0 ? (
          roles.map((role) => (
            <div
              key={role.id}
              className="bg-white shadow-lg rounded-lg p-4 transition duration-200 hover:scale-105"
            >
              <h2 className="font-semibold text-lg">{role.name}</h2>
              <div className="my-2">
                {role.permissions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((perm, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full text-white text-sm"
                        style={{
                          backgroundColor: `hsl(${
                            (index * 40) % 360
                          }, 70%, 50%)`,
                        }}
                      >
                        {perm.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="italic text-gray-500">No permissions</span>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  className="px-2 py-1 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                  onClick={() => {
                    setModalRole(role);
                    setIsModalOpen(true);
                  }}
                >
                  <MdModeEditOutline className="w-6 h-6" />
                </button>
                <button
                  className="px-2 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                  onClick={() => handleDeleteRole(role.id)}
                >
                  <RiDeleteBin5Fill className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center px-4 py-4 text-gray-500 italic bg-gray-100 shadow-md">
            No roles found
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleTable;
