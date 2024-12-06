import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function InventoryManagerHeadBar() {
    const { user } = useContext(UserContext);

    return (
        <div className="flex justify-end p-2 sm:p-3 md:p-4">
            <div className="flex items-center">
                <div 
                    className="relative flex items-center justify-between px-2 sm:px-3 md:px-4 
                        bg-neutral-700 h-[40px] sm:h-[50px] md:h-[60px] 
                        rounded-2xl sm:rounded-3xl
                        w-[140px] sm:w-[160px] md:w-[180px]
                        transition-all duration-300"
                >
                    <img 
                        src={user.image} 
                        alt={`${user.fname}'s profile`}
                        className="h-[30px] w-[30px] sm:h-[38px] sm:w-[38px] md:h-[46px] md:w-[46px] 
                            rounded-full object-cover"
                    />
                    
                    <div className="flex flex-col mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm text-neutral-200 font-bold text-start truncate max-w-[80px] sm:max-w-[90px] md:max-w-[100px]">
                            {user.fname}
                        </span>
                        <span className="text-[10px] sm:text-xs text-neutral-500 font-bold truncate max-w-[80px] sm:max-w-[90px] md:max-w-[100px]">
                            {user.role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}