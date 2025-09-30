import React, { useEffect, useState } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import axios from 'axios';
import OrderChart from './components/OrderChart';

const Dashboard = () => {
   const [stats, setStats] = useState({ productsCount: 0, ordersCount: 0, usersCount: 0 });
  const [loading, setLoading] = useState(true);

   useEffect(() => {
        const fetchstats = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/stats`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })

                if (response.data.success) {
                  setStats(response.data.stats)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setLoading(false)
            }
        }
        fetchstats()
    }, [])

  return (
    
   <div>
     <div className='flex gap-4 flex-wrap'  >
      <div className='rounded flex bg-teal-600'>
        <div className={` text-3xl flex justify-center items-center text-white px-4`}>
          <ProductionQuantityLimitsIcon />
        </div>
        <div className='px-4 py-1  '>
          <p className='text-lg font-semibold '>Products</p>
          <p className='text-xl font-bold'>{stats.productsCount}</p>
        </div>
      </div>
      <div className='rounded flex bg-yellow-600'>
        <div className={` text-3xl flex justify-center items-center text-white px-4`}>
          <PriceCheckIcon />
        </div>
        <div className='px-4 py-1  '>
          <p className='text-lg font-semibold '>Orders</p>
          <p className='text-xl font-bold'>{stats.ordersCount}</p>
        </div>
      </div>
      <div className='rounded flex bg-red-600'>
        <div className={` text-3xl flex justify-center items-center text-white px-4`}>
          <GroupIcon />
        </div>
        <div className='px-4 py-1  '>
          <p className='text-lg font-semibold '>Users</p>
          <p className='text-xl font-bold'>{stats.usersCount}</p>
        </div>
      </div>
    </div>

    <div className='py-5'>
      <OrderChart />
    </div>
   </div>
  )
}

export default Dashboard
