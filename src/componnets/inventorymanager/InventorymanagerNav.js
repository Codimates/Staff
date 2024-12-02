import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MdDashboard } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { MdOutlineInventory } from 'react-icons/md';
import { UserContext } from '../../context/UserContext';

export default function InventorymanagerNav() {
    const [activeItem, setActiveItem] = useState(null);
    const { user, logout } = useContext(UserContext);

    const location = useLocation();

    useEffect(() => {
        // Update active item based on current route
        switch (location.pathname) {
            case '/inventorymanagerdash':
                setActiveItem(1);
                break;
            case '/inventory':
                setActiveItem(2);
                break;
            case '/my-profile':
                setActiveItem(3);
                break;
            default:
                setActiveItem(null);
        }
    }, [location.pathname]);

    return (
        <div className='h-screen flex flex-col border-r-2 lg:w-[320px] sm:w-fit md:w-72 w-fit bg-gray-100'>
            <div className='flex-grow pt-[60px]'>
                <div className=' justify-center pb-[60px]'>
                    <div className='flex justify-center'>
                       <img src={user.image} alt='user' className='border-2 rounded-full w-[250px]'></img> 
                    </div>
                    
                <h1 className='pt-2'><strong><span className='pr-1'>{user.fname}</span>{user.lname}</strong></h1>
                </div>
                
                    
                
                <nav className='flex-grow'>
                    <ul className='text-left'>
                        <Link to='/inventorymanagerdash'>
                            <li>
                                <div
                                    className={`flex items-center py-3 pl-8 transition-all ${
                                        activeItem === 1
                                            ? 'bg-gray-300 text-black'
                                            : 'text-black hover:bg-gray-200 hover:text-black'
                                    }`}
                                >
                                    <div className='mr-8'>
                                        <MdDashboard
                                            size={20}
                                            className='text-black'
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{ fontSize: '18px' }}
                                            className='text-black'
                                        >
                                            Dashboard
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/inventory' className='no-underline'>
                            <li>
                                <div
                                    className={`flex items-center py-3 pl-8 transition-all ${
                                        activeItem === 2
                                            ? 'bg-gray-300 text-black'
                                            : 'text-black hover:bg-gray-200 hover:text-black'
                                    }`}
                                >
                                    <div className='mr-8'>
                                        <MdOutlineInventory
                                            size={20}
                                            className='text-black'
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{ fontSize: '18px' }}
                                            className='text-black'
                                        >
                                            Inventory
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/my-profile' className='no-underline'>
                            <li>
                                <div
                                    className={`flex items-center py-3 pl-8 transition-all ${
                                        activeItem === 3
                                            ? 'bg-gray-300 text-black'
                                            : 'text-black hover:bg-gray-200 hover:text-black'
                                    }`}
                                >
                                    <div className='mr-8'>
                                        <FaUserEdit
                                            size={20}
                                            className='text-black'
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{ fontSize: '18px' }}
                                            className='text-black'
                                        >
                                            Profile Settings
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </nav>
            </div>
            <div className='flex justify-center pb-6'>
                <button 
                    onClick={logout} 
                    className='w-[200px] py-3 text-white bg-black rounded-lg'
                >
                    Logout
                </button>
            </div>
        </div>
    );
}