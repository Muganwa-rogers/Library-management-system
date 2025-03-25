import React, { useState } from "react";
import { FaUserCog, FaBookOpen, FaKey, FaDatabase, FaArrowLeft } from "react-icons/fa";
import UserManagement from "./Users";
import BookManagement from "./Books";
import ApiIntegrations from "./ApiIntegrations";
import DatabaseSettings from "./DatabaseSettings";

const SettingsQuickLinks = () => {
  const [activeSection, setActiveSection] = useState(null);

  const links = [
    {
      id: 1,
      label: "User Management",
      icon: <FaUserCog className="text-blue-500" />,
      description: "Add, edit, or remove users from the system.",
      component: <UserManagement />,
    },
    {
      id: 2,
      label: "Book Management",
      icon: <FaBookOpen className="text-green-500" />,
      description: "Manage the library's book inventory.",
      component: <BookManagement />,
    },
    {
      id: 3,
      label: "API Integrations",
      icon: <FaKey className="text-yellow-500" />,
      description: "Manage API keys and integrations.",
      component: <ApiIntegrations />,
    },
    {
      id: 4,
      label: "Database Settings",
      icon: <FaDatabase className="text-red-500" />,
      description: "Configure database and backups.",
      component: <DatabaseSettings />,
    },
  ];

  if (activeSection) {
    const activeLink = links.find((link) => link.id === activeSection);

    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Back Button */}
        <button
          onClick={() => setActiveSection(null)}
          className="flex items-center mb-4 text-blue-500 hover:underline"
        >
          <FaArrowLeft className="mr-2" />
          Back to Quick Settings
        </button>

        {/* Render the Active Section */}
        <div>{activeLink.component}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 my-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Quick Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-blue-50 transition"
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{link.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{link.label}</h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveSection(link.id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsQuickLinks;
