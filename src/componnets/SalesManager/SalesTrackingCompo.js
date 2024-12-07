import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesTrackingComponent = () => {
  const [paidOrders, setPaidOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch paid orders and total revenue
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Fetch paid orders
        const ordersResponse = await axios.get('/order/getordersispayedtrue');
        setPaidOrders(ordersResponse.data.data);

        // Fetch total revenue
        const revenueResponse = await axios.get('/order/gettotal');
        setTotalRevenue(revenueResponse.data.data);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch order data');
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId, statusField) => {
    try {
      const updateData = { [statusField]: true };
      await axios.put(`/order/update/${orderId}`, updateData);
      
      // Update local state to reflect the change
      setPaidOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId 
            ? { ...order, [statusField]: true } 
            : order
        )
      );
    } catch (err) {
      console.error(err);
      setError(`Failed to update order status`);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-32 h-32 border-t-2 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
      {error}
    </div>
  );

  return (
    <div className="container px-4 mx-auto sm:px-8">
      <div className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold leading-tight">Sales Tracking Dashboard</h2>
          <div className="text-lg font-bold text-green-600">
            Total Revenue: ${totalRevenue.toFixed(2)}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  Order ID
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  User ID
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  Total Price
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  Paid Status
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  Packed Status
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  Delivered Status
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paidOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">{order._id}</p>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">{order.user_id}</p>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">${order.overall_total_price.toFixed(2)}</p>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <span className={`px-2 py-1 font-semibold leading-tight ${order.ispayed ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                      {order.ispayed ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <span className={`px-2 py-1 font-semibold leading-tight ${order.ispacked ? 'text-green-700 bg-green-100' : 'text-yellow-700 bg-yellow-100'}`}>
                      {order.ispacked ? "Packed" : "Not Packed"}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <span className={`px-2 py-1 font-semibold leading-tight ${order.isdelivered ? 'text-green-700 bg-green-100' : 'text-yellow-700 bg-yellow-100'}`}>
                      {order.isdelivered ? "Delivered" : "Not Delivered"}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <div className="flex space-x-2">
                      {!order.ispacked && (
                        <button 
                          onClick={() => updateOrderStatus(order._id, 'ispacked')}
                          className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                          Mark Packed
                        </button>
                      )}
                      {!order.isdelivered && (
                        <button 
                          onClick={() => updateOrderStatus(order._id, 'isdelivered')}
                          className="px-4 py-2 text-xs font-bold text-white bg-green-500 rounded hover:bg-green-700"
                        >
                          Mark Delivered
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesTrackingComponent;