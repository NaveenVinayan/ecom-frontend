import React, { useState } from 'react'
import { useAuth } from '../../../context/authContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Checkout = () => {

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const { id } = useParams()


  const { user } = useAuth()

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(`https://ecom-api-2xbg.onrender.com/api/order/${id}/${user._id}`, address, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        navigate(`/user-home/orders`)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    } finally {
      setLoading(false)
    }

  };

  return (
    <>
      {loading ?
        (
          <div className="flex items-center justify-center min-h-screen">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 
        0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 
        100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 
        91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 
        50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 
        97.0079 33.5539C95.2932 28.8227 92.871 
        24.3692 89.8167 20.348C85.8452 15.1192 
        80.8826 10.7238 75.2124 7.41289C69.5422 
        4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 
        0.367541 46.6976 0.446843 41.7345 
        1.27873C39.2613 1.69328 37.813 4.19778 
        38.4501 6.62326C39.0873 9.04874 41.5694 
        10.4717 44.0505 10.1071C47.8511 9.54855 
        51.7191 9.52689 55.5402 10.0491C60.8642 
        10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 
        17.9648 79.3347 21.5619 82.5849 
        25.841C84.9175 28.9121 86.7997 32.2913 
        88.1811 35.8758C89.083 38.2158 91.5421 
        39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  pattern="[0-9]{10}"
                  value={address.phone}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Address</label>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">State</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  pattern="[0-9]{6}"
                  value={address.pincode}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200"
                />
              </div>

              <div className='flex flex-wrap gap-3'>
                <button
                  type="submit"
                  className=" bg-blue-700 text-white px-2 py-3 rounded-lg hover:bg-blue-600"
                >
                  Confirm Address & Pay
                </button>
                <button
                  type="button"
                  className=" bg-gray-500 text-white px-2 py-3 rounded-lg hover:bg-gray-400"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )
      }
    </>

  )
}

export default Checkout
