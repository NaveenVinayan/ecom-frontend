import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from '../../../context/authContext';
import { toast, ToastContainer } from "react-toastify";
import Loading from '../../../utils/Loading';


const ProductList = () => {
  const [products, setProducts] = useState([])
  const [filteredProduct, setFilteredProduct] = useState([])
  const [loading, setLoading] = useState(false)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { user } = useAuth()

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/product`)

      if (response.data.success) {

        let data = await response.data.products.map((prd) => (
          {
            _id: prd._id,
            name: prd.name,
            productImage: `${import.meta.env.VITE_API_BASE_URL}/${prd.productImage}`,
            description: prd.description,
            price: prd.price,
            isWishlisted: false,

          }
        ));

        if (user) {
          const wishRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/wishlist/${user._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          const wishIds = wishRes.data.products.map((w) => w.productId._id);

          // 3️⃣ Mark wishlist items
          data = data.map((prd) => ({
            ...prd,
            isWishlisted: wishIds.includes(prd._id),
          }));
        }

        setProducts(data)
        setFilteredProduct(data)
      }


    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    fetchProducts()
  }, [])

  const handleFilter = (e) => {
    const records = products.filter((prd) => (
      prd.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredProduct(records);
    setCurrentPage(1);
  }

  const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProduct.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleWishlist = async (e, id, userId) => {
    e.preventDefault()
    if (user) {
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
        }

        fetchProducts()
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
    } else {
      navigate('/login')
    }

  }


  return (
    <>
      {loading ?
        (
          <Loading />
        ) : (
          <div>
            <div className="px-6 pt-2">
              <input
                type="text"
                placeholder="Search by product name"
                onChange={handleFilter}
                className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
               placeholder-gray-400 text-gray-700"
              />
            </div>

            <div className="flex flex-wrap gap-6 p-6">
              {currentItems.map((prd) => (
                <Card key={prd._id}
                  sx={{
                    width: 275,
                    cursor: "pointer",
                    transition: "0.3s",
                    position: "relative",
                    "&:hover": { boxShadow: "lg" },
                    "&:hover .wishlist-btn": { opacity: 1, transform: "translateY(0)" }
                  }}
                  onClick={() => navigate(`/home/products-list/detail/${prd._id}`)}>
                  {/* ❤️ Wishlist Button */}
                  <IconButton
                    aria-label="add to wishlist"
                    variant="soft"
                    size="sm"
                    sx={{
                      backgroundColor: prd.isWishlisted ? '#ef4444' : 'white',
                      color: prd.isWishlisted ? 'white' : 'black',
                      transform: prd.isWishlisted ? 'scale(1)' : 'translateY(-10px)',
                      opacity: prd.isWishlisted ? 1 : 0,
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      zIndex: 10,
                      borderRadius: '50%',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#f87171',
                        color: 'white',
                        transform: 'scale(1.1)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      },
                      '.MuiCard-root:hover &': prd.isWishlisted ? {} : { opacity: 1, transform: 'translateY(0)' },
                    }}

                    onClick={(e) => {
                      e.stopPropagation(); 
                      if (user) {
                        handleWishlist(e, prd._id, user._id);
                      } else {
                        toast.error('Login to add items to wishlist');
                      }

                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>



                  {/* Product Image */}
                  <AspectRatio minHeight="270px" maxHeight="270px">
                    <img
                      src={prd.productImage}
                      alt={prd.productImage}
                      loading="lazy"
                    />
                  </AspectRatio>

                  {/* Product Info */}
                  <CardContent>
                    <Typography level="title-md" sx={{ mb: 0.5 }}>
                      {prd.name}
                    </Typography>
                    <Typography level="body-sm" textColor="text.secondary" sx={{ mb: 1 }}>
                      {prd.description}
                    </Typography>
                    <Typography level="title-lg" fontWeight="lg" color="success" sx={{ mb: 2 }}>
                      ₹{prd.price}
                    </Typography>
                  </CardContent>
                </Card>
              ))
              }
              {
                !loading && products.length === 0 && (

                  <div

                    className="text-center text-gray-500 py-4 border border-gray-300 w-full"
                  >
                    No products found.
                  </div>

                )
              }
            </div >

            {/* Pagination Controls */}
            {filteredProduct.length > itemsPerPage && (
              <div className="flex justify-center mt-6 space-x-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-1 border rounded transition-transform duration-200 
             hover:scale-105 hover:bg-gray-100 disabled:opacity-50 group"
                >
                  <GrFormPreviousLink className="text-xl transform transition-transform duration-200 group-hover:-translate-x-1" />
                  <span>Prev</span>
                </button>

                {/* {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded ${currentPage === i + 1
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))} */}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-1 border rounded transition-transform duration-200 
             hover:scale-105 hover:bg-gray-100 disabled:opacity-50 group"
                >
                  <span>Next</span>
                  <GrFormNextLink className="text-xl transform transition-transform duration-200 group-hover:translate-x-1" />
                </button>

              </div>
            )}
          </div>
        )
      }
    </>
  );
};

export default ProductList;
