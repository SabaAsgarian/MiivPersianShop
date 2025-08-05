"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MultiActionAreaCard from './cardfirstmain';
import { Box, Skeleton } from "@mui/material";
import { useDispatch } from 'react-redux';
import { addProduct } from '../cartSlice';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "#35b399",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "-10%",
        left: "60px",
        zIndex: 2,
        cursor: "pointer"
      }}
    >
      <EastIcon sx={{ fontSize: "16px", color: "white" }} />
    </div>
  );
}
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "#35b399",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "-10%",
        left: "30px",
        zIndex: 2,
        cursor: "pointer"
      }}
    >
      <WestIcon sx={{ fontSize: "16px", color: "white" }} />
    </div>
  );
}
function Responsive() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function getData() {
    const res = await fetch('https://miivpersianshop.onrender.com/api/products');
    if (!res.ok) throw new Error('Failed to fetch data: ' + res.statusText);
    return res.json();
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="slider-container" style={{ padding: "2rem", direction: "rtl" }}>
      <Slider {...settings}>
        {loading ? (
          Array.from(new Array(12)).map((_, index) => (
            <div key={index}>
              <Box sx={{ padding: 2 }}>
                <Skeleton variant="rectangular" width={300} height={300} />
                <Box sx={{ width: 290, height: 100, mt: 1 }}>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  
                </Box>
   
              </Box>
            </div>
          ))
        ) : error ? (
          <div><p>Error: {error}</p></div>
        ) : data.length > 0 ? (
          data.map((item) => (
            <div key={item.id}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2
              }}>
                <MultiActionAreaCard data={item} />
              </Box>
            </div>
          ))
        ) : (
          <div><p>No data available</p></div>
        )}
      </Slider>
    </div>
  );
}

export default Responsive;
