import React, { useState } from "react";
import TopBar from "../../componnets/AdminCompo/TopBar";
import SideBar from "../../componnets/AdminCompo/SideBar";
import { IoMdPersonAdd } from "react-icons/io";
import UserDetailsModal from "../../componnets/AdminCompo/UserDetailsModal";
import AddMemberModal from "../../componnets/AdminCompo/AddMemberModal";

const Users = () => {
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([
    {
      id: "001",
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "0761234563",
      role: "Admin",
      status: "Active",
    },
    {
      id: "002",
      name: "Jane Smith",
      email: "janesmith@gmail.com",
      phone: "0761234563",
      role: "User",
      status: "Active",
    },
    {
      id: "003",
      name: "Robert Brown",
      email: "robertbrown@gmail.com",
      phone: "0761234563",
      role: "Moderator",
      status: "Active",
    },
  ]);

  const handleEdit = (updatedUser) => {
    // Update the users state with the modified user details
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    console.log(`User ${userId} deleted!`);
  };

  const handleAddMember = (newMemberData) => {
    setUsers((prevUsers) => [...prevUsers, newMemberData]);
    console.log("New member added:", newMemberData);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* TopBar */}
        <div className="flex justify-end p-4">
          <TopBar />
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-gray-800">All Users</h1>
            <button
              onClick={() => setShowAddMemberModal(true)}
              className="bg-orange-600 text-white px-5 py-2 rounded shadow hover:bg-orange-700 transition duration-200 flex items-center"
            >
              <IoMdPersonAdd className="mr-2" />
              <span className="font-semibold">Add Member</span>
            </button>
          </div>

          {/* Users List */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-6 gap-4 py-2 font-semibold text-gray-600">
              <div>User ID</div>
              <div>Name</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Role</div>
              <div>Status</div>
            </div>
            <hr className="mb-4" />

            {users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-6 gap-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition duration-150 cursor-pointer"
                onClick={() => {
                  setSelectedUser(user);
                  setShowUserDetailsModal(true);
                }}
              >
                <div>{user.id}</div>
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.phone}</div>
                <div>{user.role}</div>
                <div
                  className={
                    user.status === "Active"
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {user.status}
                </div>
              </div>
            ))}
          </div>

          {/* Add Member Modal */}
          <AddMemberModal
            showModal={showAddMemberModal}
            onClose={() => setShowAddMemberModal(false)}
            onSave={handleAddMember}
          />

          {/* User Details Modal */}
          <UserDetailsModal
            showModal={showUserDetailsModal}
            onClose={() => setShowUserDetailsModal(false)}
            user={selectedUser}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
