import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import AdminNavbar from "../utils/AdminNavbar";
import { ToastContainer } from "react-toastify";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64 bg-gray-100 min-h-screen">
        <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} theme="colored" />
    </div>
  );
};

export default AdminDashboard;
