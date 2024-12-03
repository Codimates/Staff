import React, { useState, useEffect } from "react";

const UserDetailsModal = ({ showModal, onClose, user, onEdit, onDelete }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState({ ...user });

  // Update editableUser when the user prop changes
  useEffect(() => {
    if (user) {
      setEditableUser({ ...user });
    }
  }, [user]);

  if (!showModal || !user) return null;

  const DisplayField = ({ label, value }) => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
        {label}
      </label>
      <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-left">
        {value || "N/A"}
      </p>
    </div>
  );

  const EditableField = ({ label, value, name }) => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={(e) =>
          setEditableUser({ ...editableUser, [e.target.name]: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
      />
    </div>
  );

  const handleSave = () => {
    if (onEdit && typeof onEdit === "function") {
      onEdit(editableUser); // Save the updated user details
      onClose(); // Close the modal
      setIsEditMode(false); // Exit edit mode
    } else {
      console.error("onEdit is not a function");
    }
  };

  const handleDelete = () => {
    if (onDelete && typeof onDelete === "function") {
      onDelete(editableUser.id); // Delete the user
      onClose(); // Close the modal
    } else {
      console.error("onDelete is not a function");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-2/3 max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {isEditMode ? "Edit User Details" : "User Details"}
          </h2>
          <button
            onClick={onClose}
            className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {isEditMode ? (
            <>
              <EditableField
                label="User Name"
                value={editableUser.name}
                name="name"
              />
              <EditableField
                label="Email Address"
                value={editableUser.email}
                name="email"
              />
              <EditableField
                label="Phone Number"
                value={editableUser.phone}
                name="phone"
              />
              <EditableField
                label="User Role"
                value={editableUser.role}
                name="role"
              />
              <EditableField
                label="Status"
                value={editableUser.status}
                name="status"
              />
            </>
          ) : (
            <>
              <DisplayField label="User Name" value={user.name} />
              <DisplayField label="Email Address" value={user.email} />
              <DisplayField label="Phone Number" value={user.phone} />
              <DisplayField label="User Role" value={user.role} />
              <DisplayField label="Status" value={user.status} />
            </>
          )}
        </div>

        <div className="mt-5 flex justify-center ">
          {isEditMode ? (
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-7 py-2 rounded hover:bg-blue-700 mr-5"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditMode(true)}
              className="bg-orange-500 text-white px-8 py-2 rounded hover:bg-orange-600 mr-5"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 ml-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
