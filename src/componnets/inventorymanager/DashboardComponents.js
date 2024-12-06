import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardComponent = () => {
  const [productStats, setProductStats] = useState({
    totalProducts: 0,
    totalBrands: 0,
    newProducts: [],
    newBrands: [],
    lowStockProducts: []
  });

  
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const inventoryResponse = await axios.get('/inventory/getalllaps');
        const brandResponse = await axios.get('/inventory/brand/getallbrands');
        
        const inventoryData = inventoryResponse.data;
        const brandData = brandResponse.data;

        setProductStats({
          totalProducts: inventoryData.length,
          totalBrands: brandData.length,
          newProducts: inventoryData
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5),
          newBrands: brandData
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5),
          lowStockProducts: inventoryData.filter(product => product.stock_level <= 10)
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {/* Total Products Card */}
          <div className="bg-white p-4 rounded-lg shadow-md shadow-[#19191A] h-32 sm:h-40 flex flex-col justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">Total Products</h2>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{productStats.totalProducts}</p>
          </div>

          {/* Total Brands Card */}
          <div className="bg-white p-4 rounded-lg shadow-md shadow-[#19191A] h-32 sm:h-40 flex flex-col justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">Total Brands</h2>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{productStats.totalBrands}</p>
          </div>

          {/* New Products/Brands Card */}
          <div className="bg-white p-4 rounded-lg shadow-md shadow-[#19191A] col-span-1 sm:col-span-2">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full p-1 flex">
                <button 
                  className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base transition-colors ${
                    activeTab === 'products' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('products')}
                >
                  New Products
                </button>
                <button 
                  className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base transition-colors ${
                    activeTab === 'brands' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('brands')}
                >
                  New Brands
                </button>
              </div>
            </div>

            <div className="max-h-48 sm:max-h-64 overflow-auto">
              {activeTab === 'products' ? (
                <ul className="space-y-1">
                  {productStats.newProducts.map(product => (
                    <li 
                      key={product._id} 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="text-sm sm:text-base font-medium text-gray-700">
                        {product.brand_name} {product.model_name}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500">New</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-1">
                  {productStats.newBrands.map(brand => (
                    <li 
                      key={brand._id} 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="text-sm sm:text-base font-medium text-gray-700">
                        {brand.brandname}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500">New</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Low Stock Products Card */}
          <div className="bg-white p-4 rounded-lg shadow-md shadow-[#19191A] col-span-1 sm:col-span-2 lg:col-span-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Low Stock Products
            </h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 text-sm sm:text-base">
                    <th className="p-2 whitespace-nowrap">Inventory Id</th>
                    <th className="p-2 whitespace-nowrap">Product Id</th>
                    <th className="p-2 whitespace-nowrap">Product</th>
                    <th className="p-2 whitespace-nowrap">Stock Level</th>
                    <th className="p-2 whitespace-nowrap">Add Site</th>
                  </tr>
                </thead>
                <tbody>
                  {productStats.lowStockProducts.map(product => (
                    <tr 
                      key={product._id} 
                      className={`border-b text-sm sm:text-base ${product.stock_level <= 5 ? 'bg-red-100' : ''}`}
                    >
                      <td className="p-2 text-center whitespace-nowrap">{product.inventory_id}</td>
                      <td className="p-2 text-center whitespace-nowrap">{product.product_id}</td>
                      <td className="p-2 whitespace-nowrap">{product.brand_name} {product.model_name}</td>
                      <td className="p-2 text-center whitespace-nowrap">{product.stock_level}</td>
                      <td className="p-2 text-center whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                          product.addsite ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {product.addsite ? 'Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;