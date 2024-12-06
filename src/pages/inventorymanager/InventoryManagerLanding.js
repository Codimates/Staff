import React from 'react';
import InventorymanagerNav from '../../componnets/inventorymanager/InventorymanagerNav';
import InventoryManagerHeadBar from '../../componnets/inventorymanager/InventoryManagerHeadBar';
import DashboardComponents from '../../componnets/inventorymanager/DashboardComponents';

export default function InventorymanagerLanding() {
  return (
    <div className="h-screen flex">
      {/* Fixed Navigation Sidebar */}
      <div className="fixed left-0 top-0 h-full">
        <InventorymanagerNav />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-60 md:ml-80 mt-24 md:mt-36"> {/* Replace width-of-nav with your nav's width, e.g., ml-64 */}
        {/* Fixed Header */}
        <div className="fixed top-0 right-0 md:left-80 bg-white z-10 border-b">
          <div className="flex justify-between items-center px-5 py-8">
            <div>
              <h1 className="text-4xl">Dashboard</h1>
            </div>
            <div className="mr-5">
              <InventoryManagerHeadBar />
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="pt-[header-height] overflow-y-auto"> {/* Replace header-height with your header's height, e.g., pt-28 */}
          <div className="p-5">
            <DashboardComponents />
          </div>
        </div>
      </div>
    </div>
  );
}