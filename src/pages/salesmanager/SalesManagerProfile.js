import React from 'react'
import SalesManagerNav from '../../componnets/SalesManager/SalesManagerNav'
import SalesManagerHeadBar from '../../componnets/SalesManager/SalesManagerHeadBar'




export default function SalesManagerProfile() {
 
  return (

    <div>
      <div className='flex '>
        <div>
          <SalesManagerNav/>
        </div>
        <div className='w-screen'>
          
          <div className='flex justify-between pt-8 pb-8 pl-5'>
                <div className=''>
                  <h1 className='text-4xl font-semibold'>Profile Setting</h1>
                </div>
                
                <div className='mr-5'>
                  <SalesManagerHeadBar/>
                </div>
          </div>
          <div >

            
           
            <div>
            
            </div>
          </div>
        </div>
      </div>
    </div>



    
    
  )
}



