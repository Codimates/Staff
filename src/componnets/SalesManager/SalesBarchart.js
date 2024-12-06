import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export default function SalesBarchart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/order/getordersispayedtrue");
        const orders = response.data?.data || [];

        // Process data for the chart
        const formattedData = orders.reduce((acc, order) => {
          const month = new Date(order.createdAt).toLocaleString("default", {
            month: "short",
          });

          const existing = acc.find((entry) => entry.name === month);
          if (existing) {
            existing.Expense += order.overall_total_price; // Assuming Expense is the total order amount
          } else {
            acc.push({
              name: month,
              Expense: order.overall_total_price,
              Income: Math.random() * 10000, // Placeholder for Income, replace with actual data if available
            });
          }

          return acc;
        }, []);

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Transactions</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#0ea5e9" />
            <Bar dataKey="Expense" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
