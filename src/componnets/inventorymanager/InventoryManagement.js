import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from "react-icons/fa";

const InventoryManagement = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newInventory, setNewInventory] = useState({
    brand_name: '',
    model_name: '',
    stock_level: '',
    price: '',
    ram: '',
    processor: '',
    graphics_card: '',
    special_offer: '',
    images: null, // File input for images
  });
  const [createError, setCreateError] = useState('');

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get('/inventory/getalllaps');
        setInventoryItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch inventory items');
        setLoading(false);
      }
    };

    fetchInventoryItems();
  }, []);

  

  const toggleAddSite = async (item) => {
    try {
      const updatedItem = { ...item, addsite: !item.addsite };
      await axios.put(`/inventory/addsite/${item._id}`, updatedItem);
      setInventoryItems((prevItems) =>
        prevItems.map((invItem) =>
          invItem._id === item._id ? { ...invItem, addsite: !invItem.addsite } : invItem
        )
      );
    } catch (err) {
      console.error('Failed to update item:', err);
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0); // Reset to the first image
  };

  const handlePrevImage = () => {
    if (selectedItem?.images?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedItem.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedItem?.images?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedItem.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const getStockColor = (stockLevel) => {
    if (stockLevel <= 5) return 'bg-red-200 text-red-800';
    if (stockLevel <= 10) return 'bg-yellow-200 text-yellow-800';
    return 'bg-green-200 text-green-800';
  };

  const handleCreateInventory = async (e) => {
    e.preventDefault();

    if (!newInventory.images || newInventory.images.length < 1 || newInventory.images.length > 3) {
      setCreateError('You must upload 1 to 3 images.');
      return;
    }

    try {
      const formData = new FormData();
      for (const key in newInventory) {
        if (key === 'images') {
          Array.from(newInventory.images).forEach((file) => formData.append('images', file));
        } else {
          formData.append(key, newInventory[key]);
        }
      }

      const response = await axios.post('/inventory/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setInventoryItems((prev) => [...prev, response.data.inventory]);
      setNewInventory({
        brand_name: '',
        model_name: '',
        stock_level: '',
        price: '',
        ram: '',
        processor: '',
        graphics_card: '',
        special_offer: '',
        images: null,
      });
      setShowCreateForm(false);
      setCreateError('');
    } catch (err) {
      setCreateError('Failed to create inventory item.');
    }
  };

  const handleDeleteInventory = async (inventoryId) => {
    try {
      await axios.delete(`/inventory/deleteinventory/${inventoryId}`);
      setInventoryItems((prevItems) => prevItems.filter((item) => item._id !== inventoryId));
    } catch (err) {
      console.error('Failed to delete inventory item:', err);
    }
  };
  const [originalInventoryItems, setOriginalInventoryItems] = useState([]);

useEffect(() => {
    const fetchInventoryItems = async () => {
        try {
            const response = await axios.get('/inventory/getalllaps');
            setInventoryItems(response.data);
            setOriginalInventoryItems(response.data); // Store original items
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch inventory items');
            setLoading(false);
        }
    };

    fetchInventoryItems();
}, []);

const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
        // If search is empty, reset to original items
        setInventoryItems(originalInventoryItems);
    } else {
        // Filter items
        const filtered = originalInventoryItems.filter(
            item => 
                item.brand_name.toLowerCase().includes(term) || 
                item.model_name.toLowerCase().includes(term)
        );
        setInventoryItems(filtered);
    }
};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Inventory Items</h2>
       {/* Search Box */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search brands..."
                    className="w-full p-2 border rounded"
                />
            </div>
      <div className='flex justify-end'>
          <button
            onClick={() => setShowCreateForm((prev) => !prev)}
            className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
          >
            {showCreateForm ? 'Cancel' : 'Create New Inventory'}
          </button>
      </div>
      
      
      {showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleCreateInventory} className="p-4 mb-4 bg-gray-100 rounded">
          <h3 className="mb-4 text-lg font-bold">Create New Inventory Item</h3>
          {createError && <p className="mb-4 text-red-500">{createError}</p>}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Brand Name"
              value={newInventory.brand_name}
              onChange={(e) => setNewInventory({ ...newInventory, brand_name: e.target.value })}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Model Name"
              value={newInventory.model_name}
              onChange={(e) => setNewInventory({ ...newInventory, model_name: e.target.value })}
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Stock Level"
              value={newInventory.stock_level}
              onChange={(e) => setNewInventory({ ...newInventory, stock_level: e.target.value })}
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={newInventory.price}
              onChange={(e) => setNewInventory({ ...newInventory, price: e.target.value })}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="RAM"
              value={newInventory.ram}
              onChange={(e) => setNewInventory({ ...newInventory, ram: e.target.value })}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Processor"
              value={newInventory.processor}
              onChange={(e) => setNewInventory({ ...newInventory, processor: e.target.value })}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Graphics Card"
              value={newInventory.graphics_card}
              onChange={(e) => setNewInventory({ ...newInventory, graphics_card: e.target.value })}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="special offer"
              value={newInventory.special_offer}
              onChange={(e) => setNewInventory({ ...newInventory, special_offer: e.target.value })}
              required
              className="p-2 border rounded"
            />
            
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setNewInventory({ ...newInventory, images: e.target.files })}
              required
              className="col-span-2"
            />
          </div>
          <button
                                onClick={() => {
                                    setShowCreateForm(false);
                                    
                                }}
                                className="px-4 py-2 mr-2 text-white bg-gray-500 rounded"
                            >
                                Cancel
                            </button>
          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-green-500 rounded"
          >
            Submit
          </button>
        </form>
        </div>
        
      )}
      
      <table className="w-full border border-collapse border-gray-300 table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Inventory Id</th>
            <th className="p-2 border border-gray-300">Brand</th>
            <th className="p-2 border border-gray-300">Model</th>
            <th className="p-2 border border-gray-300">RAM</th>
            <th className="p-2 border border-gray-300">Graphic Card</th>
            <th className="p-2 border border-gray-300">Price</th>
            <th className="p-2 border border-gray-300">Stock</th>
            <th className="p-2 border border-gray-300">Add to Site</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item._id}>
              <td className="p-2 border border-gray-300">{item.inventory_id}</td>
              <td className="p-2 border border-gray-300">{item.brand_name}</td>
              <td className="p-2 border border-gray-300">{item.model_name}</td>
              <td className="p-2 border border-gray-300">{item.ram}</td>
              <td className="p-2 border border-gray-300">{item.graphics_card}</td>
              <td className="p-2 border border-gray-300">{item.price}</td>
              <td className="p-2 border border-gray-300">
                <span className={`px-2 py-1 rounded ${getStockColor(item.stock_level)}`}>
                  {item.stock_level}
                </span>
              </td>
              <td className="p-2 border border-gray-300">
                <input
                  type="checkbox"
                  checked={item.addsite}
                  onChange={() => toggleAddSite(item)}
                  className="form-checkbox"
                />
              </td>
              <td className="p-2 border border-gray-300">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="px-4 py-2 text-blue-500 "
                >
                  <IoEyeOutline className="text-lg" />
                </button>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="px-4 py-2 text-green-500 "
                >
                  <FaEdit className="text-lg" />
                </button>
                <button
                  onClick={() => handleDeleteInventory(item._id)}
                  className="ml-2 text-red-500"
                >
                  <MdDelete className="text-lg" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItem && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{selectedItem.brand_name} {selectedItem.model_name}</h3>
              <button onClick={closeModal} className="text-red-500">
                <FaTimes />
              </button>
            </div>
            <div className="relative">
              <img
                src={selectedItem.images[currentImageIndex]}
                alt="inventory"
                className="w-[300px] h-auto rounde"
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-between">
                <button
                  onClick={handlePrevImage}
                  className="p-2 text-white bg-black bg-opacity-50"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={handleNextImage}
                  className="p-2 text-white bg-black bg-opacity-50"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
