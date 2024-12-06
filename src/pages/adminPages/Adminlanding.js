import React from "react";
import SalesBarChart from "../../componnets/AdminCompo/SalesBarChart";
import SalesPieChart from "../../componnets/AdminCompo/SalesPieChart";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import TopBar from "../../componnets/AdminCompo/TopBar";
import SideBar from "../../componnets/AdminCompo/SideBar";
import { GrMoney } from "react-icons/gr";
import { IoPeopleOutline } from "react-icons/io5";

export default function AdminLanding() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* TopBar */}
        <div className="flex justify-end  p-4">
          <TopBar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
        <h1 className="text-xl font-semibold text-gray-800 text-left">Dashboard</h1>
        
          {/* Top Cards Section */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-600">
                Total Revenue
              </h3>
              <div>
                <GrMoney className="text-4xl font-bold text-orange-600 ml-8" />
                <p className="text-gray-700 mt-2 text-gray-600">Rs.856,750.00</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-600">
                Total Sales
              </h3>
              <div>
                <AiOutlineDeliveredProcedure className="text-4xl font-bold text-orange-600 ml-8" />
                <p className="text-gray-700 mt-2 text-gray-600">1435</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-600">
                Total Users
              </h3>
              <div>
                <IoPeopleOutline className="text-4xl font-bold text-orange-600 ml-8" />
                <p className="text-gray-700 mt-2 text-gray-600">250</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="flex flex-row gap-x-10 h-[400px]">
            <div className="flex-[0.7] bg-white shadow-lg rounded-lg">
              <SalesBarChart />
            </div>
            <div className="flex-[0.25] bg-white shadow-lg rounded-lg">
              <SalesPieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
