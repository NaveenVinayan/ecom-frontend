import React from "react";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../context/authContext";

const AdminNavbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between h-12 bg-teal-600 px-5 text-white">
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          className="lg:hidden text-xl hover:text-gray-200"
          onClick={onMenuClick}
        >
          <FaBars />
        </button>
        <p className="font-semibold">Welcome {user?.name || "Admin"}</p>
      </div>

      {/* Right section */}
      <button
        className="px-4 py-1 bg-teal-700 rounded hover:bg-teal-800"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
