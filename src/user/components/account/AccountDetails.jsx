import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../../context/authContext";
import axios from "axios";

const AccountDetails = () => {

    const [users, setUsers] = useState({
        name: '',
        email: '',
    })

    const navigate = useNavigate()

    const { user,logout } = useAuth()

    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const response = await axios.get(`https://ecom-api-2xbg.onrender.com/api/user/${user._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })

                if (response.data.success) {
                    const users = response.data.user
                    setUsers((prev) => ({
                        ...prev,
                        name: users.name,
                        email: users.email,

                    }))

                }


            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchUsers()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUsers((prevData) => ({ ...prevData, [name]: value }))

    }


    return (
        <div className=" p-5 max-w-lg mx-20">
            <h3 className="text-3xl font-semibold border-b-2 border-black pb-4">
                Account Details
            </h3>

            <div className="py-8 space-y-6">
                {/* User ID */}
                <div className="flex items-center justify-between">
                    <label className="w-28 font-medium">User ID</label>
                    <input
                        type="text"
                        name='name'
                        value={users.name}
                        onChange={handleChange}
                        className="flex-1 bg-slate-100 p-2 rounded border border-gray-300"
                        readOnly
                    />
                </div>

                {/* Email */}
                <div className="flex items-center justify-between">
                    <label className="w-28 font-medium">Email</label>
                    <input
                        type='email'
                        name="email"
                        onChange={handleChange}
                        value={users.email}
                        className="flex-1 bg-slate-100 p-2 rounded border border-gray-300"
                        readOnly
                    />
                </div>

                {/* Save Button */}
                <div className="flex justify-start gap-4">
                    <button onClick={() => navigate('/user-home/edit-account')} className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Edit Account Details
                    </button>
                    <button onClick={logout} className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                       Logout
                    </button>
                </div>
            </div>
        </div>

    )
}

export default AccountDetails
