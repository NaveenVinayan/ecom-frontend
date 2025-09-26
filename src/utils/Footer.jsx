import React from "react";
import { useNavigate } from "react-router-dom";


const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className="bg-gray-900 text-gray-200 py-10 bottom-0">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About Section */}
                <div>
                    <h2 className="text-xl font-bold mb-4">eCart</h2>
                    <p className="text-gray-400 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                {/* Links Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => navigate('/home')}
                                className="group transition duration-300"
                            >Home
                                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-100"></span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/home/products-list')}
                                className="group transition duration-300"
                            >Products
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-100"></span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/home/orders')}
                                className="group transition duration-300"
                            >Orders
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-100"></span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/home/account-details')}
                                className="group transition duration-300"
                            >Account
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-100"></span>
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white transition">Facebook</a>
                        <a href="#" className="hover:text-white transition">Instagram</a>
                        <a href="#" className="hover:text-white transition">Twitter</a>
                        <a href="#" className="hover:text-white transition">LinkedIn</a>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Naveen Vinayan. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;  
