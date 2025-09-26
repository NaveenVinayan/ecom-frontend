import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../utils/Loading'

const EditUser = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        oldPassword: '',
        newPassword: '',
    })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try {

                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })

                if (response.data.success) {
                    const user = response.data.user
                    setUser((prev) => ({
                        ...prev,
                        name: user.name,
                        email: user.email,

                    }))

                }


            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setLoading(false);
            }

        }
        fetchUsers()
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prevData) => ({ ...prevData, [name]: value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/${id}`, user, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/view-users")
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
            <Loading />
        ) : (
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-md rounded-md">
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                        Edit User
                    </h2>

                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type='text'
                            name="email"
                            rows="3"
                            onChange={handleChange}
                            value={user.email}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    {/* Old Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Old Password
                        </label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={user.oldPassword}
                            onChange={handleChange}

                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            onChange={handleChange}
                            value={user.newPassword}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:ring-yellow-500"
                            required
                        />
                    </div>


                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                            onClick={() => navigate('/admin-dashboard/view-users')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )}
        </>
    )
}

export default EditUser
