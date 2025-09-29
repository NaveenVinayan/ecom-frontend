import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAuth } from "../../../../context/authContext";
import { toast } from "react-toastify";


const LatestArrivals = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { user } = useAuth()

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


                    let data = response.data.products.map((prd) => (
                        {
                            _id: prd._id,
                            name: prd.name,
                            productImage: `${import.meta.env.VITE_API_BASE_URL}/${prd.productImage}`,
                            description: prd.description,
                            price: prd.price,
                            date: prd.createdAt,
                            isWishlisted: false,

                        }
                    ));

                    if (user) {
                        const wishRes = await axios.get(
                            `${import.meta.env.VITE_API_BASE_URL}/api/wishlist/${user._id}`,
                            {
                                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                            }
                        );

                        const wishIds = wishRes.data.products.map((w) => w.productId._id);

                        data = data.map((prd) => ({
                            ...prd,
                            isWishlisted: wishIds.includes(prd._id),
                        }));
                    }

                    const limitedProducts = data
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .slice(0, 7)


                    setProducts(limitedProducts)
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
        <header className=" flex flex-col justify-center  bg-white text-black lg:px-25 px-10">
            {/* Heading */}
            <div className="py-20 md:py-16 lg:py-20 flex items-center justify-center">
                <div className="text-center max-w-3xl px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl pb-4">
                        New Collections
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-stone-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet
                        atque corporis facilis necessitatibus dolor fugit aut eveniet porro qui
                        deleniti, ad perspiciatis delectus ducimus sapiente obcaecati quis, enim
                        ratione.
                    </p>
                </div>
            </div>

            <div className="w-full">
                {/* Swiper */}
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
                    className="mySwiper "
                >
                    {products.map((prd) => (
                        <SwiperSlide key={prd._id} >
                            <div className="flex justify-center">
                                <div>
                                    <div className="relative overflow-hidden duration-300 ease-in-out hover:scale-95 group w-fit">
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
                                        <img
                                            onClick={() => navigate(`/home/products-list/detail/${prd._id}`)}
                                            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover duration-300 ease-in-out group-hover:scale-110 cursor-pointer" src={prd.productImage}
                                            alt={prd.name}
                                        />
                                    </div>


                                    <div className="py-4">
                                        <div className="flex">
                                            <div
                                                onClick={() => navigate(`/home/products-list/detail/${prd._id}`)}
                                                className="font-semi-bold text-xl mb-2 group uppercase cursor-pointer"

                                            >
                                                {prd.name}
                                                <div className="bg-black h-[1px] w-0 group-hover:w-full transition-all duration-500"></div>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-base pb-4">{prd.description}</p>
                                        <div className="flex">
                                            <div className="group font-normal text-lg mb-2 cursor-pointer"
                                                onClick={() => navigate(`/home/products-list/detail/${prd._id}`)}
                                            >
                                                DISCOVER
                                                <div className="bg-gray-900 h-[1px] w-full"></div>
                                                <div className="bg-gray-950 h-[.5px] w-0 group-hover:w-full transition-all duration-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </header>
    );
};

export default LatestArrivals;
