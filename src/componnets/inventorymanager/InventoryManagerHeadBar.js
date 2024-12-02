import React, {   useContext  } from 'react'
import { UserContext } from '../../context/UserContext';


export default function InventoryManagerHeadBar() {
    const { user } = useContext(UserContext);
    
  return (
    <div className='flex'>
      <div className='flex items-center mr-4'>
        
      </div>
      <div 
      className="relative flex items-center justify-between px-2  bg-neutral-700 h-[60px] rounded-3xl w-[180px]" 
        >
      
      
        <img src={user.image} alt='profilepic' className='h-[46px] w-[46px] rounded-full'/>
      

      <p className='flex flex-col mb-2 mr-2'>
        <span className='text-sm font-bold text-neutral-200 text-start'>{user.fname}</span>
        <span className='text-xs font-bold text-neutral-500'>{user.role}</span>
      </p>

    </div>
    </div>
    
  )
}
