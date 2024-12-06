import React from 'react'
import InventorymanagerNav from '../../componnets/inventorymanager/InventorymanagerNav'
import InventoryManagerHeadBar from '../../componnets/inventorymanager/InventoryManagerHeadBar'
import InventoryManagerProfileSettings from '../../componnets/inventorymanager/InventoryManagerProfileSettings'



export default function Profile() {
 
  return (

    <div>
      <div className='h-screen flex '>
        <div className='fixed left-0 top-0 h-full'>
          <InventorymanagerNav/>
        </div>
        <div className='w-screen'>
          
          <div className='flex-1 ml-60 md:ml-80 mt-24 md:mt-36 '>
                <div className='fixed flex  justify-between top-0 right-0 md:left-80 bg-white z-10 border-b'>
                  <div className="  items-center px-5 py-8">
                    <div> <h1 className='text-4xl'>Profile Settings</h1></div>
                  </div>
                 
                
                
                <div className='mr-5'>
                  <InventoryManagerHeadBar/>
                </div></div>
          </div>
          <div className='pt-[header-height] overflow-y-auto'>
            <div className='p-5'>
            <h1><InventoryManagerProfileSettings/></h1>
            </div>
          </div>
        </div>
      </div>
    </div>



    
    
  )
}


