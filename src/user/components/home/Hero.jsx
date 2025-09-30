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
                                <div className="absolute  inset-0 z-10 flex flex-col items-center justify-end text-center px-6 pb-7">


                                    <h2
                                        className="text-4xl md:text-4xl font-bold tracking-wide 
                                                 text-gray-900 text-center max-w-3xl 
                                             animate-fade-in-up"
                                    >
                                        Discover the latest collections and exclusive deals crafted just for you.
                                    </h2>




                                    <div className="mt-2">
                                        <button
                                            onClick={() => navigate('/home/products-list')}
                                            className="bg-purple-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-purple-400 hover:scale-105 transition-transform duration-300"
                                        >
                                            Shop Now
                                        </button>
                                    </div>
                                </div></div>
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
