import React from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";

function DashboardStatusGrid() {
  const [orders, setOrders] = useState([]);
  const [allorder, setollorder] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/order/getordersispayedtrue");
        console.log(response.data);
        setOrders(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
    featchallorder();
  }, []);

  const featchallorder = async () => {
    try {
      const respond = await axios.get(`/order/gettotal`);
      console.log(respond.data);
      setollorder(respond.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">


      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
       
        <div className="pl-4">
          <span className="text-sm font-bold">Total Sales</span>
          <div className="flex items-center">
            
            <strong className="text-xl text-gray-700 font-semibold">
            {allorder?.data}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-bold">Monthly Sales</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              $3423
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-bold">Total Customers</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              12313
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-bold">Total Orders</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {orders.length}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-gray-100 p-5 border rounded-lg shadow-sm flex items-center space-x-4">
      {children}
    </div>
  );
}

export default DashboardStatusGrid;
