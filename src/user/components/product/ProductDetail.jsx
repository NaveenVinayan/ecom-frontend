import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { useAuth } from "../../../context/authContext"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../utils/Loading";

const ProductDetail = () => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const { id } = useParams()
  const { user } = useAuth()

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/product/${id}`)

      if (response.data.success) {
        let productData = {
          ...response.data.product,
          isWishlisted: false,
        }

        if (user) {
          const wishRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/wishlist/${user._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          const wishIds = wishRes.data.products.map((w) => w.productId._id);

          productData.isWishlisted = wishIds.includes(productData._id)
        }
        setProduct(productData)

      }


    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {

    fetchProduct()
  }, [])

  const handleWishlist = async (e, id, userId) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/wishlist/${id}/${userId}`, {},
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      if (response.data.success) {

        if (response.data.message.toLowerCase().includes("removed")) {
          toast.info(response.data.message);
        } else {
          toast.success(response.data.message);
        }
        setProduct((prev) => ({
          ...prev,
          isWishlisted: !prev.isWishlisted,
        }));
      }


    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }


  }

  return (
    <>{loading ? (
      <Loading />
    ) : (
      <div className="flex justify-center items-center lg:h-[calc(100vh-5rem)] px-4">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="flex flex-col items-center relative">
            {/* wishlist button */}
            <div className="absolute right-2 sm:right-4 md:right-6">
              <button
                onClick={(e) => handleWishlist(e, id, user._id)}
                className={`
            text-3xl sm:text-4xl md:text-5xl 
            px-1 sm:px-2 md:px-2 
            rounded-b-2xl shadow-lg
            transition-all duration-300 ease-in-out
            ${product.isWishlisted ? 'pt-9 pb-3 bg-slate-900 text-white ' : 'pt-3 pb-3 bg-white text-black'}
             `}
              >
                <CiBookmark />
              </button>
            </div>

            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${product.productImage}`}
              alt={product.name}
              className="rounded-b-lg shadow-lg w-full max-w-md object-cover"
            />
          </div>

          {/* Product Info Section */}
          <div className="py-2 sm:py-4 md:py-6 flex flex-col justify-center">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {product.name}
            </h1>

            {/* Reviews */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <p className="text-black text-base sm:text-lg">★★★★☆</p>
              <span className="text-gray-600 text-xs sm:text-sm">(120 reviews)</span>
            </div>

            {/* Price */}
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-600 mb-4 sm:mb-6">
              ₹{product.price}
            </div>

            {/* Short Description */}
            <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base md:text-lg">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
              <button
                onClick={() => navigate(`/home/detail/checkout/${id}`)}
                className="px-4 sm:px-6 py-2 sm:py-3 
            bg-blue-600 text-white font-medium 
            rounded-lg shadow 
            hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Buy Now
              </button>
            </div>

            {/* Extra Info */}
            <div className="space-y-2 sm:space-y-3 text-gray-700 text-xs sm:text-sm md:text-base">
              <p>✔ Free Shipping across India</p>
              <p>✔ 7 Days Easy Returns & Refund</p>
              <p>✔ 1 Year Warranty</p>
              <p>✔ Exchange Available</p>
            </div>
          </div>
        </div>
      </div>

    )}
    </>
  );
};

export default ProductDetail;
