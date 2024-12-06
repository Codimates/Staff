import React, { useState, useEffect } from "react";

const AddMemberModal = ({ showModal, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset form data when modal is closed or opened again
    if (!showModal) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
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
    if (field === "name") {
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
      onSave(formData);
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
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="name"
            >
              User Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring ${
                errors.name ? "border-red-500" : "focus:ring-orange-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring ${
                errors.email ? "border-red-500" : "focus:ring-orange-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring ${
                errors.phone ? "border-red-500" : "focus:ring-orange-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="role"
            >
              User Role
            </label>
            <input
              type="text"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring ${
                errors.role ? "border-red-500" : "focus:ring-orange-300"
              }`}
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>
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
