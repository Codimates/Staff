import React from 'react'
import InventorymanagerNav from '../../componnets/inventorymanager/InventorymanagerNav'
import InventoryManagerHeadBar from '../../componnets/inventorymanager/InventoryManagerHeadBar'
import InventoryManagement from '../../componnets/inventorymanager/InventoryManagement'



export default function Inventory() {
 
  return (

    <div>
      <div className='flex '>
        <div>
          <InventorymanagerNav/>
        </div>
        <div className='w-screen'>
          
          <div className='flex justify-between pt-8 pb-8 pl-5'>
                <div className=''>
                  <h1 className='text-4xl'>Inventory</h1>
                </div>
                
                <div className='mr-5'>
                  <InventoryManagerHeadBar/>
                </div>
          </div>
          <div >

            
           
            <div>
             <InventoryManagement/>
            </div>
          </div>
        </div>
      </div>
    </div>



    
    
  )
}


