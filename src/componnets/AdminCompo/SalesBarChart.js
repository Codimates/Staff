import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesBarChart = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "2023 Sales",
        data: [100, 180, 140, 70, 160, 210, 280, 240, 380, 290, 250, 420],
        backgroundColor: "rgb(255, 219, 196)",
        barThickness: 18,
      },
      {
        label: "2024 Sales",
        data: [120, 200, 150, 80, 180, 230, 300, 250, 400, 310, 270, 450],
        backgroundColor: "rgb(255, 140, 0)",
        barThickness: 18,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
          },
          color: "gray",
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 h-[350px]"> {/* Reduced height */}
      <h2 className="text-lg font-semibold text-[#1A1A1D] mb-4 text-left">
        Monthly Sales
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
  
};

export default SalesBarChart;
