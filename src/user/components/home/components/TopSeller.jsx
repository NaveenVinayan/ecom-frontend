import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { useAuth } from "../../../../context/authContext";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toast } from "react-toastify";


const TopSeller = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { user } = useAuth()


    useEffect(() => {

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/product`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (response.data.success) {
                    const data = response.data.products.map((prd) => ({
                        _id: prd._id,
                        name: prd.name,
                        productImage: `${import.meta.env.VITE_API_BASE_URL}/uploads/${prd.productImage}`,
                        description: prd.description,
                        price: prd.price,
                        date: prd.createdAt,
                        isWishlisted: false,

                    }));

                    // shuffle
                    const shuffled = data.sort(() => 0.5 - Math.random());

                    // pick first 6
                    setProducts(shuffled.slice(0, 6));
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setLoading(false);
            }
        };


        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!user) return;
            try {

                const wishRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/wishlist/${user._id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const wishIds = wishRes.data.products.map((w) => w.productId._id);

                setProducts((prev) =>
                    prev.map((prd) => ({
                        ...prd,
                        isWishlisted: wishIds.includes(prd._id),
                    }))
                );


            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchWishlist()
    }, [user])

    const handleWishlist = async (e, id, userId) => {
        e.preventDefault()

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
                setProducts((prevProducts) =>
                    prevProducts.map((prd) =>
                        prd._id === id ? { ...prd, isWishlisted: !prd.isWishlisted } : prd
                    )
                );
            }


        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }


    }

    return (
        <div className="lg:px-25 px-10 pb-20 bg-white text-black">
            {/* TITLE */}
            <div className="flex justify-between py-10">
                <h1 className="text-2xl md:text-4xl ">BEST SELLING ITEMS</h1>
                <div className="content-end">
                    <button
                        onClick={() => navigate("/home/products-list")}
                        className="text-md md:text-lg  group cursor-pointer"
                    >
                        VIEW ALL PRODUCTS
                        <div className="bg-black h-[1px] w-0 group-hover:w-full transition-all duration-500"></div>
                    </button>
                </div>
            </div>


            {/* SWIPER */}
            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={30}
                    breakpoints={{

                        320: {
                            slidesPerView: 1,
                            centeredSlides: false,
                        },
                        640: {
                            slidesPerView: 2,
                            centeredSlides: false,
                        },
                        1024: {
                            slidesPerView: 3,
                            centeredSlides: false,
                        },
                        1440: {
                            slidesPerView: 4,
                            centeredSlides: false,
                        },
                    }}
                >
                    {products.map((prd) => (
                        <SwiperSlide key={prd._id}>
                            <div className="flex justify-center">
                                <div className="duration-300 ease-in-out hover:scale-95 group relative">
                                    {/* Wishlist Button */}
                                    <IconButton
                                        aria-label="add to wishlist"
                                        variant="soft"
                                        size="sm"

                                        sx={{

                                            backgroundColor: prd.isWishlisted ? '#ef4444' : 'white',
                                            color: prd.isWishlisted ? 'white' : 'black',
                                            opacity: 1,
                                            transform: 'scale(1)',
                                            position: 'absolute',
                                            top: '0.75rem',
                                            right: '0.75rem',
                                            zIndex: 20,
                                            borderRadius: '50%',
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: '#f87171',
                                                color: 'white',
                                                transform: 'scale(1.1)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                            },
                                        }}

                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (user) {
                                                handleWishlist(e, prd._id, user._id);
                                            } else {
                                                toast.error('Login to add items to wishlist');
                                            }

                                        }}
                                    >
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                    {/* Image */}
                                    <div className="mb-4 overflow-hidden relative">
                                        <img
                                            onClick={() => navigate(`/home/products-list/detail/${prd._id}`)}
                                            className=" w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover duration-300 ease-in-out group-hover:scale-110 cursor-pointer" src={prd.productImage}
                                            alt={prd.name}
                                        />
                                    </div>

                                    {/* Title */}
                                    <div
                                        onClick={() => navigate(`/home/products-list/detail/${prd._id}`)}
                                        className="text-xl mb-3">
                                        {prd.name}
                                    </div>

                                    {/* Price + Add to Cart */}
                                    <div
                                        className="text-lg overflow-hidden"
                                        style={{ height: "25px" }}
                                    >
                                        <div className="transition-all duration-500 group-hover:-translate-y-8">
                                            <div>${prd.price}</div>
                                            <div
                                                onClick={() => navigate(`/home/products-list/detail/${prd._id}`)}
                                                className="cursor-pointer"
                                            >
                                                Buy Now
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default TopSeller;
