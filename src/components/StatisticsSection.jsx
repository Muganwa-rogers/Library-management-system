import React, { useEffect, useState } from "react";

const StatisticsSection = () => {
  // Placeholder state for statistics
  const [stats, setStats] = useState({
    totalBorrowers: 0,
    booksBorrowed: 0,
    booksReturned: 0,
    overdueBooks: 0,
  });

  // Simulate API call to fetch statistics (replace this with actual API integration)
  useEffect(() => {
    const fetchStats = async () => {
      // Replace this with your backend API endpoint
      const mockData = {
        totalBorrowers: 120,
        booksBorrowed: 350,
        booksReturned: 280,
        overdueBooks: 25,
      };
      setTimeout(() => setStats(mockData), 1000); // Simulated delay
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      {/* Total Borrowers */}
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold text-gray-700">Total Borrowers</h2>
        <p className="text-3xl font-semibold text-blue-500">{stats.totalBorrowers}</p>
      </div>

      {/* Books Borrowed */}
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold text-gray-700">Books Borrowed</h2>
        <p className="text-3xl font-semibold text-green-500">{stats.booksBorrowed}</p>
      </div>

      {/* Books Returned */}
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold text-gray-700">Books Returned</h2>
        <p className="text-3xl font-semibold text-purple-500">{stats.booksReturned}</p>
      </div>

      {/* Overdue Books */}
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold text-gray-700">Overdue Books</h2>
        <p className="text-3xl font-semibold text-red-500">{stats.overdueBooks}</p>
      </div>
    </div>
  );
};

export default StatisticsSection;
