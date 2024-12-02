import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const InventoryManagement = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get('inventory/getalllaps');
        setInventoryItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch inventory items');
        setLoading(false);
      }
    };

    fetchInventoryItems();
  }, []);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Inventory Items</h2>
      <table className="w-full border border-collapse border-gray-300 table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Brand</th>
            <th className="p-2 border border-gray-300">Model</th>
            <th className="p-2 border border-gray-300">Price</th>
            <th className="p-2 border border-gray-300">Stock</th>
            <th className="p-2 border border-gray-300">Site</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item._id} className="text-center">
              <td className="p-2 border border-gray-300">{item.brand_name}</td>
              <td className="p-2 border border-gray-300">{item.model_name}</td>
              <td className="p-2 border border-gray-300">${item.price}</td>
              <td className="p-2 border border-gray-300">{item.stock_level}</td>
              <td className="p-2 border border-gray-300">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="px-2 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Add site
                </button>
              </td>
              <td className="flex justify-center p-2 border border-gray-300">
              
                <button
                  onClick={() => setSelectedItem(item)}
                  className="px-2 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="px-2 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="px-2 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-11/12 max-w-lg p-4 bg-white rounded-lg shadow-lg">
            <button
              onClick={closeModal}
              className="absolute text-2xl text-red-500 top-2 right-2 hover:text-red-600"
            >
              <FaTimes />
            </button>
            <div className="flex items-center justify-center mb-4">
              {selectedItem.images && selectedItem.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="p-2 text-blue-500 hover:text-blue-600"
                  >
                    <FaArrowLeft />
                  </button>
                  <div className="mx-2">
                    <img
                      src={selectedItem.images[currentImageIndex]}
                      alt={`Slide ${currentImageIndex + 1}`}
                      className="object-cover w-full h-48"
                    />
                  </div>
                  <button
                    onClick={handleNextImage}
                    className="p-2 text-blue-500 hover:text-blue-600"
                  >
                    <FaArrowRight />
                  </button>
                </>
              )}
              {selectedItem.images && selectedItem.images.length === 1 && (
                <img
                  src={selectedItem.images[0]}
                  alt={selectedItem.brand_name}
                  className="object-cover w-full h-48"
                />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold">{selectedItem.brand_name} {selectedItem.model_name}</h3>
              <p><strong>Price:</strong> ${selectedItem.price}</p>
              <p><strong>Stock Level:</strong> {selectedItem.stock_level}</p>
              <p><strong>RAM:</strong> {selectedItem.ram}</p>
              <p><strong>Processor:</strong> {selectedItem.processor}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
