import React from "react";
import { Card, CardContent, IconButton, Typography, AspectRatio } from "@mui/joy";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../../context/authContext";
import Loading from "../../../utils/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const navigate = useNavigate()


    const fetchWishProducts = async () => {
        setLoading(true)

        try {

            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/wishlist/${user._id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (response.data.success) {
                const data = response.data.products.map((prd) => (
                    {
                        _id: prd.productId._id,
                        name: prd.productId.name,
                        productImage: `${import.meta.env.VITE_API_BASE_URL}/uploads/${prd.productId.productImage}`,
                        description: prd.productId.description,
                        price: prd.productId.price

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

    useEffect(() => {

        fetchWishProducts()
    }, [])

    const handleWishlist = async (e, id, userId) => {
        e.preventDefault()
        if (user) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/wishlist/${id}/${userId}`, {},
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )

                if (response.data.success) {
                    if (response.data.message.toLowerCase().includes("removed")) {
                        toast.info(response.data.message);
                    } else {
                        toast.success(response.data.message);
                    }
                }


            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
            fetchWishProducts()
        } else {
            navigate('/login')
        }

    }


    return (
        <>
            {loading ?
                (
                    <Loading />
                ) : (
                    <div className=" mx-auto px-4 h-[calc(100vh-5rem)] mt-6">
                        <h2 className="text-2xl font-bold border-b mx-6 pb-3">My Wishlist</h2>


                        <div className="flex flex-wrap gap-6 p-6">
                            {products.map((prd) => (
                                <Card
                                    key={prd._id}
                                    sx={{
                                        width: 275,
                                        cursor: "pointer",
                                        transition: "0.3s",
                                        position: "relative",
                                        "&:hover": { boxShadow: "lg" },
                                        "&:hover .wishlist-btn": { opacity: 1, transform: "translateY(0)" }
                                    }}
                                    onClick={() => navigate(`/home/products-list/detail/${prd._id}`)}

                                >
                                    {/* Heart Icon */}
                                    <IconButton
                                        className="wishlist-btn"
                                        aria-label="add to wishlist"
                                        variant="soft"
                                        size="sm"
                                        sx={{
                                            position: 'absolute',
                                            top: '0.75rem',
                                            right: '0.75rem',
                                            zIndex: 10,
                                            opacity: 1, 
                                            translatey: '-10px',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#f87171',
                                            color: 'white' ,
                                            borderRadius: '50%',
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                            '&:hover': {
                                                backgroundColor: prd.isWishlisted ? 'white' : '#f87171',
                                                color: prd.isWishlisted ? '#f87171' : 'white',
                                                transform: 'scale(1.1)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                            },
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleWishlist(e, prd._id, user._id);
                                        }}
                                    >
                                        <FavoriteBorderIcon />
                                    </IconButton>


                                    {/* Product Image */}
                                    <AspectRatio minHeight="270px" maxHeight="270px">
                                        <img src={prd.productImage} alt={prd.name} loading="lazy" />
                                    </AspectRatio>

                                    {/* Product Info */}
                                    <CardContent>
                                        <Typography level="title-md" sx={{ mb: 0.5 }}>
                                            {prd.name}
                                        </Typography>
                                        <Typography level="body-sm" textColor="text.secondary" sx={{ mb: 1 }}>
                                            {prd.description}
                                        </Typography>
                                        <Typography level="title-lg" fontWeight="lg" color="success">
                                            ₹{prd.price}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                            {
                                !loading && products.length === 0 && (

                                    <div

                                        className="text-center text-gray-500 py-4 border border-gray-300 w-full"
                                    >
                                        It seems nothing in here.
                                    </div>

                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Wishlist;
