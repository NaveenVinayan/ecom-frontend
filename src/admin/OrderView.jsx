import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderView = () => {

  const [orders, setOrders] = useState([])
  const [prdLoading, setPrdLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setPrdLoading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/order',
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
        setPrdLoading(false);
      }
    }
    fetchOrders()
  }, [])

  return (
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

  );
};

export default OrderView;
