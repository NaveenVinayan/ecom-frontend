import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "../utils/Loading";

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
                            productImage: `${prd.productImage}`,
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
                    <Loading />
                ) : (
                    <div className=" bg-gray-50 min-h-screen">
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
