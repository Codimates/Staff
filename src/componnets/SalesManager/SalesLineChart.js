import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SalesLineChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/order/getordersispayedtrue");
        const orders = response.data?.data || [];

        // Process data for the chart
        const formattedData = orders.map((order) => ({
          name: new Date(order.createdAt).toLocaleDateString(), // Use createdAt as the X-axis label
          overallTotal: order.overall_total_price, // Y-axis value
        }));

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
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="overallTotal"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Total Sales"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
