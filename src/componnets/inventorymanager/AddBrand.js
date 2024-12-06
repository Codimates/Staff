import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { FaEdit,FaSearch,FaPlus } from "react-icons/fa";

export default function AddBrand() {
    const [brands, setBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [newBrand, setNewBrand] = useState({ brandname: '', brandlogo: '' });
    const [editBrand, setEditBrand] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await axios.get('/inventory/brand/getallbrands');
            setBrands(response.data);
            setFilteredBrands(response.data);
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };

    const handleInputChange = (e) => {
        setNewBrand({ ...newBrand, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewBrand({ ...newBrand, brandlogo: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleCreateBrand = async () => {
        try {
            await axios.post('/inventory/brand/create', newBrand);
            setNewBrand({ brandname: '', brandlogo: '' });
            fetchBrands();
            setShowModal(false);
        } catch (error) {
            console.error("Error creating brand:", error);
        }
    };

    const handleEditBrand = (brand) => {
        setEditBrand(brand);
        setShowModal(true);
    };

    const handleUpdateBrand = async () => {
        try {
            await axios.put(`/inventory/brand/updatebrand/${editBrand._id}`, editBrand);
            setEditBrand(null);
            fetchBrands();
            setShowModal(false);
        } catch (error) {
            console.error("Error updating brand:", error);
        }
    };

    const handleDeleteBrand = async (brandId) => {
        try {
            await axios.delete(`/inventory/brand/deletebrand/${brandId}`);
            fetchBrands();
        } catch (error) {
            console.error("Error deleting brand:", error);
        }
    };

    const handleSearchChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredBrands(brands.filter(brand => brand.brandname.toLowerCase().includes(term)));
    };

    return (
        <div className="container p-4 mx-auto">
            <h2 className="mb-4 text-2xl font-bold">Brands</h2>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
  {/* Search Box */}
  <div className="relative flex items-center w-full sm:w-auto">
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search Products..."
      className="w-full sm:w-96 pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Button */}
  <div className="flex justify-end w-full sm:w-auto">
    <button
      onClick={() => setShowModal(true)}
      className="flex items-center px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
    >
        <div className='flex'>
            <FaPlus></FaPlus>
            <span>Add Brand</span>
       </div>
    </button>
  </div>
</div>


            {/* Brand List */}
            <table className="w-full border border-collapse border-gray-300 table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border border-gray-300">Brand Name</th>
                        <th className="p-2 border border-gray-300">Brand Logo</th>
                        <th className="p-2 border border-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBrands.map((brand) => (
                        <tr key={brand._id}>
                            <td className="p-2 border border-gray-300">{brand.brandname}</td>
                            <td className="p-2 border border-gray-300">
                                {brand.brandlogo && <img src={brand.brandlogo} alt={brand.brandname} className="w-16 h-16" />}
                            </td>
                            <td className="p-2 border border-gray-300">
                                <button onClick={() => handleEditBrand(brand)} className="px-4 py-2 text-green-500">
                                    <FaEdit className="text-lg" />
                                </button>
                                <button
                                    onClick={() => handleDeleteBrand(brand._id)}
                                    className="ml-2 text-red-500"
                                >
                                    <MdDelete className="text-lg" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-1/3 p-6 bg-white rounded shadow-lg">
                        <h3 className="mb-4 text-lg font-bold">{editBrand ? 'Edit Brand' : 'Add Brand'}</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                name="brandname"
                                placeholder="Brand Name"
                                value={editBrand ? editBrand.brandname : newBrand.brandname}
                                onChange={(e) =>
                                    editBrand
                                        ? setEditBrand({ ...editBrand, brandname: e.target.value })
                                        : handleInputChange(e)
                                }
                                className="p-2 border rounded"
                            />
                            <input
                                type="file"
                                onChange={(e) =>
                                    editBrand
                                        ? handleFileChange(e)
                                        : handleFileChange(e)
                                }
                                className="p-2 border rounded"
                            />
                            {editBrand?.brandlogo || newBrand.brandlogo ? (
                                <img
                                    src={editBrand?.brandlogo || newBrand.brandlogo}
                                    alt="Preview"
                                    className="w-32 h-32"
                                />
                            ) : null}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setEditBrand(null);
                                }}
                                className="px-4 py-2 mr-2 text-white bg-gray-500 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={editBrand ? handleUpdateBrand : handleCreateBrand}
                                className="px-4 py-2 text-white bg-blue-500 rounded"
                            >
                                {editBrand ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
