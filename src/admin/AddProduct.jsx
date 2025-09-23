import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' 

const AddProduct = () => {

    const [formData, setFormData] = useState({})

    const navigate = useNavigate()


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formDataobj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataobj.append(key, formData[key])
        })
        try {
            const response = await axios.post('http://localhost:5000/api/product/add', formDataobj, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-md rounded-md">
            <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                Add Product
            </h2>
            
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}

                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:ring-yellow-500"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Product Description
                    </label>
                    <textarea
                        name="description"
                        rows="3"
                        onChange={handleChange}

                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:ring-yellow-500"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Product Price (₹)
                    </label>
                    <input
                        type="number"
                        name="price"
                        onChange={handleChange}

                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:ring-yellow-500"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Upload Product Image
                    </label>
                    <input
                        type="file"
                        name="image" 
                        onChange={handleChange} 
                        accept='image/*'
                        placeholder='Please upload Image'
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
                        Confirm
                    </button>
                    <button
                        type="button"
                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        onClick={() => navigate('/admin-dashboard')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct
