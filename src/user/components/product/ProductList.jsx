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
  const [prdLoading, setPrdLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setPrdLoading(true)
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
              productImage: `http://localhost:5000/${prd.productImage}`,
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
        setPrdLoading(false);
      }
    }
    fetchProducts()
  }, [])


  return (
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
        !prdLoading && products.length === 0 && (

          <div

            className="text-center text-gray-500 py-4 border border-gray-300"
          >
            No products found.
          </div>

        )
      }
    </div >
  );
};

export default ProductList;
