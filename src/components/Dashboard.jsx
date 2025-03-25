import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaBook, FaMoneyCheckAlt, FaHome, FaSignOutAlt } from "react-icons/fa";
import Users from "./Users";
import Transactions from "./Transactions";
import Books from "./Books";
import MotivationalSection from "./MotivationalSection";
// import BorrowingActivitySection from "./BorrowingActivitySection";
import StatisticsSection from "./StatisticsSection";
import RecentActivities from "./RecentActivities";
import TaskReminderSection from "./TaskReminderSection";
import SettingsQuickLinks from "./SettingQuickLinks";

const ButtonMenu = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/login/session", {
  //         credentials: "include",
  //       });
  
  //       if (!response.ok) {
  //         const error = await response.json();
  //         console.error("Session check failed:", error);
  //         throw new Error(error.message || "Session invalid");
  //       }
  
  //       const data = await response.json();
  //       console.log("Session valid:", data);
  //     } catch (error) {
  //       console.error("Error in session check:", error.message);
  //       setError("Session expired. Redirecting to login...");
  //       setTimeout(() => navigate("/login"), 2000);
  //     }
  //   };
  
  //   checkSession();
  // }, [navigate]);
  

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      }
      

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "users":
        return <Users />;
      case "transactions":
        return <Transactions />;
      case "books":
        return <Books />;
      case "dashboard":
      default:
        return (
          <div className="text-center p-6">
            <h2 className="text-2xl font-bold">Welcome!</h2>
            <p>Select a section to get started.</p>
            <MotivationalSection />
            <TaskReminderSection />
            <RecentActivities />
            <StatisticsSection />
            {/* <BorrowingActivitySection /> */}
            <SettingsQuickLinks />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sticky Button Menu */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md py-4">
        <div className="flex justify-center">
          <button
            onClick={() => setActiveComponent("dashboard")}
            className={`flex items-center px-6 py-2 rounded-lg mx-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition ${
              activeComponent === "dashboard" && "bg-blue-100 text-blue-600"
            }`}
          >
            <FaHome className="mr-2" />
            Home
          </button>
          <button
            onClick={() => setActiveComponent("users")}
            className={`flex items-center px-6 py-2 rounded-lg mx-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition ${
              activeComponent === "users" && "bg-blue-100 text-blue-600"
            }`}
          >
            <FaUsers className="mr-2" />
            Users
          </button>
          <button
            onClick={() => setActiveComponent("transactions")}
            className={`flex items-center px-6 py-2 rounded-lg mx-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition ${
              activeComponent === "transactions" && "bg-blue-100 text-blue-600"
            }`}
          >
            <FaMoneyCheckAlt className="mr-2" />
            Transactions
          </button>
          <button
            onClick={() => setActiveComponent("books")}
            className={`flex items-center px-6 py-2 rounded-lg mx-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition ${
              activeComponent === "books" && "bg-blue-100 text-blue-600"
            }`}
          >
            <FaBook className="mr-2" />
            Books
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center px-6 py-2 rounded-lg mx-2 text-gray-600 hover:text-red-600 hover:bg-red-50 transition"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-center text-red-500 py-2">{error}</div>}

      {/* Dynamic Content */}
      <div className="flex-grow">{renderContent()}</div>
    </div>
  );
};

export default ButtonMenu;
