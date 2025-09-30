import React from 'react'
import { useNavigate } from 'react-router-dom'
import LatestArrivals from './components/LatestArrivals'
import Attribute from './components/Attribute'
import TopSeller from './components/TopSeller'

import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import b1 from '../../assets/b1.png'
import b2 from '../../assets/b2.png'
import b3 from '../../assets/b3.png'

const Hero = () => {
    const slides = [b1, b2, b3]
    const navigate = useNavigate()

    return (

        <div className=''>

            <div className=''>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {slides.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className='relative max-h-[calc(100vh-5rem)] w-full'>
                                <img src={image} alt="" className='block w-full h-full object-cover  object-top ' />
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-end text-center px-4 sm:px-6 pb-6 sm:pb-10 bg-black/20">
                                    <h2
                                        className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold tracking-wide 
               text-white max-w-3xl leading-snug
               [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]
               animate-fade-in-up"
                                    >
                                        Discover the latest collections and exclusive deals crafted just for you.
                                    </h2>

                                    <div className="mt-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                                        <button
                                            onClick={() => navigate("/home/products-list")}
                                            className="bg-purple-500 text-white font-semibold 
                 px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 
                 rounded-full shadow-lg 
                 hover:bg-purple-400 hover:scale-105 
                 transition-transform duration-300"
                                        >
                                            Shop Now
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div >
                <LatestArrivals />
            </div>
            <div>
                <Attribute />
            </div>
            <div>
                <TopSeller />
            </div>
        </div>


    )
}

export default Hero
