import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger + close icons

const UserNavbar = () => {
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate(); 

  const menuItems = [
    { name: "HOME", path: "/user-home" },
    { name: "PRODUCTS", path: "/user-home/products-list" },
    { name: "ORDERS", path: "/user-home/orders" },
    { name: "ACCOUNT", path: "/user-home/account-details" },
  ];

  return (
    <div className="bg-slate-950 text-gray-200 shadow-md sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div onClick={()=> navigate('/user-home')} className="font-bold text-gray-300 text-lg cursor-pointer">
          LOGO
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className="uppercase group transition duration-300 hover:text-purple-400"
            >
              {item.name}
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-400"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-gray-300">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-slate-900 text-center space-y-4 py-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.path);
                setOpen(false); // close menu after click
              }}
              className="block w-full uppercase py-2 hover:text-purple-400 transition"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserNavbar;
