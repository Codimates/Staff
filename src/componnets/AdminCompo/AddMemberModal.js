import React, { useState, useEffect } from "react";

const AddMemberModal = ({ showModal, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset form data when modal is closed or opened again
    if (!showModal) {
      setFormData({
        id: "",
        name: "",
        email: "",
        phone: "",
        role: "",
        status: "",
      });
      setErrors({});
    }
  }, [showModal]);

  if (!showModal) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear the specific error if input is valid
    validateField(id, value);
  };

  const validateField = (field, value) => {
    let error = "";

    // Validate each field
    if (field === "id") {
      if (!value.trim()) {
        error = "User ID is required.";
      }
    } else if (field === "name") {
      if (!value.trim()) {
        error = "User name is required.";
      } else if (value.trim().length < 4) {
        error = "User name must contain at least 4 characters.";
      }
    } else if (field === "email") {
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email format.";
      }
    } else if (field === "phone") {
      if (!value.trim()) {
        error = "Phone number is required.";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Phone number must be 10 digits.";
      }
    } else if (field === "role") {
      if (!value.trim()) {
        error = "User role is required.";
      }
    } else if (field === "status") {
      if (!value.trim()) {
        error = "Status is required.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const validateForm = () => {
    let isValid = true;

    // Validate all fields before saving
    Object.keys(formData).forEach((field) => {
      if (!formData[field].trim()) {
        validateField(field, formData[field]);
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Generate userId if not provided
      const newUser = {
        ...formData,
        userId: formData.userId || "generated-unique-id", // Use a unique id generator here
      };
      onSave(newUser);
      onClose(); // Close the modal after saving
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-1/3 p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-left">
          Add New Member
        </h2>
        <form className="space-y-4 text-left">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor={key}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                id={key}
                value={formData[key]}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring ${
                  errors[key] ? "border-red-500" : "focus:ring-orange-300"
                }`}
              />
              {errors[key] && (
                <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
              )}
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
