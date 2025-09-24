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
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { user } = useAuth()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

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
              productImage: `https://ecom-api-2xbg.onrender.com/${ord.productId?.productImage}`,
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
        setLoading(false);
      }
    }
    fetchProducts()
  }, [])

  const handleCancel = async (e, _id) => {
    e.preventDefault()
    if (window.confirm("Are you sure you want to cancel this product?")) {
      setLoading(true)
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
      } finally {
        setLoading(false)
      }
    }
  }



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
                        onClick={() => navigate(`/user-home/products-list/detail/${order.productId}`)}
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
              ))
              }
              {
              !loading && orders.length === 0 && (

                <div

                  className="text-center text-gray-500 py-4 border border-gray-300"
                >
                  No orders found.
                </div>

              )
            }
            </div>
          </div>
        )
      }
    </>

  );
};

export default Userorders;
