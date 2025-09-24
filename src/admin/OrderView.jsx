import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderView = () => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/order`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })

        if (response.data.success) {


          let sno = 1;

          const data = response.data.orders.map((ord) => (
            {
              _id: ord._id,
              sno: sno++,
              name: ord.fullName,
              phone: ord.phone,
              address: ord.street,
              city: ord.city,
              state: ord.state,
              pincode: ord.pincode,
              status: ord.status,
              productName: ord.productId?.name || "N/A",
              productPrice: ord.productId?.price || 0,
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
    fetchOrders()
  }, [])

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
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 Orders</h2>

            {/* Desktop / Tablet Table */}
            <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">S No</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Address</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Product</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((ord) => (
                    <tr
                      key={ord._id}
                      className="hover:bg-gray-50 border-b last:border-none transition"
                    >
                      <td className="p-4 text-gray-600">{ord.sno}</td>
                      <td className="p-4 font-medium text-gray-800">{ord.name}</td>
                      <td className="p-4 text-gray-600 text-sm">
                        {ord.phone},<br />
                        {ord.address}, {ord.city}, {ord.state}, {ord.pincode}
                      </td>
                      <td className="p-4 text-gray-700">{ord.productName}</td>
                      <td className="p-4 font-semibold text-green-600">₹{ord.productPrice}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium
                ${ord.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : ord.status === "shipped"
                                ? "bg-blue-100 text-blue-700"
                                : ord.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-3">
                          <button onClick={() => navigate(`/admin-dashboard/view-order/${ord._id}`)} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">
                            View
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}

                  {orders.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center text-gray-500 py-6 text-sm"
                      >
                        No Orders Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4">
              {orders.length > 0 ? (
                orders.map((ord) => (
                  <div
                    key={ord._id}
                    className="bg-white rounded-lg shadow-md p-4 border border-gray-100"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">
                        #{ord.sno} - {ord.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
              ${ord.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : ord.status === "shipped"
                              ? "bg-blue-100 text-blue-700"
                              : ord.status === "delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                      >
                        {ord.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Phone:</span> {ord.phone}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Address:</span> {ord.address}, {ord.city},{" "}
                      {ord.state} - {ord.pincode}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Product:</span> {ord.productName}
                    </p>
                    <p className="text-sm font-semibold text-green-600 mb-3">
                      ₹{ord.productPrice}
                    </p>

                    <div className="grid grid-cols-4 gap-3">
                      <button onClick={() => navigate(`/admin-dashboard/view-order/${ord._id}`)} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">
                        View
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-6">No Orders Found</p>
              )}
            </div>
          </div>
        )
      }
    </>

  );
};

export default OrderView;
