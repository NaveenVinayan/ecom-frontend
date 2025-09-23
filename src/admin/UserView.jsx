import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const UserView = () => {
  const [users, setUsers] = useState([]);
  const [prdLoading, setPrdLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setPrdLoading(true)
      try {
        const response = await axios.get('https://ecom-api.vercel.app/api/user',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })

        if (response.data.success) {
          let sno = 1;

          const data = await response.data.users.map((usr) => (
            {
              _id: usr._id,
              sno: sno++,
              name: usr.name,
              email: usr.email,
              role: usr.role

            }
          ));

          setUsers(data)
        }


      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setPrdLoading(false);
      }
    }
    fetchUsers()
  }, [])


  // delete user
  const handleDelete = async (e, id) => {
        e.preventDefault()
        if (window.confirm("Are you sure you want to delete this product?")) {

            try {
                const response = await axios.delete(`https://ecom-api.vercel.app/api/user/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    setUsers((prev) => prev.filter((p) => p._id !== id));
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
    }

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 shadow rounded-md">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">User List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">S No</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr) => (
              <tr key={usr._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{usr.sno}</td>
                <td className="border border-gray-300 px-4 py-2">{usr.name}</td>
                <td className="border border-gray-300 px-4 py-2">{usr.email}</td>
                <td className="border border-gray-300 px-4 py-2">{usr.role}</td>

                <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() =>  navigate(`/admin-dashboard/edit-user/${usr._id}`)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e,usr._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-4 border border-gray-300"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  ); 
};

export default UserView;
