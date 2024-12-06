import React, { useState } from 'react';
import InventorymanagerNav from '../../componnets/inventorymanager/InventorymanagerNav';
import InventoryManagerHeadBar from '../../componnets/inventorymanager/InventoryManagerHeadBar';
import InventoryManagement from '../../componnets/inventorymanager/InventoryManagement';
import AddBrand from '../../componnets/inventorymanager/AddBrand';

export default function Inventory() {
  const [activeComponent, setActiveComponent] = useState('InventoryManagement');

  return (
    <div>
      <div className='flex'>
        <div>
          <InventorymanagerNav />
        </div>
        <div className='w-screen'>
          <div className='flex justify-between pt-8 pb-8 pl-5'>
            <div>
              <h1 className='text-4xl'>Inventory</h1>
            </div>

            <div className='mr-5'>
              <InventoryManagerHeadBar />
            </div>
          </div>
          <div className=''>
            {/* Buttons to toggle components */}
            <div className='flex justify-start pl-12 mb-4 space-x-4'>
            

            <div className="bg-gray-100 rounded-lg p-1 flex ">
                <button 
                  className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg  sm:text-base transition-colors text-xl   ${
                    activeComponent === 'InventoryManagement' ? 'bg-[#19191A] text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveComponent('InventoryManagement')}
                >
                   Show Inventory Management
                </button>
                <button 
                  className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg text-xl sm:text-base transition-colors ${
                    activeComponent === 'AddBrand' ? 'bg-[#19191A] text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveComponent('AddBrand')}
                >
                    Show Brand Management
                </button>
              </div>

              
            </div>

            {/* Scrollable container for components */}
            <div className='h-[80vh] overflow-y-auto border  p-4'>
              {activeComponent === 'InventoryManagement' && <InventoryManagement />}
              {activeComponent === 'AddBrand' && <AddBrand />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
