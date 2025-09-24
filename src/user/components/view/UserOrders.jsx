import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "shipped":
      return "bg-blue-100 text-blue-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const Userorders = () => {

  const [orders, setOrders] = useState([])
  const [prdLoading, setPrdLoading] = useState(false)

  const navigate = useNavigate()

  const { user } = useAuth()

  useEffect(() => {
    const fetchProducts = async () => {
      setPrdLoading(true)

      try {
        const response = await axios.get(`https://ecom-api-2xbg.onrender.com/api/order/orders/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })

        if (response.data.success) {


          const data = await response.data.orders.map((ord) => (
            {
              _id: ord._id,
              productId: ord.productId?._id,
              productName: ord.productId?.fullName,
              productImage: `http://localhost:5000/${ord.productId?.productImage}`,
              description: ord.productId?.description,
              price: ord.productId?.price,
              status: ord.status,
              date: ord.createdAt

            }
          ));

          const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

          setOrders(sortedData)
        }




      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setPrdLoading(false);
      }
    }
    fetchProducts()
  }, [])

  const handleCancel = async (e, _id) => {
    e.preventDefault()
    if (window.confirm("Are you sure you want to cancel this product?")) {

      try {
        const response = await axios.put(`https://ecom-api-2xbg.onrender.com/api/order/cancel/${_id}`, {}, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          setOrders((prev) => prev.filter((p) => p._id !== _id));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
    }
  }



  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 border-b pb-3">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border rounded-lg hover:shadow-md transition"
          >
            <div className="flex flex-wrap gap-2 ">
              {/* Product Image */}
              <div className="items-center">
                <img
                  src={order.productImage}
                  alt={order.productName}
                  onClick={()=> navigate(`/user-home/products-list/detail/${order.productId}`)}
                  className="w-28 h-28 object-cover rounded-md border"
                />
              </div>

              {/* Order Info */}
              <div className="sm:col-span-2 flex flex-col justify-center">
                <p className="font-semibold">{order.productName}</p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Order ID: #{order._id}
                </p>
              </div>
            </div>
            {/* Price + Status */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              {/* Price */}
              <p className="font-medium text-gray-700 text-lg">
                Price: ₹{order.price}
              </p>
            </div>
            <div className="flex justify-between sm:flex-col">
              {/* Action + Status */}
              {/* Cancel button (conditionally rendered) */}
              <div className="self-end">
                {(order.status === "pending" || order.status === "shipped") && (
                  <button
                    onClick={(e) => handleCancel(e, order._id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition duration-200 ease-in-out active:scale-95"
                  >
                    Cancel Order
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-col justify-end gap-2 sm:gap-0 self-end  sm:items-center">


                {/* Status badge */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold capitalize self-start sm:self-center  ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>

  );
};

export default Userorders;
