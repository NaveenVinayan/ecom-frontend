import React from 'react'
import { useNavigate } from 'react-router-dom'
import LatestArrivals from './components/LatestArrivals'
import Attribute from './components/Attribute'
import TopSeller from './components/TopSeller'
import Footer from './components/Footer'

const Hero = () => {
    const navigate = useNavigate()

    return (
        <div className=''>
            <div className=''>
                <div className="relative bg-slate-950 text-purple-100 ">
                    {/* Background image with overlay */}
                    <div className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80')",
                        }}
                    />
                    <div className="absolute inset-0 bg-black/70" />

                    {/* Hero content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center h-[calc(100vh-5rem)]  px-6">
                        <h1 className="text-3xl md:text-5xl font-bold uppercase leading-tight text-purple-400 drop-shadow-lg">
                            If you can't stop thinking about it,
                            <br />
                            Buy it
                        </h1>

                        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
                            Discover the latest collections and exclusive deals crafted just for
                            you.
                        </p>

                        <div className="mt-8">
                            <button
                                onClick={() => navigate('/home/products-list')}
                                className="bg-purple-500 text-slate-900 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-purple-400 hover:scale-105 transition-transform duration-300"
                            >
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
                <div className='h'>
                    <LatestArrivals />
                </div>
                <div>
                    <Attribute />
                </div>
                <div>
                    <TopSeller />
                </div>
            </div>
            <div>
                <Footer />
            </div>

        </div>
    )
}

export default Hero
