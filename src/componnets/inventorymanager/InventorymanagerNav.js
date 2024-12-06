import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard, MdMenu, MdClose } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { MdOutlineInventory } from 'react-icons/md';
import { UserContext } from '../../context/UserContext';

export default function InventoryManagerNav() {
    const [activeItem, setActiveItem] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useContext(UserContext);
    const location = useLocation();

    useEffect(() => {
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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const NavItems = () => (
        <ul className="w-full">
            <Link to="/inventorymanagerdash" onClick={() => setIsMobileMenuOpen(false)}>
                <li>
                    <div className={`flex items-center py-3 pl-4 md:pl-8 transition-all ${
                        activeItem === 1
                            ? 'bg-gray-300 text-black'
                            : 'text-black hover:bg-gray-200 hover:text-black'
                    }`}>
                        <div className="mr-4 md:mr-8">
                            <MdDashboard size={20} className="text-black" />
                        </div>
                        <div>
                            <span className="text-base md:text-lg text-black">
                                Dashboard
                            </span>
                        </div>
                    </div>
                </li>
            </Link>
            <Link to="/inventory" className="no-underline" onClick={() => setIsMobileMenuOpen(false)}>
                <li>
                    <div className={`flex items-center py-3 pl-4 md:pl-8 transition-all ${
                        activeItem === 2
                            ? 'bg-gray-300 text-black'
                            : 'text-black hover:bg-gray-200 hover:text-black'
                    }`}>
                        <div className="mr-4 md:mr-8">
                            <MdOutlineInventory size={20} className="text-black" />
                        </div>
                        <div>
                            <span className="text-base md:text-lg text-black">
                                Inventory
                            </span>
                        </div>
                    </div>
                </li>
            </Link>
            <Link to="/my-profile" className="no-underline" onClick={() => setIsMobileMenuOpen(false)}>
                <li>
                    <div className={`flex items-center py-3 pl-4 md:pl-8 transition-all ${
                        activeItem === 3
                            ? 'bg-gray-300 text-black'
                            : 'text-black hover:bg-gray-200 hover:text-black'
                    }`}>
                        <div className="mr-4 md:mr-8">
                            <FaUserEdit size={20} className="text-black" />
                        </div>
                        <div>
                            <span className="text-base md:text-lg text-black">
                                Profile Settings
                            </span>
                        </div>
                    </div>
                </li>
            </Link>
        </ul>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-200 md:hidden"
                onClick={toggleMobileMenu}
            >
                {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>

            {/* Sidebar Container */}
            <div className={`
                fixed md:static
                inset-y-0 left-0
                w-64 md:w-72 lg:w-80
                transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                transition-transform duration-300 ease-in-out
                flex flex-col
                border-r-2 bg-gray-100
                h-screen
                z-40
            `}>
                <div className="flex-grow pt-16 md:pt-8">
                    <div className="flex flex-col items-center pb-8">
                        <div className="w-32 md:w-40 lg:w-48 aspect-square overflow-hidden rounded-full border-2">
                            <img 
                                src={user.image} 
                                alt="user" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h1 className="pt-2 text-base md:text-lg font-bold">
                            {user.fname} {user.lname}
                        </h1>
                    </div>
                    
                    <nav className="flex-grow">
                        <NavItems />
                    </nav>
                </div>

                <div className="p-4 md:p-6">
                    <button 
                        onClick={logout} 
                        className="w-full py-2 md:py-3 text-white bg-black rounded-lg text-sm md:text-base
                            hover:bg-gray-800 transition-colors duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleMobileMenu}
                />
            )}
        </>
    );
}