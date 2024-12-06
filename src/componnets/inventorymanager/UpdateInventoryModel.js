import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTimes, FaTrash } from 'react-icons/fa';

const UpdateInventoryModal = ({ item, onClose, onUpdateSuccess }) => {
  const [updatedItem, setUpdatedItem] = useState({
    brand_name: '',
    model_name: '',
    stock_level: '',
    price: '',
    ram: '',
    processor: '',
    graphics_card: '',
    special_offer: false,
    existingImages: [],
    newImages: [],
    imagesToDelete: []
  });

  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (item) {
      setUpdatedItem({
        brand_name: item.brand_name,
        model_name: item.model_name,
        stock_level: item.stock_level,
        price: item.price,
        ram: item.ram,
        processor: item.processor,
        graphics_card: item.graphics_card,
        special_offer: item.special_offer || false,
        existingImages: item.images || [],
        newImages: [],
        imagesToDelete: []
      });

      setPreviewImages(item.images || []);
    }
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedItem((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const totalImagesAfterUpload =
      updatedItem.existingImages.length -
      updatedItem.imagesToDelete.length +
      updatedItem.newImages.length +
      files.length;

    if (totalImagesAfterUpload > 3) {
      toast.error('Maximum 3 images allowed');
      return;
    }

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));

    setUpdatedItem((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...files]
    }));
    setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
  };

  const handleRemoveImage = (indexToRemove, isExisting = false) => {
    if (isExisting) {
      const imageToDelete = updatedItem.existingImages[indexToRemove];
      setUpdatedItem((prev) => ({
        ...prev,
        imagesToDelete: [...prev.imagesToDelete, imageToDelete],
        existingImages: prev.existingImages.filter(
          (_, index) => index !== indexToRemove
        )
      }));
    } else {
      setUpdatedItem((prev) => ({
        ...prev,
        newImages: prev.newImages.filter((_, index) => index !== indexToRemove)
      }));
    }
    setPreviewImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
  
      // Append all text fields
      formData.append('brand_name', updatedItem.brand_name);
      formData.append('model_name', updatedItem.model_name);
      formData.append('stock_level', updatedItem.stock_level);
      formData.append('price', updatedItem.price);
      formData.append('ram', updatedItem.ram);
      formData.append('processor', updatedItem.processor);
      formData.append('graphics_card', updatedItem.graphics_card);
      formData.append('special_offer', updatedItem.special_offer);
  
      // Stringify existing images and images to delete
      formData.append('existingImages', JSON.stringify(updatedItem.existingImages));
      formData.append('imagesToDelete', JSON.stringify(updatedItem.imagesToDelete));
  
      // Append new image files
      updatedItem.newImages.forEach((file) => {
        formData.append('images', file);
      });
  
      const response = await axios.put(
        `/inventory/updateinventory/${item._id}`, 
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
  
      toast.success('Inventory updated successfully!');
      onUpdateSuccess(response.data.inventory);
      onClose();
    } catch (error) {
      toast.error('Failed to update inventory item.');
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Update Inventory Item</h3>
          <button
            onClick={onClose}
            className="text-red-500 transition-colors hover:text-red-700"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="brand_name"
              value={updatedItem.brand_name}
              onChange={handleInputChange}
              placeholder="Brand Name"
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="model_name"
              value={updatedItem.model_name}
              onChange={handleInputChange}
              placeholder="Model Name"
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="stock_level"
              value={updatedItem.stock_level}
              onChange={handleInputChange}
              placeholder="Stock Level"
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="price"
              value={updatedItem.price}
              onChange={handleInputChange}
              placeholder="Price"
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="ram"
              value={updatedItem.ram}
              onChange={handleInputChange}
              placeholder="RAM"
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="processor"
              value={updatedItem.processor}
              onChange={handleInputChange}
              placeholder="Processor"
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="graphics_card"
              value={updatedItem.graphics_card}
              onChange={handleInputChange}
              placeholder="Graphics Card"
              required
              className="p-2 border rounded"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                name="special_offer"
                checked={updatedItem.special_offer}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label>Special Offer</label>
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Images (Max 3)
            </label>
            <div className="flex flex-wrap gap-2">
              {previewImages.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
                    alt={`Preview ${index}`}
                    className="object-cover w-24 h-24 rounded"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveImage(
                        index,
                        index < updatedItem.existingImages.length
                      )
                    }
                    className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              ))}

              {previewImages.length < 3 && (
                <label className="cursor-pointer">
                  <div className="flex items-center justify-center w-24 h-24 border-2 border-gray-300 border-dashed rounded">
                    +
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-500 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInventoryModal;