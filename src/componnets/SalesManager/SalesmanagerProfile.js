import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { toast } from 'react-hot-toast'
import { FaCamera, FaSave } from 'react-icons/fa'


export default function UpdateProfile({isOpen, onclose}) {
    
    // Get user context
    const { user, setUser } = useContext(UserContext);

    // State for form fields
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [address, setAddress] = useState('');

    // Populate form with existing user data when component mounts
    useEffect(() => {
        if (user) {
            setFname(user.fname || '');
            setLname(user.lname || '');
            setEmail(user.email || '');
            setPhoneNumber(user.phone_number || '');
            setPreviewImage(user.image || '');
            setAddress(user.address || '');
        }
    }, [user]);

    // Handle image file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (e.g., max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }

            // Convert image to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Trigger hidden file input
    const triggerFileInput = () => {
        document.getElementById('profile-image-input').click();
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Prepare update payload
            const updatePayload = {
                fname,
                lname,
                email,
                phone_number: phoneNumber,
                image: profileImage || previewImage,
                address
            };

            // Send update request
            const response = await axios.put(
                `user/updateuser/${user._id}`, 
                updatePayload, 
                { 
                    withCredentials: true 
                }
            );

            // Update context with new user data
            setUser(response.data.data);

            // Show success toast
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Update failed', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container flex justify-center px-4 py-8 mx-auto">
            
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6 w-[600px]">
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative group">
                        <img 
                            src={previewImage || '/default-avatar.png'} 
                            alt="Profile" 
                            className="object-cover w-40 h-40 transition-opacity duration-300 border-4 border-white rounded-full shadow-lg group-hover:opacity-70"
                        />
                        <label 
                          htmlFor="imageUpload" 
                          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 cursor-pointer group-hover:opacity-100"
                        ></label>

                        
                        <input 
                            type="file" 
                            id="profile-image-input"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            className="absolute bottom-0 right-0 bg-[#19191A] text-white rounded-full p-2 hover:bg-opacity-80 transition"
                        >
                            <FaCamera className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* First Name */}
                <div className="grid grid-cols-2 gap-4 ">
                  
                  <div className=''>
                    <label className="block mb-2 text-sm font-medium text-left text-gray-700">First Name</label>
                    <input 
                        type="text" 
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Last Name */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-left text-gray-700">Last Name</label>
                    <input 
                        type="text" 
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      
                    />
                </div></div>

                {/* Email */}
                <div className="space-y-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Phone Number</label>
                    <input 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-[#19191A]/30"
                        required
                    />
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Address</label>
                    <input 
                        type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-[#19191A]/30"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full p-2 text-white transition bg-[#19191A] rounded hover:bg-opacity-90 flex items-center justify-center"
                >
                    <FaSave className="mr-2" />
                    Update Profile
                </button>
            </form>
        </div>
    )
}