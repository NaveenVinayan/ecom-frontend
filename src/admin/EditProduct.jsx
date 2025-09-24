import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
                const response = await axios.get(`https://ecom-api-2xbg.onrender.com/api/product/${id}`,
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
            const response = await axios.put(`https://ecom-api-2xbg.onrender.com/api/product/${id}`, product, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard")
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
