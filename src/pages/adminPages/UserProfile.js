import React from "react";
import AdminProfileUpdate from "../../componnets/AdminCompo/AdminProfileUpdate";
import SideBar from "../../componnets/AdminCompo/SideBar";
import TopBar from "../../componnets/AdminCompo/TopBar";

export default function Profile() {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div>
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col">
        {/* Top Bar */}
        <div className="h-16 w-full bg-white  flex items-center px-5">
          <TopBar />
        </div>

        <div className="flex flex-col justify-center items-center flex-grow px-5">
          <div className="w-full max-w-screen-md">
            <AdminProfileUpdate />
          </div>
        </div>
      </div>
    </div>
  );
}
