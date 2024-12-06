import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext"; 
import TopBar from "../../componnets/AdminCompo/TopBar";
import SideBar from "../../componnets/AdminCompo/SideBar";
import axios from "axios";

const UserProfile = () => {
  const { user, setUser, loading } = useContext(UserContext); // Access user data and update function
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [formData, setFormData] = useState(user || {}); // Local state to handle form data

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Save changes
  const handleSave = async () => {
    try {
      const { data } = await axios.put("/user/update-profile", formData); // Update API call
      setUser(data); // Update global user context
      setIsEditing(false); // Exit edit mode
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen">
        <SideBar />
        <div className="flex flex-col flex-1 justify-center items-center">
          <p className="text-lg text-gray-500">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen">
        <SideBar />
        <div className="flex flex-col flex-1 justify-center items-center">
          <p className="text-lg text-gray-500">No user data available. Please log in again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* TopBar */}
        <div className="p-4">
          <TopBar />
        </div>

        {/* User Details */}
        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-4 text-left text-gray-800">User Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-md shadow-md">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 text-left">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              ) : (
                <p className="p-2 border border-gray-300 rounded-md text-left">{user.name || "N/A"}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 text-left">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              ) : (
                <p className="p-2 border border-gray-300 rounded-md text-left">{user.email || "N/A"}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 text-left">Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              ) : (
                <p className="p-2 border border-gray-300 rounded-md text-left">{user.phone || "N/A"}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 text-left">Role</label>
              <p className="p-2 border border-gray-300 rounded-md text-left">{user.role || "N/A"}</p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 text-left">Status</label>
              <p className="p-2 border border-gray-300 rounded-md text-left">{user.status || "N/A"}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
