import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LatestArrivals = () => {

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


                    const data = await response.data.products.map((prd) => (
                        {
                            _id: prd._id,
                            name: prd.name,
                            productImage: `${import.meta.env.VITE_API_BASE_URL}/${prd.productImage}`,
                            description: prd.description,
                            price: prd.price,
                            date: prd.createdAt

                        }
                    ));

                    const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

                    const limitedProducts = sortedData.slice(0, 7);


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
    }, [])


    return (
        <header className="container flex flex-col justify-center h-screen bg-white text-black mx-auto lg:px-40">
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
                    className="mySwiper "
                >
                    {products.map((prd) => (
                        <SwiperSlide key={prd._id} className="">
                            <div className=" overflow-hidden duration-300 ease-in-out hover:scale-95">
                                <img
                                    onClick={() => navigate(`/user-home/products-list/detail/${prd._id}`)}
                                    className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover duration-300 ease-in-out hover:scale-110 cursor-pointer" src={prd.productImage}
                                    alt={prd.name}
                                />
                            </div>
                            <div className="py-4">
                                <div className="flex">
                                    <div
                                        onClick={() => navigate(`/user-home/products-list/detail/${prd._id}`)}
                                        className="font-semi-bold text-xl mb-2 group uppercase cursor-pointer"

                                    >
                                        {prd.name}
                                        <div className="bg-black h-[1px] w-0 group-hover:w-full transition-all duration-500"></div>
                                    </div>
                                </div>
                                <p className="text-gray-700 text-base pb-4">{prd.description}</p>
                                <div className="flex">
                                    <div className="group font-normal text-lg mb-2 cursor-pointer"
                                        onClick={() => navigate(`/user-home/products-list/detail/${prd._id}`)}
                                    >
                                        DISCOVER
                                        <div className="bg-gray-900 h-[1px] w-full"></div>
                                        <div className="bg-gray-950 h-[.5px] w-0 group-hover:w-full transition-all duration-500"></div>
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
