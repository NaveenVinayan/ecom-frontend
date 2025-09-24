import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const ProductView = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/product`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })

                if (response.data.success) {
                    let sno = 1;

                    const data = await response.data.products.map((prd) => (
                        {
                            _id: prd._id,
                            sno: sno++,
                            name: prd.name,
                            productImage: `${import.meta.env.VITE_API_BASE_URL}/${prd.productImage}`,
                            description: prd.description,
                            price: prd.price

                        }
                    ));

                    setProducts(data)
                }


            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProducts()
    }, [])

    const handleDelete = async (e, id) => {
        e.preventDefault()
        if (window.confirm("Are you sure you want to delete this product?")) {

            setLoading(true)
            try {
                const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/product/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    setProducts((prev) => prev.filter((p) => p._id !== id));
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <>
            {loading ?
                (
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
                    <div className="p-8 bg-gray-50 min-h-screen">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden" >
                            <div className="flex justify-between px-6 py-4 border-b bg-gray-100">
                                <h2 className="text-2xl font-bold ">
                                    Product List
                                </h2>
                                <Button onClick={() => navigate('/admin-dashboard/add-product')} variant="outlined" size="medium">
                                    ADD PRODUCT
                                </Button>
                            </div>

                            <table className="w-full border border-gray-300 text-left rounded-lg overflow-hidden shadow-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 border-b text-gray-700 font-semibold">S No</th>
                                        <th className="p-3 border-b text-gray-700 font-semibold">Product Name</th>
                                        <th className="p-3 border-b text-gray-700 font-semibold">Product Image</th>
                                        <th className="p-3 border-b text-gray-700 font-semibold">Product Description</th>
                                        <th className="p-3 border-b text-gray-700 font-semibold">Product Price</th>
                                        <th className="p-3 border-b text-gray-700 font-semibold">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {products.map((prd) => (
                                        <tr key={prd._id} className="hover:bg-gray-50">
                                            <td className="p-3">{prd.sno}</td>
                                            <td className="p-3">{prd.name}</td>
                                            <td className="p-3">
                                                <img
                                                    src={prd.productImage}
                                                    alt={prd.productImage}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                            </td>
                                            <td className="p-3">{prd.description}</td>
                                            <td className="p-3 font-semibold">₹{prd.price}</td>
                                            <td className="p-3">
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() =>
                                                            navigate(`/admin-dashboard/edit-product/${prd._id}`)
                                                        }
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleDelete(e, prd._id)}
                                                        className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center text-gray-500 py-4 border border-gray-300"
                                            >
                                                No products found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div >
                    </div >
                )
            }
        </>

    );
};

export default ProductView;
