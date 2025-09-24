import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
        <div className="lg:px-25 px-10 py-20 bg-white text-black">
            {/* TITLE */}
            <div className="flex justify-between items-center py-10">
                <h1 className="text-2xl md:text-4xl ">BEST SELLING ITEMS</h1>
                <div className="">
                    <button
                        onClick={() => navigate("/products")}
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
                    spaceBetween={20}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {products.map((item) => (
                        <SwiperSlide key={item._id}>
                            <div className="duration-300 ease-in-out hover:scale-95 group relative">
                                {/* Wishlist Icon */}
                                <div
                                    className="bg-white text-black p-1 py-2 m-2 absolute end-0 opacity-0 transition-all 
                  duration-500 group-hover:opacity-100 z-10"
                                >
                                    <i className="bi bi-heart text-lg py-5 px-1"></i>
                                </div>

                                {/* Image */}
                                <div className="mb-4 overflow-hidden w-full h-64 sm:h-72 md:h-80 lg:h-96">
                                    <img
                                        onClick={() => navigate(`/user-home/products-list/detail/${item._id}`)}
                                        className="w-full h-full object-cover duration-300 ease-in-out group-hover:scale-110 cursor-pointer" src={item.productImage}
                                        alt={item.name}
                                    />
                                </div>

                                {/* Title */}
                                <div
                                    onClick={() => navigate(`/user-home/products-list/detail/${item._id}`)}
                                    className="text-xl mb-3">
                                    {item.name}
                                    <div className="bg-black h-[1px] w-0 group-hover:w-full transition-all duration-500"></div>
                                </div>

                                {/* Price + Add to Cart */}
                                <div
                                    className="text-lg overflow-hidden"
                                    style={{ height: "25px" }}
                                >
                                    <div className="transition-all duration-500 group-hover:-translate-y-8">
                                        <div>${item.price}</div>
                                        <div
                                            onClick={() => navigate(`/user-home/products-list/detail/${item._id}`)}
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
