import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchOrder = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/order/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            if (response.data.success) {
                setOrder(response.data.order)
            }

        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrder()
    }, [id])

    const changeStatus = async (id, status) => {
        setLoading(true)
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/order/${id}`, { status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            if (response.data.success) {
                fetchOrder();
            }

        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        } finally {
            setLoading(false)
        }
    }

    if (!order) return <p className="text-center py-10">No Order Found</p>;

    return (
        <>
            {loading ?
                (
                    <div className="flex items-center justify-center min-h-screen">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 
        0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 
        100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 
        91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 
        50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 
        97.0079 33.5539C95.2932 28.8227 92.871 
        24.3692 89.8167 20.348C85.8452 15.1192 
        80.8826 10.7238 75.2124 7.41289C69.5422 
        4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 
        0.367541 46.6976 0.446843 41.7345 
        1.27873C39.2613 1.69328 37.813 4.19778 
        38.4501 6.62326C39.0873 9.04874 41.5694 
        10.4717 44.0505 10.1071C47.8511 9.54855 
        51.7191 9.52689 55.5402 10.0491C60.8642 
        10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 
        17.9648 79.3347 21.5619 82.5849 
        25.841C84.9175 28.9121 86.7997 32.2913 
        88.1811 35.8758C89.083 38.2158 91.5421 
        39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 Order Details</h2>

                        {/* Shipping Address */}
                        <div className="bg-white shadow rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-3">🚚 Shipping Address</h3>
                            <p><span className="font-medium">Full Name:</span> {order.fullName}</p>
                            <p><span className="font-medium">Phone:</span> {order.phone}</p>
                            <p>
                                <span className="font-medium">Address:</span> {order.street}, {order.city},{" "}
                                {order.state} - {order.pincode}
                            </p>
                        </div>

                        {/* Product Details */}
                        <div className="bg-white shadow rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-3">🛍 Product Details</h3>
                            <div className="flex items-center gap-4">
                                <img
                                    src={`${import.meta.env.VITE_API_BASE_URL}/${order.productId.productImage}`}
                                    alt={order.productId.name}
                                    className="w-24 h-24 object-cover rounded-md border"
                                />
                                <div>
                                    <p className="font-medium text-gray-800">{order.productId.name}</p>
                                    <p className="text-sm text-gray-600">{order.productId.description}</p>
                                    <p className="font-semibold text-green-600 mt-1">
                                        ₹{order.productId.price}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="bg-white shadow rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-3">👤 User Details</h3>
                            <p><span className="font-medium">Name:</span> {order.userId.name}</p>
                            <p><span className="font-medium">Email:</span> {order.userId.email}</p>
                        </div>

                        {/* Status Section */}
                        <div className="bg-white shadow rounded-lg p-6 space-y-4">
                            {/* Status Label */}
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-medium text-gray-700">
                                    Status:{" "}
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${order.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : order.status === "shipped"
                                                ? "bg-blue-100 text-blue-700"
                                                : order.status === "delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </p>


                            </div>

                            <div className='flex justify-between border-t'>
                                {/* Action Buttons */}
                                {["pending", "shipped"].includes(order.status) && (
                                    <div className="flex flex-wrap gap-3 pt-2  border-gray-200 ">
                                        {order.status === "pending" && (
                                            <button
                                                onClick={() => changeStatus(order._id, "shipped")}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                            >
                                                Mark as Shipped
                                            </button>
                                        )}
                                        {order.status !== "delivered" && (
                                            <button
                                                onClick={() => changeStatus(order._id, "delivered")}
                                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                            >
                                                Mark as Delivered
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to cancel this order?")) {
                                                    changeStatus(order._id, "cancelled")
                                                }
                                            }}
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                        >
                                            Cancel Order
                                        </button>

                                    </div>
                                )}

                                {/* Back Button */}
                                <div className="flex justify-end pt-4  border-gray-200">
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }
        </>
    )
}

export default OrderDetail
