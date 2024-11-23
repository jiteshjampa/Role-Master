import React from "react";

const RoleModal = ({
  modalRole,
  setModalRole,
  permissions,
  handleSaveRole,
  setIsModalOpen,
}) => {
  const handleDeletePermission = (permissionId) => {
    const updatedPermissions = modalRole.permissions.filter(
      (perm) => perm.id !== permissionId
    );
    setModalRole({ ...modalRole, permissions: updatedPermissions });
  };

  const handleAddPermission = (permissionId) => {
    const permission = permissions.find((perm) => perm.id === permissionId);
    if (
      permission &&
      !modalRole.permissions.some((perm) => perm.id === permissionId)
    ) {
      setModalRole({
        ...modalRole,
        permissions: [...modalRole.permissions, permission],
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">
          {modalRole.id ? "Edit" : "Add"} Role
        </h2>
        <input
          type="text"
          className="mb-4 p-2 w-full border border-gray-300 rounded"
          placeholder="Role Name"
          value={modalRole.name}
          onChange={(e) => setModalRole({ ...modalRole, name: e.target.value })}
        />
        <div className="mb-4">
          <h3 className="font-semibold">Permissions</h3>
          <div className="flex flex-wrap gap-2">
            {modalRole.permissions.map((perm) => (
              <span
                key={perm.id}
                className="px-2 py-1 rounded-full text-white text-sm"
                style={{ backgroundColor: "green" }}
              >
                {perm.name}
                <button
                  onClick={() => handleDeletePermission(perm.id)}
                  className="ml-1"
                >
                  x
                </button>
              </span>
            ))}
          </div>
          <div className="mt-2">
            <select
              onChange={(e) => handleAddPermission(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Select Permission</option>
              {permissions.map((perm) => (
                <option key={perm.id} value={perm.id}>
                  {perm.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveRole}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleModal;
