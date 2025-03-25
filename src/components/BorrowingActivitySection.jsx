import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
import React from "react";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";

const BorrowingActivitySection = () => {
  // Bar chart data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Books Borrowed",
        data: [40, 35, 50, 70, 65, 80],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Books Returned",
        data: [30, 30, 45, 60, 55, 75],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Borrowing and Returning Activity
      </h2>
      <div className="relative w-full h-64">
        <Bar data={data} options={options} />
      </div>
      <motion.div
        className="mt-6 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          User Borrowing Insights
        </h3>
        <p className="text-gray-600">
          <span className="font-bold">78%</span> of books borrowed this month
          have been returned. However, <span className="font-bold">22%</span>{" "}
          are overdue by more than a week. Regular reminders might help improve
          return rates.
        </p>
        <p className="text-gray-600">
          Users borrowed <span className="font-bold">80 books</span> in June, 
          setting a record for the year. Keep encouraging frequent library usage!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default BorrowingActivitySection;
s