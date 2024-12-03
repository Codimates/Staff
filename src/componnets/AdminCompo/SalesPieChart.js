import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

const SalesPieChart = () => {
  const data = {
    labels: ["Dell", "Lenovo", "MSI", "HP", "ASUS"],
    datasets: [
      {
        data: [120, 150, 180, 90, 140],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 10,
          },
          color: "gray",
          usePointStyle: true,
          padding: 10,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
      },
    },
  };

  return (
    <div className="  rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#1A1A1D] mb-4 text-left">
        Laptop Sales by Category
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
  
};

export default SalesPieChart;
