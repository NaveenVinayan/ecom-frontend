import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import dayjs from "dayjs";

const OrderChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/order`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        const orders = response.data.orders || [];


        const now = dayjs();
        const sixMonthsAgo = now.subtract(5, "month").startOf("month");

        
        const recentOrders = orders.filter((order) =>
          dayjs(order.createdAt).isAfter(sixMonthsAgo)
        );

        
        const grouped = {};
        recentOrders.forEach((order) => {
          const month = dayjs(order.createdAt).format("MMM");
          grouped[month] = (grouped[month] || 0) + 1;
        });

        
        const months = Array.from({ length: 6 }, (_, i) =>
          now.subtract(5 - i, "month").format("MMM")
        );

        
        const formatted = months.map((month) => ({
          month,
          totalOrders: grouped[month] || 0,
        }));

        setChartData(formatted);
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response?.data?.error) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading chart...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Orders Overview (Last 6 Months)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="totalOrders"
            stroke="#4F46E5"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderChart;
