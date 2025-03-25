import React from "react";
import { FaBook, FaUndo, FaExclamationCircle } from "react-icons/fa";

const RecentActivities = () => {
  // Placeholder activity data
  const activities = [
    {
      id: 1,
      action: "borrowed",
      book: "The Great Gatsby",
      user: "John Doe",
      timestamp: "2025-01-26 10:30 AM",
    },
    {
      id: 2,
      action: "returned",
      book: "1984",
      user: "Jane Smith",
      timestamp: "2025-01-25 04:15 PM",
    },
    {
      id: 3,
      action: "overdue",
      book: "To Kill a Mockingbird",
      user: "Michael Brown",
      timestamp: "2025-01-24 08:00 AM",
    },
  ];

  const getActionIcon = (action) => {
    switch (action) {
      case "borrowed":
        return <FaBook className="text-blue-500" />;
      case "returned":
        return <FaUndo className="text-green-500" />;
      case "overdue":
        return <FaExclamationCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 my-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{getActionIcon(activity.action)}</div>
              <div>
                <p className="text-sm md:text-base font-medium text-gray-800">
                  <span className="capitalize">{activity.user}</span> {activity.action}{" "}
                  <span className="font-bold">{activity.book}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  activity.action === "borrowed"
                    ? "bg-blue-100 text-blue-500"
                    : activity.action === "returned"
                    ? "bg-green-100 text-green-500"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
