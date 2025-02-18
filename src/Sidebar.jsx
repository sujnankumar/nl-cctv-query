import React from "react";
import { FaUser, FaCog, FaHistory, FaCommentAlt } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`bg-gray-800 w-64 p-4 transition-all duration-300 fixed top-0 bottom-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      <h2 className="text-xl font-bold mb-4 text-blue-500">CCTV Query</h2>
      <ul className="space-y-2">
        <li>
          <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded-lg">
            <FaCommentAlt className="mr-2" /> Chat
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded-lg">
            <FaCog className="mr-2" /> Settings
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded-lg">
            <FaHistory className="mr-2" /> History
          </a>
        </li>
      </ul>

      {/* User Profile Link */}
      <div className="absolute bottom-4 left-4 right-4">
        <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded-lg">
          <FaUser className="mr-2" /> Profile
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
