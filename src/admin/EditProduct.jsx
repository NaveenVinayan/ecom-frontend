import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../utils/Loading'

const EditProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,


    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/product/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })

                if (response.data.success) {
                    const product = response.data.product
                    setProduct((prev) => ({
                        ...prev,
                        name: product.name,
                        description: product.description,
                        price: product.price,
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
        fetchProducts()
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct((prevData) => ({ ...prevData, [name]: value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/product/${id}`, product, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/view-products")
            }
            setLoading(false)
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }

    }

    return (

        <> {loading ? (
            <Loading />
        ) : (
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-md rounded-md">
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                        Edit Product
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
                            value={product.name}
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
                            value={product.description}
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
                            value={product.price}
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
                            onClick={() => navigate('/admin-dashboard')}
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

export default EditProduct
