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
import b1 from '../../assets/b1.jpg'
import b2 from '../../assets/b2.jpg'
import b3 from '../../assets/b3.jpg'

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
                            <div className='relative max-h-[calc(100vh-5rem)] h-fit w-full'>
                                <img
                                    onClick={() => navigate("/home/products-list")}
                                    src={image} alt="" className='block max-h-[calc(100vh-5rem)] h-fit object-cover  w-full ' />
                                

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
