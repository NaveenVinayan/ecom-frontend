import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../utils/Loading';

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
                    <Loading />
                ) : (
                    <div className="max-w-4xl mx-auto p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800"> Order Details</h2>

                        {/* Shipping Address */}
                        <div className="bg-white shadow rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-3"> Shipping Address</h3>
                            <p><span className="font-medium">Full Name:</span> {order.fullName}</p>
                            <p><span className="font-medium">Phone:</span> {order.phone}</p>
                            <p>
                                <span className="font-medium">Address:</span> {order.street}, {order.city},{" "}
                                {order.state} - {order.pincode}
                            </p>
                        </div>

                        {/* Product Details */}
                        <div className="bg-white shadow rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-3"> Product Details</h3>
                            <div className="flex items-center gap-4">
                                <img
                                    src={`${order?.productId?.productImage}`}
                                    alt={order?.productId?.name}
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
                            <h3 className="text-lg font-semibold mb-3"> User Details</h3>
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
