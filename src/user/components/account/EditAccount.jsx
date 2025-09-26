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
            <div className="p-5 max-w-lg mx-20">
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
