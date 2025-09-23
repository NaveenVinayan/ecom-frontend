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

  const navigate = useNavigate();
  const { id } = useParams()


  const { user } = useAuth()

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/order/${id}/${user._id}`, address, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        navigate(`/user-home/products-list/detail/${id}`)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }

  };

  return (
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
          onClick={()=>navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

  )
}

export default Checkout
