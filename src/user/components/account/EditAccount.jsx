import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../../context/authContext";
import axios from "axios";
import Loading from '../../../utils/Loading';

const AccountDetails = () => {

    const [users, setUsers] = useState({
        name: '',
        email: '',
        oldPassword: '',
        newPassword: '',
    })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { user } = useAuth()

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/${user._id}`,
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
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUsers((prevData) => ({ ...prevData, [name]: value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/${user._id}`, users, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                alert("Profile updated successfully")
                navigate("/home/account-details")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <> {loading ? (
            <Loading/>
        ) : (
            <div className="p-5 max-w-lg lg:mx-20 mx-2 h-[calc(100vh-5rem)]">
                <h3 className="text-3xl font-semibold border-b-2 border-black pb-4">
                    Account Details
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="py-8 space-y-6">
                        {/* User ID */}
                        <div className="flex items-center justify-between">
                            <label className="w-28 font-medium">Name</label>
                            <input
                                type="text"
                                name='name'
                                value={users.name}
                                onChange={handleChange}
                                className="flex-1 bg-slate-100 p-2 rounded border border-gray-300"

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

                            />
                        </div>
                        {/* Old Password */}
                        <div className="flex items-center justify-between">
                            <label className="w-28 font-medium">Old Password</label>
                            <input
                                type="password"
                                name="oldPassword"
                                value={users.oldPassword}
                                onChange={handleChange}
                                className="flex-1 bg-slate-100 p-2 rounded border border-gray-300"

                            />
                        </div>
                        {/* New Password */}
                        <div className="flex items-center justify-between">
                            <label className="w-28 font-medium">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                onChange={handleChange}
                                value={users.newPassword}
                                className="flex-1 bg-slate-100 p-2 rounded border border-gray-300"

                            />
                        </div>



                        {/* Save Button */}
                        <div className="flex justify-end space-x-2">
                            <button type='submit' className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Save
                            </button>
                            <button type='button' onClick={() => navigate('/home/account-details')} className="px-6 py-2 bg-slate-500 text-white rounded hover:bg-slate-600">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )}
        </>


    )
}

export default AccountDetails
