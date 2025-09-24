import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await axios.get('https://ecom-api-2xbg.onrender.com/api/product',
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
              productImage: `https://ecom-api-2xbg.onrender.com/${prd.productImage}`,
              description: prd.description,
              price: prd.price

            }
          ));

          setProducts(data)
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
    <>
      {  loading ?
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
          <div className="flex flex-wrap gap-6 p-6">
            {products.map((prd) => (
              <Card key={prd._id} sx={{ width: 300, cursor: "pointer", transition: "0.3s", "&:hover": { boxShadow: "lg" } }} onClick={() => navigate(`/user-home/products-list/detail/${prd._id}`)}>
                {/* Wishlist / Favorite Button */}
                <IconButton
                  aria-label="add to wishlist"
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
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

                  className="text-center text-gray-500 py-4 border border-gray-300"
                >
                  No products found.
                </div>

              )
            }
          </div >
        )
      }
    </>
  );
};

export default ProductList;
