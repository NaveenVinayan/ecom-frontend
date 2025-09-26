import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons
import { CiUser } from "react-icons/ci";

const UserNavbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="bg-slate-950 text-gray-200 shadow-md h-20 sticky top-0 z-50">
      <nav className="flex items-center justify-between h-20 px-6 ">
        {/* Logo */}
        <div
          onClick={() => navigate("/home")}
          className="font-bold text-gray-300 text-3xl cursor-pointer"
        >
          eCart
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">

          {/* Home */}
          <button
            onClick={() => navigate("/home")}
            className="uppercase group transition duration-300 hover:text-purple-400"
          >
            HOME
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-400"></span>
          </button>

          {/* Products */}
          <button
            onClick={() => navigate("/home/products-list")}
            className="uppercase group transition duration-300 hover:text-purple-400"
          >
            PRODUCTS
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-400"></span>
          </button>

          {/* Orders */}
          <button
            onClick={() => navigate("/home/orders")}
            className="uppercase group transition duration-300 hover:text-purple-400"
          >
            ORDERS
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-400"></span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => navigate("/home/wishlist")}
            className="uppercase group transition duration-300 hover:text-purple-400"
          >
            WISHLIST
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-400"></span>
          </button>

          {/* Account */}
          <button
            onClick={() => navigate("/home/account-details")}
            className="group transition duration-300 hover:text-purple-400"
          >
            <div className="p-2 rounded-full bg-white text-black">
              <CiUser size={25} />
            </div>
          </button>
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
          {/* Home */}
          <button
            onClick={() => {
              navigate("/home");
              setOpen(false);
            }}
            className="block w-full uppercase py-2 hover:text-purple-400 transition"
          >
            HOME
          </button>

          {/* Products */}
          <button
            onClick={() => {
              navigate("/home/products-list");
              setOpen(false);
            }}
            className="block w-full uppercase py-2 hover:text-purple-400 transition"
          >
            PRODUCTS
          </button>

          {/* Orders */}
          <button
            onClick={() => {
              navigate("/home/orders");
              setOpen(false);
            }}
            className="block w-full uppercase py-2 hover:text-purple-400 transition"
          >
            ORDERS
          </button>

          {/* Wishlist */}
          <button
            onClick={() => {
              navigate("/home/wishlist");
              setOpen(false);
            }}
            className="block w-full uppercase py-2 hover:text-purple-400 transition"
          >
            WISHLIST
          </button>

          {/* Account */}
          <button
            onClick={() => {
              navigate("/home/account-details");
              setOpen(false);
            }}
            className="block w-full uppercase py-2 hover:text-purple-400 transition"
          >
            Account
          </button>
        </div>
      )}
    </div>
  );
};

export default UserNavbar;
