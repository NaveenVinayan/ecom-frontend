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

const TopSeller = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
                        productImage: `${import.meta.env.VITE_API_BASE_URL}/${prd.productImage}`,
                        description: prd.description,
                        price: prd.price,
                        date: prd.createdAt,
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



    return (
        <div className="lg:px-25 px-10 pb-20 bg-white text-black">
            {/* TITLE */}
            <div className="flex justify-between py-10">
                <h1 className="text-2xl md:text-4xl ">BEST SELLING ITEMS</h1>
                <div className="content-end">
                    <button
                        onClick={() => navigate("/home/products-list")}
                        className="text-md md:text-lg underline hover:text-purple-600 transition-colors"
                    >
                        VIEW ALL PRODUCTS
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
                            // Only center slides if there's more than one slide
                            centeredSlides: products > 1,
                        },
                        640: {
                            slidesPerView: 2,
                            // Only center slides if there's more than two slides
                            centeredSlides: products > 2,
                        },
                        1024: {
                            slidesPerView: 3,
                            centeredSlides: false, // Keep it simple for larger screens
                        },
                        1440: {
                            slidesPerView: 4,
                            centeredSlides: false,
                        },
                    }}
                >
                    {products.map((item) => (
                        <SwiperSlide key={item._id}>
                            <div className="duration-300 ease-in-out hover:scale-95 group relative">

                                {/* Image */}
                                <div className="mb-4 overflow-hidden relative">
                                    <img
                                        onClick={() => navigate(`/home/products-list/detail/${item._id}`)}
                                        className=" w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover duration-300 ease-in-out group-hover:scale-110 cursor-pointer" src={item.productImage}
                                        alt={item.name}
                                    />
                                </div>

                                {/* Title */}
                                <div
                                    onClick={() => navigate(`/home/products-list/detail/${item._id}`)}
                                    className="text-xl mb-3">
                                    {item.name}
                                </div>

                                {/* Price + Add to Cart */}
                                <div
                                    className="text-lg overflow-hidden"
                                    style={{ height: "25px" }}
                                >
                                    <div className="transition-all duration-500 group-hover:-translate-y-8">
                                        <div>${item.price}</div>
                                        <div
                                            onClick={() => navigate(`/home/products-list/detail/${item._id}`)}
                                            className="cursor-pointer"
                                        >
                                            Buy Now
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
